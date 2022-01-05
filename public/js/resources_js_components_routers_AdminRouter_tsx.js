"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_routers_AdminRouter_tsx"],{

/***/ "./resources/js/components/routers/AdminRouter.tsx":
/*!*********************************************************!*\
  !*** ./resources/js/components/routers/AdminRouter.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdminRouter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _layouts_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../layouts/App */ "./resources/js/layouts/App.tsx");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config */ "./resources/js/config.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../routes */ "./resources/js/routes.ts");





function AdminRouter() {
  var rootURL = _config__WEBPACK_IMPORTED_MODULE_2__["default"].rootURL;
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Routes, null, react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
    path: rootURL,
    element: react__WEBPACK_IMPORTED_MODULE_0__.createElement(_layouts_App__WEBPACK_IMPORTED_MODULE_1__["default"], null)
  }, react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
    index: true,
    element: react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Navigate, {
      to: (0,_routes__WEBPACK_IMPORTED_MODULE_3__.getUrl)('dashboard'),
      replace: true
    })
  }), _routes__WEBPACK_IMPORTED_MODULE_3__["default"].map(function (route) {
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
      key: route.url,
      path: "".concat(route.url),
      element: react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.component, null)
    });
  })), react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
    path: "".concat(rootURL, "/*"),
    element: react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Navigate, {
      to: (0,_routes__WEBPACK_IMPORTED_MODULE_3__.getUrl)('dashboard'),
      replace: true
    })
  }));
}

/***/ }),

/***/ "./resources/js/layouts/App.tsx":
/*!**************************************!*\
  !*** ./resources/js/layouts/App.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");


function App() {
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Aku header"), react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Outlet, null));
}

/***/ })

}]);