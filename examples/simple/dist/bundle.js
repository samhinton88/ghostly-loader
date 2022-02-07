/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 998:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const foo = (...args) => {
  const determine = __webpack_require__.g.determineGhost("__ghost__foo", {
    foo$: 0.2
  });

  function foo() {
    return 'foo';
  }

  // 0.2
  function foo$() {
    return 'bar';
  }

  return {
    main: foo,
    ["foo$"]: foo$
  }[determine](...args);
};

module.exports = foo;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// realistically this would be configured elsewhere
__webpack_require__.g.determineGhost = id => {
  return Math.random() > .5 ? 'main' : id;
};

const foo = __webpack_require__(998);

const greet = (...args) => {
  const determine = __webpack_require__.g.determineGhost("__ghost__greet", {
    greet$spanish: undefined,
    greet$french: undefined,
    greet$french2: undefined
  });

  function greet() {
    console.log('Hello World');
    console.log(foo());
  }

  function greet$spanish() {
    console.log('Hola Mundo');
  }

  function greet$french() {
    console.log('Salut monde');
  }

  function greet$french2() {
    console.log('Bonjour monde');
  }

  return {
    main: greet,
    ["greet$spanish"]: greet$spanish,
    ["greet$french"]: greet$french,
    ["greet$french2"]: greet$french2
  }[determine](...args);
};

greet();
})();

/******/ })()
;