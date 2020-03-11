!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s(s.s=6)}([function(e,t,s){"use strict";try{self["workbox:core:5.0.0"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:precaching:5.0.0"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:5.0.0"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:5.0.0"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:expiration:5.0.0"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:cacheable-response:5.0.0"]&&_()}catch(e){}},function(e,t,s){"use strict";s.r(t);s(0);const n=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class a extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const i=new Set;const r={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},c=e=>[r.prefix,e,r.suffix].filter(e=>e&&e.length>0).join("-"),o=e=>e||c(r.precache),h=e=>e||c(r.runtime);const u=e=>{const t=new URL(String(e),location.href);return t.origin===location.origin?t.pathname:t.href},l=(e,t)=>e.filter(e=>t in e),p=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const i=await self.caches.open(e),r=await f({plugins:a,request:t,mode:"read"});let c=await i.match(r,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;c=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},d=async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,i=!1;for(let t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return i||(a=a&&200===a.status?a:void 0),a||null},f=async({request:e,mode:t,plugins:s=[]})=>{const n=l(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},g={put:async({cacheName:e,request:t,response:s,event:n,plugins:r=[],matchOptions:c})=>{const o=await f({plugins:r,request:t,mode:"write"});if(!s)throw new a("cache-put-with-no-response",{url:u(o.url)});let h=await d({event:n,plugins:r,response:s,request:o});if(!h)return void 0;const g=await self.caches.open(e),m=l(r,"cacheDidUpdate");let w=m.length>0?await p({cacheName:e,matchOptions:c,request:o}):null;try{await g.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of i)await e()}(),e}for(let t of m)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:w,newResponse:h,request:o})},match:p};let m;function w(e){e.then(()=>{})}class _{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),h=t?o.index(t):o,u=[],l=h.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(u.push(i?e:e.value),a&&u.length>=a?c(u):e.continue()):c(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const i=this._db.transaction(e,t);i.onabort=()=>a(i.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const i=s.objectStore(t),r=i[e].apply(i,n);r.onsuccess=()=>a(r.result)})}close(){this._db&&(this._db.close(),this._db=null)}}_.prototype.OPEN_TIMEOUT=2e3;const y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(y))for(const s of t)s in IDBObjectStore.prototype&&(_.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});const v=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const i=l(n,"fetchDidFail"),r=i.length>0?e.clone():null;try{for(let t of n)if("requestWillFetch"in t){const n=t.requestWillFetch,a=e.clone();e=await n.call(t,{request:a,event:s})}}catch(e){throw new a("plugin-error-request-will-fetch",{thrownError:e})}let c=e.clone();try{let a;a="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(a=await e.fetchDidSucceed.call(e,{event:s,request:c,response:a}));return a}catch(e){0;for(const t of i)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:r.clone(),request:c.clone()});throw e}};async function x(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,i=function(){if(void 0===m){const e=new Response("");if("body"in e)try{new Response(e.body),m=!0}catch(e){m=!1}m=!1}return m}()?s.body:await s.blob();return new Response(i,a)}s(1);const q=[],R={get:()=>q,add(e){q.push(...e)}};function b(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),i=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:i.href}}class N{constructor(e){this._cacheName=o(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=b(s),i="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),t.length>0){const e="Workbox is precaching URLs without revision "+`info: ${t.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this._cacheName),i=await a.keys(),r=new Set(i.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const a=this._cacheKeysToIntegrities.get(s),i=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:i,event:e,integrity:a,plugins:t,url:n})});return await Promise.all(c),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:i,integrity:r}){const c=new Request(t,{integrity:r,cache:s,credentials:"same-origin"});let o,h=await v({event:n,plugins:i,request:c});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:n,request:c,response:h}):h.status<400))throw new a("bad-precaching-response",{url:t,status:h.status});h.redirected&&(h=await x(h)),await g.put({event:n,plugins:i,response:h,request:e===t?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new a("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new a("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let U;const T=()=>(U||(U=new N),U);const E=(e,t)=>{const s=T().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let O=!1;function L(e){O||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=o();self.addEventListener("fetch",i=>{const r=E(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return void 0;let c=self.caches.open(a).then(e=>e.match(r)).then(e=>e||fetch(r));i.respondWith(c)})})(e),O=!0)}const S=e=>{const t=T(),s=R.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},C=e=>{const t=T();e.waitUntil(t.activate())};s(2);const K=e=>e&&"object"==typeof e?e:{handle:e};class M{constructor(e,t,s="GET"){this.handler=K(t),this.match=e,this.method=s}}class k extends M{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class j{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;let n,{params:a,route:i}=this.findMatchingRoute({url:s,request:e,event:t}),r=i&&i.handler;if(!r&&this._defaultHandler&&(r=this._defaultHandler),r){try{n=r.handle({url:s,request:e,event:t,params:a})}catch(e){n=Promise.reject(e)}return n instanceof Promise&&this._catchHandler&&(n=n.catch(n=>this._catchHandler.handle({url:s,request:e,event:t}))),n}}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n,i=a.match({url:e,request:t,event:s});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=K(e)}setCatchHandler(e){this._catchHandler=K(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let A;const P=()=>(A||(A=new j,A.addFetchListener(),A.addCacheListener()),A);function W(e,t,s){let n;if("string"==typeof e){const a=new URL(e,location.href);0,n=new M(({url:e})=>e.href===a.href,t,s)}else if(e instanceof RegExp)n=new k(e,t,s);else if("function"==typeof e)n=new M(e,t,s);else{if(!(e instanceof M))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return P().registerRoute(n),n}s(3);class D{constructor(e={}){this._cacheName=h(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await g.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new a("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await v({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),a=g.put({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(a)}catch(e){0}return s}}const I={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class F{constructor(e={}){if(this._cacheName=h(e.cacheName),e.plugins){let t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[I,...e.plugins]}else this._plugins=[I];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){const s=[];"string"==typeof t&&(t=new Request(t));const n=[];let i;if(this._networkTimeoutSeconds){const{id:a,promise:r}=this._getTimeoutPromise({request:t,event:e,logs:s});i=a,n.push(r)}const r=this._getNetworkPromise({timeoutId:i,request:t,event:e,logs:s});n.push(r);let c=await Promise.race(n);if(c||(c=await r),!c)throw new a("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:s}))},1e3*this._networkTimeoutSeconds)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let a,i;try{i=await v({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){a=e}if(e&&clearTimeout(e),a||!i)i=await this._respondFromCache({request:t,event:n});else{const e=i.clone(),s=g.put({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){0}}return i}_respondFromCache({event:e,request:t}){return g.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}class H{constructor(e={}){if(this._cacheName=h(e.cacheName),this._plugins=e.plugins||[],e.plugins){let t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[I,...e.plugins]}else this._plugins=[I];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=this._getFromNetwork({request:t,event:e});let n,i=await g.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(i){if(e)try{e.waitUntil(s)}catch(n){0}}else{0;try{i=await s}catch(e){n=e}}if(!i)throw new a("no-response",{url:t.url,error:n});return i}async _getFromNetwork({request:e,event:t}){const s=await v({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=g.put({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){0}return s}}s(5);class B{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(t=>e.headers.get(t)===this._headers[t])),t}}s(4);const Q=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class ${constructor(e){this._cacheName=e,this._db=new _("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this._cacheName)}async setTimestamp(e,t){const s={url:e=Q(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",s)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let r=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&r>=t?i.push(s.value):r++),s.continue()}else n(i)}}),n=[];for(const e of s)await this._db.delete("cache-entries",e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+Q(e)}}class G{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new $(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,w(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class J{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;let a=this._isResponseDateFresh(n);const i=this._getCacheExpiration(s);w(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),i.add(t))}_getCacheExpiration(e){if(e===h())throw new a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new G(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}var V;self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",()=>self.clients.claim()),function(e){T().addToCacheList(e),e.length>0&&(self.addEventListener("install",S),self.addEventListener("activate",C))}([{'revision':'28c954ebb794bb2db97ff383b951152e','url':'/207d99f6c4c2cc849641.js'},{'revision':'1ea5cfc5e1f86d4ea004dc0457917780','url':'/2d4b927e76c25407b087.js'},{'revision':'a16996039a27b8b6a312cf94e1f92152','url':'/2e39d11ab38c7dbf5bca.js'},{'revision':'b59a3a9455a25632d9a3b1552e3da175','url':'/2e87055113c2ab8528a5.js'},{'revision':'1ed482cee4cb56f40f7a0c96aca59db8','url':'/2e87055113c2ab8528a5.js.LICENSE.txt'},{'revision':'efc45a48308fbb2937becedd9e5ed66e','url':'/521028474ebbe8c123b5.js'},{'revision':'9c6f24df5510e74f617ee1eca37cc696','url':'/59ba97b3d98e3965da26.js'},{'revision':'7fd23991b0b37b49066e7a34e0535285','url':'/59ba97b3d98e3965da26.js.LICENSE.txt'},{'revision':'75268b4fab5b8301aadd67f13ad70d72','url':'/60140406c332006e2a4e.js'},{'revision':'71cc31433634651ed8aedf9cb29b5906','url':'/60140406c332006e2a4e.js.LICENSE.txt'},{'revision':'98cf7abbfab76b1e7901aa9a88c8ae82','url':'/6e8ee5a9310e2602d143.js'},{'revision':'9d20a23d42bf766732edddc51caf49d2','url':'/7223a2e36c728f1b244d.js'},{'revision':'68d3d40e31089549a40a960cca4518b4','url':'/73d2109a3e3047f04c89.js'},{'revision':'80320f6de77922478f4aa0bbe7a80d89','url':'/745300935f2dd503b821.js'},{'revision':'087277bb8eb814b14d8f9662696443fe','url':'/8b91d165bcb724a24d32.js'},{'revision':'ad34b05524f116daba1cbcaa5e9907de','url':'/8d1c5b080673fddde920.js'},{'revision':'2b100d54b696f2d34437309d3580dc20','url':'/8d1c5b080673fddde920.js.LICENSE.txt'},{'revision':'c52e2178770f25cfa14312d001ca4246','url':'/8d8807c3272fd7f37535.js'},{'revision':'4d5eea98c55f4e9c73b9e60ad23a2801','url':'/90b5de4f4631853f234b.js'},{'revision':'db6d1acf19676e4c1f1a20695e33e617','url':'/94889b3f943af3315307.js'},{'revision':'ba97f7d44ea07cba36f675284227eaaa','url':'/94889b3f943af3315307.js.LICENSE.txt'},{'revision':'0802bce90e76603737fb054e4bfea0c0','url':'/admin.cd39818de081af3e5632.js'},{'revision':'5dae3c5565db289db1b2a92bb4754b2d','url':'/admin.cd39818de081af3e5632.js.LICENSE.txt'},{'revision':'5a4d6a445cbcc81d980db1c2e2355d2e','url':'/af48bf8f8dbb3e9d3bcc.js'},{'revision':'e8002d1d4c2f38826bbb98040398ad01','url':'/bceed295cffbcee94219.js'},{'revision':'5ba6fbc7516a5c3041f03e009339f3ba','url':'/bceed295cffbcee94219.js.LICENSE.txt'},{'revision':'a28d7852cac043e6d336a0b88d0069ce','url':'/bfecd9906aca90f01d44.js'},{'revision':'fdadbfa505d8e2cab4eb515487e3517c','url':'/cab238dd71c75c0c6595.js'},{'revision':'f3e22506239becce9134d8acbc369be0','url':'/checkout.b4d68d6aaf67e9d2d1c1.js'},{'revision':'fdafb2fb804be210a26e41f6c85b8c72','url':'/checkout.b4d68d6aaf67e9d2d1c1.js.LICENSE.txt'},{'revision':'b220a6b3ea8b41ade4b65995526deb7d','url':'/eb22c6d498d44f4576c8.js'},{'revision':'e18bcac1732e9ae8c898453082e0291a','url':'/icon_128x128.e18bcac1732e9ae8c898453082e0291a.gif'},{'revision':'e18bcac1732e9ae8c898453082e0291a','url':'/icon_192x192.e18bcac1732e9ae8c898453082e0291a.gif'},{'revision':'599c80939f60a85de1f63549c6c0398c','url':'/icon_384x384.599c80939f60a85de1f63549c6c0398c.jpeg'},{'revision':'81adae25a4c114524e6b9a315944e7e7','url':'/icon_512x512.81adae25a4c114524e6b9a315944e7e7.jpeg'},{'revision':'e18bcac1732e9ae8c898453082e0291a','url':'/icon_96x96.e18bcac1732e9ae8c898453082e0291a.gif'},{'revision':'64a6f6bebf5e9cd7bc01d2395bede340','url':'/manifest.json'},{'revision':'b20a6e8664c43f6fc58f2c7a488fc452','url':'/storefront.a53451b6cd083cb5c507.js'},{'revision':'b9b8d7e825eb2bb283f2b206f85a3fc0','url':'/storefront.a53451b6cd083cb5c507.js.LICENSE.txt'},{'revision':'871425d5c953291f2fa6593f3b6f4947','url':'/storefront.c4dfda906b740cd563e6.css'}]),L(V),W(/^https:\/\/fonts\.googleapis\.com/,new H({cacheName:"google-fonts-stylesheets"})),W(/^https:\/\/fonts\.gstatic\.com/,new D({cacheName:"google-fonts-webfonts",plugins:[new class{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new B(e)}}({statuses:[0,200]}),new J({maxAgeSeconds:31536e3,maxEntries:30})]})),W(/^https:\/\/code\.jquery\.com/,new H({cacheName:"cdn-jquery"})),W(/^https:\/\/cdn\.jsdelivr\.net/,new H({cacheName:"cdn-jsdelivr"})),W(/^https:\/\/io(storefront)?\.ecvol\.com/,new F({networkTimeoutSeconds:3,cacheName:"api-cache",plugins:[new J({maxEntries:20})]})),W(/^https:\/\/ioapi?\.ecvol\.com/,new F({networkTimeoutSeconds:3,cacheName:"store-api-cache",plugins:[new J({maxEntries:50,purgeOnQuotaError:!0})]})),W(/^https:\/\/(?:api|apx-search).e-com\.plus\/(api\/)?v[1-9]+\//,new F({cacheName:"live-api",plugins:[new J({maxEntries:50,maxAgeSeconds:300})]})),W(/^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/([12345]?[0-9]{2}px|normal|small)\//,new D({cacheName:"pictures",plugins:[new J({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]})),W(/^https:\/\/ecom-[\w]+\.[\w]+\.digitaloceanspaces\.com\/imgs\/([678]?[0-9]{2}px|big)\//,new D({cacheName:"pictures-big",plugins:[new J({maxEntries:10,maxAgeSeconds:172800,purgeOnQuotaError:!0})]})),W(/\/assets\//,new H({cacheName:"assets"})),W(/\/((?:img|assets).*)?logo\.(?:png|gif|jpg|jpeg|webp|svg)$/,new H({cacheName:"logo"})),W(/\/img\/uploads\/.*\.(?:png|gif|jpg|jpeg|webp|svg)$/,new H({cacheName:"media",plugins:[new J({maxEntries:20,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]})),W("/",new F),W(/\/((?!(?:admin|assets|img)(\/|$))[^.]+)(\.(?!js|css|xml|txt|png|gif|jpg|jpeg|webp|svg)[^.]+)*$/,new F({cacheName:"page",plugins:[new J({maxEntries:50,purgeOnQuotaError:!0})]}))}]);
//# sourceMappingURL=sw.js.map