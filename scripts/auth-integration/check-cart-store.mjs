import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const sourcePath = resolve(root, "src/components/cart/CartPageContainer.tsx");
const source = await readFile(sourcePath, "utf8");
const syntaxTree = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const names = new Set([
  "INITIAL_DEMO_ITEM", "KNOWN_PACKAGES", "CartSnapshot", "CART_STORAGE_KEY",
  "SERVER_CART_SNAPSHOT", "cartSnapshot", "cartListeners", "consumedSelections",
  "readSavedCart", "updateCartItems", "purchaseFromQuery", "handleCartStorage",
  "subscribeToCart", "getCartSnapshot", "getServerCartSnapshot",
]);
const extracted = [];
const found = new Set();
for (const statement of syntaxTree.statements) {
  const statementNames = ts.isVariableStatement(statement)
    ? statement.declarationList.declarations.map((declaration) => declaration.name.getText(syntaxTree))
    : statement.name ? [statement.name.getText(syntaxTree)] : [];
  if (statementNames.some((name) => names.has(name))) {
    extracted.push(statement.getText(syntaxTree));
    statementNames.filter((name) => names.has(name)).forEach((name) => found.add(name));
  }
}
assert.equal(found.size, names.size, "The test must use every actual cart store dependency from the component");
const compiled = ts.transpileModule(extracted.join("\n") + "\nglobalThis.cartApi = { subscribeToCart, updateCartItems, purchaseFromQuery, getCartSnapshot, getServerCartSnapshot };", {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
  reportDiagnostics: true,
});
assert.equal(compiled.diagnostics.length, 0, "The extracted cart helpers must transpile without syntax errors");
const script = new vm.Script(compiled.outputText, { filename: sourcePath });
const key = "sgo_cart_items";

function harness(values = new Map()) {
  let unavailable = false;
  const storage = {
    getItem(name) {
      if (unavailable) throw new Error("Storage blocked");
      return values.get(name) ?? null;
    },
    setItem(name, value) {
      if (unavailable) throw new Error("Storage blocked");
      values.set(name, String(value));
    },
  };
  const storageListeners = new Set();
  const context = vm.createContext({
    URLSearchParams,
    localStorage: storage,
    window: {
      addEventListener(type, listener) { assert.equal(type, "storage"); storageListeners.add(listener); },
      removeEventListener(type, listener) { assert.equal(type, "storage"); storageListeners.delete(listener); },
    },
  });
  script.runInContext(context);
  return {
    api: context.cartApi,
    values,
    storageListeners,
    setUnavailable(value) { unavailable = value; },
    storageEvent(changedKey = key) {
      for (const listener of storageListeners) listener({ key: changedKey, storageArea: storage });
    },
  };
}

let passed = 0;
function check(name, action) {
  action();
  passed += 1;
  console.log("PASS " + name);
}
const selection = "package=linux-1&os=debian-11&ram=8&cpu=4&storage=100&selection=first";

check("cleared cart stays empty after a full reload", () => {
  const page = harness();
  const unsubscribe = page.api.subscribeToCart(() => {}, "");
  assert.equal(page.api.getCartSnapshot().items.length, 1);
  page.api.updateCartItems([]);
  unsubscribe();
  const reload = harness(page.values);
  assert.equal(reload.api.getServerCartSnapshot().isLoaded, false);
  reload.api.subscribeToCart(() => {}, "");
  assert.equal(reload.api.getCartSnapshot().isLoaded, true);
  assert.equal(reload.api.getCartSnapshot().items.length, 0);
});

check("query-selected known package preserves custom configuration", () => {
  const page = harness(new Map([[key, "[]"]]));
  page.api.subscribeToCart(() => {}, selection);
  const [item] = page.api.getCartSnapshot().items;
  assert.equal(item.osImage, "debian-11");
  assert.equal(item.config.ram, "8 GB");
  assert.equal(item.config.cpu, "4 Core");
  assert.equal(item.config.storage, "100 GB SSD");
  assert.equal(JSON.parse(page.values.get(key)).length, 1);
  assert.equal(page.api.getCartSnapshot(), page.api.getCartSnapshot(), "Snapshots must stay stable between changes");
});

