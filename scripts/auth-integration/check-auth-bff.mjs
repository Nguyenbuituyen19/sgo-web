import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = fileURLToPath(new URL("../../", import.meta.url));
const require = createRequire(`${root}/package.json`);
const ts = require("typescript");
const next = require("next/server");
const calls = [];
let postResult;
let getResult;
const backend = {
  post: async (...args) => { calls.push({ method: "POST", args }); return postResult(...args); },
  get: async (...args) => { calls.push({ method: "GET", args }); return getResult(...args); },
};

function load(file, modules = {}) {
  const exports = {};
  const source = ts.transpileModule(readFileSync(`${root}/${file}`, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(source, {
    exports,
    require: (name) => {
      if (name in modules) return modules[name];
      throw new Error(`Unexpected test dependency: ${name}`);
    },
    process: { env: { NODE_ENV: "test" } },
    URL,
    setTimeout: () => 0,
  }, { filename: file });
  return exports;
}

const auth = load("src/lib/server/auth.ts", {
  axios: { __esModule: true, default: { create: () => backend } },
  "next/server": next,
});
const validation = load("src/shared/auth-validation.ts");
const route = load("src/app/api/auth/[action]/route.ts", {
  "next/server": next,
  "@/lib/server/auth": auth,
  "@/shared/auth-validation": validation,
});
const user = { id: "test-account", email: "user@example.com", displayName: "Test user", role: "APPLICATION_USER" };
const session = {
  accessToken: "dummy-access-token",
  refreshToken: "dummy-refresh-token",
  expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
  user,
};
const request = (cookie = "") => new next.NextRequest("http://localhost:3000/api/auth/session", {
  headers: cookie ? { Cookie: cookie } : {},
});
function sessionCookies(response) {
  const cookies = response.headers.getSetCookie();
  assert.equal(cookies.length, 2);
  assert.ok(cookies.every((cookie) => /HttpOnly/i.test(cookie) && /SameSite=lax/i.test(cookie)));
  return cookies;
}
async function assertNoTokens(response) {
  const text = await response.clone().text();
  assert.ok(!text.includes(session.accessToken) && !text.includes(session.refreshToken));
}

postResult = async () => ({ status: 200, data: { mfaRequired: false, session } });
let response = await auth.authenticate("login", { email: user.email, password: "dummy-password" });
assert.equal(response.status, 200);
assert.deepEqual((await response.clone().json()).data.user, user);
sessionCookies(response);
await assertNoTokens(response);

postResult = async () => ({ status: 200, data: { mfaRequired: true, challengeId: "test-challenge" } });
response = await auth.authenticate("login", {});
assert.equal((await response.json()).data.mfaRequired, true);
assert.equal(response.headers.getSetCookie().length, 0);

postResult = async () => ({ status: 200, data: session });
response = await auth.authenticate("mfa", { challengeId: "test-challenge", code: "123456" });
assert.equal(response.status, 200);
sessionCookies(response);
await assertNoTokens(response);

getResult = async (_path, config) => {
  assert.equal(config.headers.Authorization, "Bearer dummy-access-token");
  return { status: 200, data: user };
};
response = await auth.currentSession(request("sgo_access_token=dummy-access-token"));
assert.deepEqual((await response.json()).data, user);

getResult = async () => ({ status: 403, data: "" });
let rotations = 0;
postResult = async (path) => { assert.equal(path, "/api/v1/auth/refresh"); rotations += 1; return { status: 200, data: session }; };
const refreshed = await Promise.all([
  auth.currentSession(request("sgo_access_token=stale;sgo_refresh_token=refresh-once")),
  auth.currentSession(request("sgo_access_token=stale;sgo_refresh_token=refresh-once")),
]);
assert.equal(rotations, 1);
assert.ok(refreshed.every((result) => result.status === 200));
refreshed.forEach(sessionCookies);

postResult = async () => ({ status: 204 });
response = await auth.logout(request("sgo_access_token=dummy-access-token"));
assert.equal(response.status, 200);
assert.ok(sessionCookies(response).every((cookie) => /Max-Age=0/i.test(cookie)));

getResult = async () => { throw new Error("Simulated backend outage"); };
response = await auth.currentSession(request("sgo_access_token=dummy-access-token"));
assert.equal(response.status, 503);
assert.equal(response.headers.getSetCookie().length, 0);

postResult = async () => ({ status: 403, data: "" });
response = await auth.currentSession(request("sgo_refresh_token=expired-refresh"));
assert.equal(response.status, 401);
assert.ok(sessionCookies(response).every((cookie) => /Max-Age=0/i.test(cookie)));

let forwarded;
postResult = async (_path, body) => { forwarded = body; return { status: 201, data: user }; };
const signupRequest = new next.NextRequest("http://localhost:3000/api/auth/register", {
  method: "POST",
  headers: { Origin: "http://localhost:3000", "Content-Type": "application/json" },
  body: JSON.stringify({ email: user.email, displayName: user.displayName, password: "password123456", role: "PLATFORM_ADMIN", tenantId: "other-tenant" }),
});
response = await route.POST(signupRequest, { params: Promise.resolve({ action: "register" }) });
assert.equal(response.status, 201);
assert.deepEqual(Object.keys(forwarded).sort(), ["displayName", "email", "password"]);

postResult = async () => ({ status: 404, data: { code: "NOT_FOUND", detail: "Not found" } });
response = await auth.registerCustomer({ email: user.email, displayName: user.displayName, password: "password123456" });
assert.equal(response.status, 404);
assert.equal((await response.json()).success, false);

const beforeCrossOrigin = calls.length;
response = await route.POST(new next.NextRequest("http://localhost:3000/api/auth/login", {
  method: "POST", headers: { Origin: "https://untrusted.example" }, body: "{}",
}), { params: Promise.resolve({ action: "login" }) });
assert.equal(response.status, 403);
assert.equal(calls.length, beforeCrossOrigin);

assert.equal(auth.validOrigin(new next.NextRequest("http://127.0.0.1:3000/api/auth/login", {
  headers: { Host: "127.0.0.1:3000", Origin: "http://127.0.0.1:3000" },
})), true);
assert.equal(auth.validOrigin(new next.NextRequest("http://localhost:3000/api/auth/login", {
  headers: { Origin: "null" },
})), false);

// Logout must revoke a session issued by an in-flight rotation, not just the old access token.
const pendingSession = { ...session, accessToken: "pending-new-access", refreshToken: "pending-new-refresh" };
let resolveRotation;
let signalRefresh;
const rotation = new Promise((resolve) => { resolveRotation = resolve; });
const refreshStarted = new Promise((resolve) => { signalRefresh = resolve; });
const revoked = [];
getResult = async () => ({ status: 403, data: "" });
postResult = async (path, _body, config) => {
  if (path === "/api/v1/auth/refresh") { signalRefresh(); return rotation; }
  const access = config.headers.Authorization.replace("Bearer ", "");
  revoked.push(access);
  return { status: access === pendingSession.accessToken ? 204 : 401 };
};
const oldPendingCookies = "sgo_access_token=pending-old-access;sgo_refresh_token=pending-old-refresh";
const pendingCheck = auth.currentSession(request(oldPendingCookies));
await refreshStarted;
const pendingLogout = auth.logout(request(oldPendingCookies));
resolveRotation({ status: 200, data: pendingSession });
const [pendingCheckResult, pendingLogoutResult] = await Promise.all([pendingCheck, pendingLogout]);
assert.equal(pendingCheckResult.status, 401);
assert.ok(sessionCookies(pendingCheckResult).every((cookie) => /Max-Age=0/i.test(cookie)));
assert.equal(pendingLogoutResult.status, 200);
assert.ok(revoked.includes(pendingSession.accessToken));

// A cached rotation cannot reinstall cookies after logout using the new cookie pair.
const cachedSession = { ...session, accessToken: "cached-new-access", refreshToken: "cached-new-refresh" };
postResult = async (path) => ({ status: path === "/api/v1/auth/refresh" ? 200 : 204, data: cachedSession });
const oldCachedCookies = "sgo_access_token=cached-old-access;sgo_refresh_token=cached-old-refresh";
assert.equal((await auth.currentSession(request(oldCachedCookies))).status, 200);
assert.equal((await auth.logout(request("sgo_access_token=cached-new-access;sgo_refresh_token=cached-new-refresh"))).status, 200);
const cachedAfterLogout = await auth.currentSession(request(oldCachedCookies));
assert.equal(cachedAfterLogout.status, 401);
assert.ok(sessionCookies(cachedAfterLogout).every((cookie) => /Max-Age=0/i.test(cookie)));

// Logout while /me is pending must prevent that request from starting a rotation afterward.
let resolveMe;
const pendingMe = new Promise((resolve) => { resolveMe = resolve; });
let lateRotations = 0;
getResult = async () => pendingMe;
postResult = async (path) => { if (path === "/api/v1/auth/refresh") lateRotations += 1; return { status: 204 }; };
const meCookies = "sgo_access_token=me-old-access;sgo_refresh_token=me-old-refresh";
const checkingMe = auth.currentSession(request(meCookies));
await auth.logout(request(meCookies));
resolveMe({ status: 403, data: "" });
assert.equal((await checkingMe).status, 401);
assert.equal(lateRotations, 0);

getResult = async () => ({ status: 403, data: "" });
postResult = async (path) => {
  if (path === "/api/v1/auth/refresh") throw new Error("Simulated rotation timeout");
  return { status: 401 };
};
const uncertainCookies = "sgo_access_token=uncertain-access;sgo_refresh_token=uncertain-refresh";
assert.equal((await auth.currentSession(request(uncertainCookies))).status, 503);
const localLogout = await auth.logout(request(uncertainCookies));
assert.equal(localLogout.status, 200);
assert.ok((await localLogout.json()).message);
assert.ok(sessionCookies(localLogout).every((cookie) => /Max-Age=0/i.test(cookie)));

console.log("Auth BFF: 17 scenarios passed; no database was accessed.");
