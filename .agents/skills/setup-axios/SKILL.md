---
name: setup-axios
description: Set up or refactor an axios API client layer in a Next.js/React + TypeScript frontend wired to a REST backend. Use whenever the user mentions axios, API client setup, connecting the frontend to a backend, fixing broken or missing API imports/modules, adding interceptors, or creating typed API modules — even if they just say "fix my api endpoint" or "wire up the backend".
---

# Setup Axios

Workflow for building a typed axios API layer against a real backend.

Core principle: **discover the contract from the running backend before writing any client code.** Never guess endpoints, payload shapes, error formats, or envelope structure — a client written from assumptions will pass review and fail at runtime.

## Workflow

1. Discover the backend contract (swagger + live requests)
2. Write the shared client (axios instance + response wrapper)
3. Write typed domain API modules
4. Update call sites
5. Verify

## 1. Discover the backend contract

Ask the user (or find) the backend base URL — often `localhost:8080` in dev. Then, in order:

**Pull the OpenAPI spec** (Spring backends expose `/v3/api/docs` or `/v3/api-docs`; the UI is usually `/swagger-ui/index.html`). Extract only the relevant paths and schemas rather than reading the whole spec:

```bash
curl -s http://localhost:8080/v3/api-docs | node -e "
let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{
const spec=JSON.parse(d);
const paths=Object.keys(spec.paths).filter(p=>p.includes('/news'));
console.log(paths.join('\n'));
const s=spec.components.schemas;
for(const n of ['SomeResponse']) console.log(n, JSON.stringify(Object.keys(s[n]?.properties||{})));
});"
```

For each endpoint record: method, path params, query params (and their defaults — e.g. `limit` default 10 can silently truncate lists), and the response schema.

**Live-test every endpoint** with curl, including the happy path AND a 404. The 404 body reveals the error format (RFC 7807 problem-json `{type,title,status,detail,code}` is common with Spring). Axios throws on non-2xx — how errors surface must shape the wrapper design.

**Check for an envelope.** Does the backend return bare arrays/objects (`[{...}]`) or wrapped payloads (`{content: [...], totalElements}`)? Bare payloads mean the `{success, data, message}` envelope, if wanted, must be created client-side.

**Check CORS** if any call happens in the browser (client components): `curl -s -D - -o /dev/null http://localhost:8080/api -H "Origin: http://localhost:3000" | grep -i access-control`. If absent, browser-side calls will fail — either backend adds headers or the fetch moves server-side.

**Check the env file FIRST for the base URL variable name.** Read `.env.local` / `.env` before writing the client. If `NEXT_PUBLIC_API_URL` already exists, use it — do not invent `NEXT_PUBLIC_API_BASE_URL` and leave a silent mismatch (the client falls back to localhost in dev and breaks only in deployed environments).

## 2. Write the shared client

Copy `assets/client.ts.template` from this skill's directory and adapt:

- `baseURL` env var name (see above)
- The 404 policy: this template maps 404 → `{success: true, data: null}` so callers distinguish "not found" (valid empty state) from "backend down" (`success: false`). Keep that distinction; adjust only if the backend uses 404 differently.
- Error message extraction order: problem-json `detail` → `message` → axios message → generic fallback.

The param-cleaning interceptor exists because axios serializes `undefined`/`null` params inconsistently and empty strings pollute URLs; stripping them lets callers pass optional filters inline (`{keyword: q || undefined}`).

## 3. Write typed domain API modules

Copy `assets/api-module.ts.template` and fill in types mirroring the OpenAPI schemas exactly — same field names, optional fields optional. Rules:

- One module per backend resource (`news.ts`, `consultation.ts`...), each exporting an `xxxApi` object plus response types.
- Path params go through `encodeURIComponent`.
- Server-side correctness flags (e.g. `publicOnly: true` so drafts never leak to a public site) are baked into the API layer, never left to individual callers — one forgotten call site becomes a data leak.
- Return types are `Promise<ApiResponse<T>>`. Do NOT write `Promise<ReturnType<typeof request<T>>>` — that expands to a double-wrapped Promise and fails typecheck.
- If the backend has no lookup-by-slug endpoint but returns a small full list, resolve client-side (`getCategories()` then `.find()`) and document why in a comment.

## 4. Update call sites

Rewrite imports mechanically, then simplify the call sites themselves:

```bash
sed -i 's|@/lib/newsApi|@/shared/news|g; s|@/lib/api|@/shared/client|g' <files>
```

- Delete any dead unwrapping left over from other backends (`Array.isArray(res.data) ? res.data : (res.data as any)?.content || []` guards against Spring `Page` wrappers — if this backend returns bare arrays, the fallback is unreachable noise).
- Delete client methods that have no backend endpoint. Search all usages first (`grep -rn "methodName" src`) and remove the call-site branches too — a removed redirect branch must also lose its now-unused `redirect` import.
- Types flow through `ApiResponse<T>`; call sites should need zero casts.

## 5. Verify

- `npx tsc --noEmit` — must be clean before anything else.
- Smoke test routes with curl against a running dev server (server-rendered content should appear in the raw HTML, proving the data path works end-to-end).
- If the user asked for review only ("don't run"), stop at the static review — read final file states and report; do not start servers or run commands that execute the app.

## Pitfalls

- **Axios throws on 404/5xx.** An uncaught `AxiosError` in a server component becomes a 500 page. The wrapper's catch is the only thing standing between a missing record and a crashed route.
- **Axios bypasses Next.js fetch deduplication.** A server page calling the same API in `generateMetadata` and the page body fetches twice; wrap such reads in React's `cache()`.
- **Backend defaults can truncate.** If a list endpoint defaults `limit=10`, the client must pass an explicit limit or lists silently cap.
- **CORS allowlists are per-origin.** Dev (`localhost:3000`) being allowed says nothing about production — confirm the deployed origin, or fetch server-side.
- **`dangerouslySetInnerHTML` for API-provided rich text** (CMS/article content) needs server-side sanitization regardless of how clean the client layer is.