check("same purchase selection is not duplicated on reconnect or reload", () => {
  const page = harness(new Map([[key, "[]"]]));
  const unsubscribe = page.api.subscribeToCart(() => {}, selection);
  const id = page.api.getCartSnapshot().items[0].id;
  unsubscribe();
  page.api.subscribeToCart(() => {}, selection);
  assert.equal(page.api.getCartSnapshot().items.length, 1);
  const reload = harness(page.values);
  reload.api.subscribeToCart(() => {}, selection);
  assert.equal(reload.api.getCartSnapshot().items.length, 1);
  assert.equal(reload.api.getCartSnapshot().items[0].id, id);
});

check("a new selection can add the same package again", () => {
  const page = harness(new Map([[key, "[]"]]));
  const unsubscribe = page.api.subscribeToCart(() => {}, selection);
  const firstId = page.api.getCartSnapshot().items[0].id;
  unsubscribe();
  page.api.subscribeToCart(() => {}, selection.replace("selection=first", "selection=second"));
  const items = page.api.getCartSnapshot().items;
  assert.equal(items.length, 2);
  assert.notEqual(items[0].id, firstId);
  assert.equal(items[1].id, firstId);
});

check("active subscriptions receive another tab's cart update", () => {
  const page = harness(new Map([[key, "[]"]]));
  let notifications = 0;
  page.api.subscribeToCart(() => { notifications += 1; }, selection);
  const external = page.api.purchaseFromQuery("package=turbo-1&selection=external");
  page.values.set(key, JSON.stringify([external]));
  const before = notifications;
  page.storageEvent("unrelated-key");
  assert.equal(notifications, before);
  page.storageEvent();
  assert.equal(notifications, before + 1);
  assert.equal(page.api.getCartSnapshot().items[0].id, external.id);
});

check("returning to cart reads changes made while unsubscribed", () => {
  const page = harness(new Map([[key, "[]"]]));
  const unsubscribe = page.api.subscribeToCart(() => {}, selection);
  unsubscribe();
  assert.equal(page.storageListeners.size, 0);
  const external = page.api.purchaseFromQuery("package=turbo-2&selection=while-away");
  page.values.set(key, JSON.stringify([external]));
  page.api.subscribeToCart(() => {}, "");
  assert.equal(page.api.getCartSnapshot().items.length, 1);
  assert.equal(page.api.getCartSnapshot().items[0].id, external.id);
  assert.equal(page.storageListeners.size, 1);
});

check("unavailable storage preserves in-memory changes across reconnects", () => {
  const page = harness(new Map([[key, "[]"]]));
  let unsubscribe = page.api.subscribeToCart(() => {}, selection);
  const current = page.api.getCartSnapshot();
  page.setUnavailable(true);
  unsubscribe();
  unsubscribe = page.api.subscribeToCart(() => {}, "");
  assert.equal(page.api.getCartSnapshot(), current);
  const extra = page.api.purchaseFromQuery("package=turbo-1&selection=in-memory");
  page.api.updateCartItems([extra, ...current.items]);
  unsubscribe();
  page.api.subscribeToCart(() => {}, "");
  assert.equal(page.api.getCartSnapshot().items.length, 2);
  assert.equal(page.api.getCartSnapshot().items[0].id, extra.id);
});

check("deleted or malformed storage is distinguished from unavailable storage", () => {
  const page = harness(new Map([[key, "[]"]]));
  let unsubscribe = page.api.subscribeToCart(() => {}, selection);
  unsubscribe();
  page.values.delete(key);
  unsubscribe = page.api.subscribeToCart(() => {}, "");
  assert.equal(page.api.getCartSnapshot().items.length, 0);
  unsubscribe();
  page.values.set(key, "invalid JSON");
  page.api.subscribeToCart(() => {}, "");
  assert.equal(page.api.getCartSnapshot().items.length, 0);
});

console.log(passed + " cart store scenarios passed.");
