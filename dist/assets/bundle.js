/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _enableInfoHandlers = __webpack_require__(4);

var _enableInfoHandlers2 = _interopRequireDefault(_enableInfoHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description: Takes an object which contains the data of the suggestions and displays them
 * - Also calls enableInfo on each result to 
 * @var: {object} resultData - An object that has a key data which contains the data for the last
 */
var createSearchResults = function createSearchResults(resultData) {
    var suggestionBox = document.getElementById('search-suggestions');
    suggestionBox.innerHTML = '';
    resultData.data.forEach(function (result) {
        var div = document.createElement('div');
        div.setAttribute('class', 'result-container');
        div.innerHTML = result;
        suggestionBox.appendChild(div);
        (0, _enableInfoHandlers2.default)(div);
    });
};

exports.default = createSearchResults;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(7);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instaSearch = __webpack_require__(3);

var _instaSearch2 = _interopRequireDefault(_instaSearch);

var _initialLoad = __webpack_require__(6);

var _initialLoad2 = _interopRequireDefault(_initialLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    (0, _initialLoad2.default)();
    (0, _instaSearch2.default)();
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createSearchResults = __webpack_require__(0);

var _createSearchResults2 = _interopRequireDefault(_createSearchResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc: Sets up eventlisteners for search box
 * - on input, we'll create a web worker that will request the titles with the current search value
 * -the results of that will be sent to createSearchResults
 */
var instaSearch = function instaSearch() {
    var search = document.getElementById('search-term');
    var suggestionBox = document.getElementById('search-suggestions');
    var currentWorker = void 0;

    search.addEventListener('input', function (e) {

        //if there is a webworker currently requesting titles, terminate it
        if (currentWorker) {
            currentWorker.terminate();
        }

        //delay launching web worker to minimize requests until user is done typing
        setTimeout(function () {

            //launch a web worker to get the appropriate titles and set this worker to be the current worker
            var worker = new Worker('./webWorkers/requestTitles.js');
            currentWorker = worker;
            worker.postMessage(e.target.value);

            worker.onmessage = function (event) {
                //save last results for refresh
                localStorage.history = JSON.stringify({ data: event.data });

                suggestionBox.innerHTML = (0, _createSearchResults2.default)({ data: event.data }).innerHTML;
            };
        }, 500);
    });
};

exports.default = instaSearch;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createInfo = __webpack_require__(5);

var _createInfo2 = _interopRequireDefault(_createInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc: Sets up info on hover or click for each suggestion
 * - Either makes a request to get the info using a web worker
 * - or shows the existing info
 * - determines the current position of the parent container and places the overlay to right unless it would go off screen
 * @var {Element} node - the Element we want to enable or create the info box for
 */
var enableInfoHandlers = function enableInfoHandlers(node) {

    var imdbID = node.querySelector('.title-container').id;

    node.addEventListener('mouseenter', function () {
        var titleInfoContainer = node.querySelector('.title-info-container');

        //if we have already created the title info container show it, otherwise create it
        if (titleInfoContainer) {
            //make sure not placing info box off screen
            var className = window.innerWidth - node.offsetLeft > 600 ? 'title-info-container open right' : 'title-info-container open left';
            titleInfoContainer.setAttribute('class', className);
        } else {
            var worker = new Worker('./webWorkers/requestInfo.js');
            worker.postMessage(imdbID);
            worker.onmessage = function (event) {
                (0, _createInfo2.default)(event.data, imdbID, node);
            };
        }
    });
    //Closes the container on mouseleave
    node.addEventListener('mouseleave', function () {
        var titleInfoContainer = node.querySelector('.title-info-container');
        if (titleInfoContainer) {
            titleInfoContainer.setAttribute('class', 'title-info-container closed');
        }
    });
};

exports.default = enableInfoHandlers;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @desc: Creates the info container for the element with the imdId and the received data, and appends it to parent
 * @var: data {String} - the html that we'll add to the child node
 * @var: imdbID {String} - the imdbd identifier dor this element
 */

var createInfo = function createInfo(data, imdbID, parent) {
    var div = document.createElement('div');

    //sets the new info box to either be closed or appear on whichever side has more room
    var className = document.querySelectorAll('.open').length > 0 ? 'title-info-container closed' : window.innerWidth - parent.offsetLeft > 600 ? 'title-info-container open right' : 'title-info-container open left';

    div.setAttribute('class', className);
    div.setAttribute('id', 'info-' + imdbID);

    div.innerHTML = data;
    parent.appendChild(div);

    //set up handlers for closing info box
    var closeButton = parent.querySelector('.close-info');
    closeButton.addEventListener('click', function () {
        var titleInfoContainer = parent.querySelector('.title-info-container');
        titleInfoContainer.setAttribute('class', 'title-info-container closed');
    });
};

exports.default = createInfo;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createSearchResults = __webpack_require__(0);

var _createSearchResults2 = _interopRequireDefault(_createSearchResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialLoad = function initialLoad() {
    if (localStorage.history) {
        (0, _createSearchResults2.default)(JSON.parse(localStorage.history));
    }
};

exports.default = initialLoad;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);