// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jVHsr":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "dbb58b0d98710c1e";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"aztIg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _blocksJs = require("../lib/blocks.js");
var _blocksJsDefault = parcelHelpers.interopDefault(_blocksJs);
var _keywordsJs = require("../lib/keywords.js");
var _keywordsJsDefault = parcelHelpers.interopDefault(_keywordsJs);
window.formatData = {
    motion: "4c97ff",
    looks: "9966ff",
    sound: "cf63cf",
    event: "de5b71",
    control: "ffab19",
    sensing: "5cb1d6",
    operators: "59c059",
    data: "ff8c1a",
    procedures: "ff6680",
    bool: "4781d1",
    keyword: "ff6680"
};
let keywords = {};
for (let word of (0, _keywordsJsDefault.default).outer.concat((0, _keywordsJsDefault.default).inner))keywords[word] = {
    opcode: "keyword_" + word.replaceAll("_", "")
};
for (let word1 of (0, _keywordsJsDefault.default).events)keywords[word1] = {
    opcode: "event_" + word1.replaceAll("_", "")
};
let blocks = Object.assign((0, _blocksJsDefault.default), keywords);
function escape(text) {
    return text.replaceAll("<", "&lt;", "&", "&amp;");
}
function format(lines) {
    lines.forEach((line)=>{
        let innerText = line.innerText.split(/[^a-z0-9\_]/i);
        let commonWords = innerText.filter((value)=>blocks.hasOwnProperty(value));
        line.innerHTML = line.innerHTML.replace(/\-?[0-9\.]+/g, `<span class="number" style="color: #${formatData.operators}">$&</span>`).replaceAll("true", `<span class="boolean" style="color: #${formatData.bool}">true</span>`).replaceAll("false", `<span class="boolean" style="color: #${formatData.bool}">false</span>`);
        commonWords.forEach((word)=>{
            let blockType = blocks[word].opcode.split("_")[0];
            line.innerHTML = line.innerHTML.replaceAll(word, `<span class="function type-${blockType}" style="color: #${formatData[blockType]}">${escape(word)}</span>`);
        });
    });
    $("div.contenteditable").focus();
}
window.format = function aaa() {
    let target = document.querySelector("pre.text");
    let lines = target.querySelectorAll("div.line");
    format(lines);
};

},{"../lib/blocks.js":"kSYJ1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../lib/keywords.js":"3Cz8y"}],"kSYJ1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const str = "str";
const float = "float";
const structures = {
    float: [
        1,
        [
            4,
            "__VALUE__"
        ]
    ],
    string: [
        1,
        [
            10,
            "__VALUE__"
        ]
    ],
    angle: [
        1,
        [
            9,
            "__VALUE__"
        ]
    ],
    field: [
        "__VALUE__",
        null
    ]
};
function a(type, name, structure, isField) {
    return {
        type,
        name,
        structure,
        isField: Boolean(isField)
    };
}
exports.default = {
    go_to: {
        args: {
            x: a(float, "X", structures.float),
            y: a(float, "Y", structures.float)
        },
        opcode: "motion_gotoxy"
    },
    move_steps: {
        args: {
            steps: a(float, "STEPS", structures.float)
        },
        opcode: "motion_movesteps"
    },
    turn: {
        args: {
            degrees: a(float, "DEGREES", structures.float)
        },
        opcode: "motion_turnright"
    },
    go_to_sprite: {
        args: {
            sprite: a(str, "TO", structures.string)
        },
        opcode: "motion_goto"
    },
    glide_to_sprite: {
        args: {
            seconds: a(float, "SECS", structures.float),
            sprite: a(str, "TO", structures.string)
        },
        opcode: "motion_glideto"
    },
    glide_to: {
        args: {
            seconds: a(float, "SECS", structures.float),
            x: a(float, "X", structures.float),
            y: a(float, "Y", structures.float)
        },
        opcode: "motion_glidesecstoxy"
    },
    set_direction: {
        args: {
            direction: a(float, "DIRECTION", structures.angle)
        },
        opcode: "motion_pointindirection"
    },
    point_towards: {
        args: {
            sprite: a(str, "TOWARDS", structures.string)
        },
        opcode: "motion_pointtowards"
    },
    change_x: {
        args: {
            amount: a(float, "DX", structures.float)
        },
        opcode: "motion_changexby"
    },
    set_x: {
        args: {
            new_x: a(float, "X", structures.float)
        },
        opcode: "motion_setx"
    },
    change_y: {
        args: {
            amount: a(float, "DY", structures.float)
        },
        opcode: "motion_changeyby"
    },
    set_y: {
        args: {
            new_y: a(float, "Y", structures.float)
        },
        opcode: "motion_sety"
    },
    bounce_on_edge: {
        args: {},
        opcode: "motion_ifonedgebounce"
    },
    set_rot_style: {
        args: {
            new_style: a(str, "STYLE", structures.field, true)
        },
        opcode: "motion_setrotationstyle"
    },
    say_for_secs: {
        args: {
            message: a(str, "MESSAGE", structures.string),
            duration: a(float, "SECS", structures.float)
        },
        opcode: "looks_sayforsecs"
    },
    say: {
        args: {
            message: a(str, "MESSAGE", structures.string)
        },
        opcode: "looks_say"
    },
    think_for_secs: {
        args: {
            message: a(str, "MESSAGE", structures.string),
            duration: a(float, "SECS", structures.float)
        },
        opcode: "looks_thinkforsecs"
    },
    think: {
        args: {
            message: a(str, "MESSAGE", structures.string)
        },
        opcode: "looks_think"
    },
    set_costume: {
        args: {
            new_costume: a(str, "COSTUME", structures.string)
        },
        opcode: "looks_swtichcostumeto"
    },
    next_costume: {
        args: {},
        opcode: "looks_nextcostume"
    },
    set_backdrop: {
        args: {
            backdrop: a(str, "BACKDROP", structures.string)
        },
        opcode: "looks_switchbackdropto"
    },
    next_backdrop: {
        args: {},
        opcode: "looks_nextbackdrop"
    },
    change_size: {
        args: {
            amount: a(float, "CHANGE", structures.float)
        },
        opcode: "looks_changesizeby"
    },
    set_size: {
        args: {
            new_size: a(float, "SIZE", structures.float)
        },
        opcode: "looks_setsizeto"
    },
    change_graphic_effect: {
        args: {
            effect: a(str, "EFFECT", structures.field, true),
            amount: a(float, "CHANGE", structures.float)
        },
        opcode: "looks_changeeffectby"
    },
    set_graphic_effect: {
        args: {
            effect: a(str, "EFFECT", structures.field, true),
            new_value: a(float, "VALUE", structures.float)
        },
        opcode: "looks_seteffectto"
    },
    clear_graphic_effects: {
        args: {},
        opcode: "looks_cleargraphiceffects"
    },
    show: {
        args: {},
        opcode: "looks_show"
    },
    hide: {
        args: {},
        opcode: "looks_hide"
    },
    set_layer_front_back: {
        args: {
            front_or_back: a(str, "FRONT_BACK", structures.field, true)
        },
        opcode: "looks_gotofrontback"
    },
    change_layer: {
        args: {
            amount: a(float, "NUM", structures.float),
            forward_or_backward: a(str, "FORWARD_BACKWARD", structures.field, true)
        },
        opcode: "looks_goforwardbackwardlayers"
    },
    play_sound: {
        args: {
            sound: a(str, "SOUND_MENU", structures.string)
        },
        opcode: "sound_playuntildone"
    },
    start_sound: {
        args: {
            sound: a(str, "SOUND_MENU", structures.string)
        },
        opcode: "sound_play"
    },
    stop_sounds: {
        args: {},
        opcode: "sound_stopallsounds"
    },
    change_sound_effect: {
        args: {
            effect: a(str, "EFFECT", structures.field, true),
            amount: a(float, "VALUE", structures.float)
        },
        opcode: "sound_changeeffectby"
    },
    set_sound_effect: {
        args: {
            effect: a(str, "EFFECT", structures.field, true),
            amount: a(float, "VALUE", structures.float)
        },
        opcode: "sound_seteffectto"
    },
    clear_sound_effects: {
        args: {},
        opcode: "sound_cleareffects"
    },
    change_volume: {
        args: {
            amount: a(float, "VOLUME", structures.float)
        },
        opcode: "sound_changevolumeby"
    },
    set_volume: {
        args: {
            new_volume: a(float, "VOLUME", structures.float)
        },
        opcode: "sound_setvolumeto"
    },
    broadcast: {
        args: {
            signal: a(str, "BROADCAST_INPUT", structures.str)
        },
        opcode: "event_broadcast"
    },
    broadcast_and_wait: {
        args: {
            signal: a(str, "BROADCAST_INPUT", structures.str)
        },
        opcode: "event_broadcastandwait"
    },
    sleep: {
        args: {
            duration: a(float, "DURATION", structures.float)
        },
        opcode: "control_wait"
    },
    stop: {
        args: {
            scope: a(str, "STOP_OPTION", structures.field, true)
        },
        opcode: "control_stop"
    },
    clone: {
        args: {
            sprite: a(str, "CLONE_OPTION", structures.string)
        },
        opcode: "control_create_clone_of"
    },
    delete_this_clone: {
        args: {},
        opcode: "control_delete_this_clone"
    },
    prompt: {
        args: {
            prompt: a(str, "QUESTION", structures.string)
        },
        opcode: "sensing_askandwait"
    },
    set_draggable: {
        args: {
            drag_mode: a(str, "DRAG_MODE", structures.field, true)
        },
        opcode: "sensing_setdragmode"
    },
    reset_timer: {
        args: {},
        opcode: "sensing_resettimer"
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3Cz8y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    outer: [
        "on",
        "def",
        "float",
        "bool",
        "str" // list definitions: str[] = ["a", "b", "c"]
    ],
    events: [
        "flag",
        "keydown",
        "click",
        "backdrop",
        "loudness",
        "clone",
        "timer" // message: on message1, on some_message
    ],
    inner: [
        "repeat",
        "forever",
        "if",
        "else",
        "elif",
        "while",
        "until"
    ]
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jVHsr","aztIg"], "aztIg", "parcelRequire94c2")

//# sourceMappingURL=index.98710c1e.js.map
