!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MobileOrientation=void 0;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=f(n(1)),u=f(n(2)),a=f(n(3)),s=f(n(4)),c=n(6);function f(e){return e&&e.__esModule?e:{default:e}}var l=o.default.name,d=new u.default,p=new c.DetectByGl,h="resize",v="portrait",y="landscape";t.MobileOrientation=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._detect=function(){t.detectPortrait(),t.detectLandscape()},this.detectPortrait=function(){(t._isPortrait||t.isDesktop)&&(t.state="portrait",t.emit(v))},this.detectLandscape=function(){t._isLandscape&&t.isMobile&&(t.state="landscape",t.emit(y))};this.options=i({},{debug:!1,withTouch:!1,debounceTime:50,portraitMediaQuery:"screen and (max-device-aspect-ratio: 1/1)"},n),this.state=null,this.detect=(0,s.default)(function(){t._detect(),t.emit(h)},this.options.debounceTime),window.addEventListener(h,this.detect),this.detect()}return r(e,[{key:"log",value:function(e){console.warn(a.default.words(l)+": "+(0,a.default)(e)+".")}},{key:"isTruthy",value:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).some(function(e){return!0===e})}},{key:"isAllTruthy",value:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).every(function(e){return!0===e})}},{key:"emit",value:function(e){d.emit(e,this.state)}},{key:"subscribe",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.events.includes(e)&&d.subscribe(e,t)}},{key:"destroy",value:function(){window.removeEventListener(h,this.detect)}},{key:"isMobile",get:function(){var e=[],t=p.models.length,n=!!window.navigator.platform&&/iPad|iPhone|iPod/.test(window.navigator.platform),i=!window.MSStream&&/iPad|iPhone|iPod/.test(window.navigator.userAgent),r=window.navigator.msMaxTouchPoints||"ontouchstart"in document;return e.push(t,n,i),this.options.withTouch&&e.push(r),this.isTruthy(e)}},{key:"isDesktop",get:function(){return!this.isMobile}},{key:"isPortrait",get:function(){return"portrait"===this.state}},{key:"isLandscape",get:function(){return"landscape"===this.state}},{key:"_isPortrait",get:function(){var e=[];return window.matchMedia?e.push(window.matchMedia(this.options.portraitMediaQuery).matches):this.isDebug&&this.log("incompatible browser"),this.isTruthy(e)}},{key:"_isLandscape",get:function(){return!this._isPortrait}},{key:"events",get:function(){return[h,v,y]}},{key:"isDebug",get:function(){return this.options.debug}}]),e}()},function(e,t){e.exports={name:"mobile-orientation",version:"1.2.7",description:"",main:"dist",scripts:{bundle:"npx webpack --config webpack.js"},repository:{type:"git",url:"https://github.com/adi518/mobile-orientation.git"},author:"",license:"ISC",devDependencies:{"babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-preset-es2015":"^6.24.1","babel-preset-stage-2":"^6.24.1","uglifyjs-webpack-plugin":"^1.1.6",webpack:"^3.10.0"},dependencies:{capitalize:"^1.0.0","es6-emitter":"^1.0.1","lodash.debounce":"^4.0.8"}}},function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();var r=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.events=new Map(t)}return i(e,[{key:"subscribe",value:function(e,t){var n=this;return this.events.set(e,[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(this.events.has(e)?this.events.get(e):[]),[t])),function(){return n.events.set(e,n.events.get(e).filter(function(e){return e!==t}))}}},{key:"emit",value:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];return this.events.has(e)&&this.events.get(e).map(function(e){return e.apply(void 0,n)})}}]),e}();e.exports=r},function(e,t,n){"use strict";e.exports=function(e){return e.charAt(0).toUpperCase()+e.substring(1)},e.exports.words=function(e){return e.replace(/(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g,function(e){return e.toUpperCase()})}},function(e,t,n){"use strict";(function(t){var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i="Expected a function",r=NaN,o="[object Symbol]",u=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,c=/^0o[0-7]+$/i,f=parseInt,l="object"==(void 0===t?"undefined":n(t))&&t&&t.Object===Object&&t,d="object"==("undefined"==typeof self?"undefined":n(self))&&self&&self.Object===Object&&self,p=l||d||Function("return this")(),h=Object.prototype.toString,v=Math.max,y=Math.min,b=function(){return p.Date.now()};function g(e){var t=void 0===e?"undefined":n(e);return!!e&&("object"==t||"function"==t)}function m(e){return"symbol"==(void 0===e?"undefined":n(e))||!!(t=e)&&"object"==(void 0===t?"undefined":n(t))&&h.call(e)==o;var t}function w(e){if("number"==typeof e)return e;if(m(e))return r;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(u,"");var n=s.test(e);return n||c.test(e)?f(e.slice(2),n?2:8):a.test(e)?r:+e}e.exports=function(e,t,n){var r,o,u,a,s,c,f=0,l=!1,d=!1,p=!0;if("function"!=typeof e)throw new TypeError(i);function h(t){var n=r,i=o;return r=o=void 0,f=t,a=e.apply(i,n)}function m(e){var n=e-c;return void 0===c||n>=t||n<0||d&&e-f>=u}function P(){var e,n,i=b();if(m(i))return k(i);s=setTimeout(P,(n=t-((e=i)-c),d?y(n,u-(e-f)):n))}function k(e){return s=void 0,p&&r?h(e):(r=o=void 0,a)}function x(){var e,n=b(),i=m(n);if(r=arguments,o=this,c=n,i){if(void 0===s)return f=e=c,s=setTimeout(P,t),l?h(e):a;if(d)return s=setTimeout(P,t),h(c)}return void 0===s&&(s=setTimeout(P,t)),a}return t=w(t)||0,g(n)&&(l=!!n.leading,u=(d="maxWait"in n)?v(w(n.maxWait)||0,t):u,p="trailing"in n?!!n.trailing:p),x.cancel=function(){void 0!==s&&clearTimeout(s),f=0,r=c=o=s=void 0},x.flush=function(){return void 0===s?a:k(b())},x}}).call(t,n(5))},function(e,t,n){"use strict";var i,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":r(window))&&(i=window)}e.exports=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();var o={"Apple A7 GPU":{1136:["iPhone 5","iPhone 5s"],2048:["iPad Air","iPad Mini 2","iPad Mini 3"]},"Apple A8 GPU":{1136:["iPod touch (6th generation)"],1334:["iPhone 6"],2001:["iPhone 6 Plus"],2048:["iPad Air 2","iPad Mini 4"]},"Apple A9 GPU":{1136:["iPhone SE"],1334:["iPhone 6s"],2001:["iPhone 6s Plus"],2224:["iPad Pro (9.7-inch)"],2732:["iPad Pro (12.9-inch)"]},"Apple A10 GPU":{1334:["iPhone 7"],2001:["iPhone 7 Plus"]}};t.DetectByGl=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.devices=i({},o,t.devices)}return r(e,[{key:"canvas",get:function(){return document.createElement("canvas")}},{key:"gl",get:function(){return this.canvas.getContext("experimental-webgl")}},{key:"renderer",get:function(){var e=this.gl,t=e.getExtension("WEBGL_debug_renderer_info");return t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):"unknown"}},{key:"screenWidth",get:function(){var e=window,t=e.screen,n=e.devicePixelRatio;return Math.max(t.width,t.height)*(n||1)}},{key:"models",get:function(){var e=this.devices,t=this.renderer,n=this.screenWidth;return(e[t]||[])[n]||["unknown"]}}]),e}()}])});