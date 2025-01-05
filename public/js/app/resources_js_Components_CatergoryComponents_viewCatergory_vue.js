"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Components_CatergoryComponents_viewCatergory_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm-bundler.js");
/* harmony import */ var _Composables_useProductView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Composables/useProductView */ "./resources/js/Composables/useProductView.js");
/* harmony import */ var _Utilities_Products_ProductsView_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utilities/Products/ProductsView.vue */ "./resources/js/Utilities/Products/ProductsView.vue");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['user', 'logged'],
  components: {
    productsView: _Utilities_Products_ProductsView_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var route = (0,vue_router__WEBPACK_IMPORTED_MODULE_3__.useRoute)();
    // Extract the last word from route.name and lowercase it
    var routeName = route.name ? route.name.split(' ').pop().toLowerCase() : '';
    var apiEndpoint = "/api/getProducts/".concat(routeName);
    ; // Default endpoint

    // Conditionally set routeId based on route name
    var routeId = route.name === 'View Latest' ? 0 : route.params.id;
    var _useProductView = (0,_Composables_useProductView__WEBPACK_IMPORTED_MODULE_1__["default"])(apiEndpoint),
      isLoading = _useProductView.isLoading,
      info = _useProductView.info,
      products = _useProductView.products,
      gridClass = _useProductView.gridClass,
      btnClass = _useProductView.btnClass,
      showList = _useProductView.showList,
      showBtn = _useProductView.showBtn,
      fetchProducts = _useProductView.fetchProducts,
      updatedProducts = _useProductView.updatedProducts,
      reloadProducts = _useProductView.reloadProducts,
      getWindowWidth = _useProductView.getWindowWidth;

    // Fetch initial products
    fetchProducts(routeId);

    // Add event listener for window resize
    window.addEventListener('resize', function () {
      getWindowWidth();
    });

    // Modify products with updatedProducts
    var processedProducts = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return updatedProducts(products.value, props.user);
    });

    // Method to reload products and show a message
    var reloadWithMessage = function reloadWithMessage(message, body) {
      reloadProducts(message, routeId);
      flashShow(message, body);
    };

    // Define the flashShow method to emit a flash message
    var flashShow = function flashShow(message, body) {
      emit('flash', message, body);
    };
    return {
      isLoading: isLoading,
      info: info,
      products: processedProducts,
      // Use processedProducts in your template
      gridClass: gridClass,
      btnClass: btnClass,
      showList: showList,
      showBtn: showBtn,
      reloadWithMessage: reloadWithMessage
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=template&id=1647312a":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=template&id=1647312a ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 1,
  "class": "mx-auto bg-gray-50 dark:bg-gray-900 max-h-full mt-24 pt-2 w-[90%]"
};
var _hoisted_2 = {
  "class": "text-black uppercase text-4xl mt-4 mb-1 flex justify-between border-b border-gray-600 w-full"
};
var _hoisted_3 = {
  "class": "flex"
};
var _hoisted_4 = {
  "class": "text-black uppercase text-base mb-1 flex"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading_body = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading-body");
  var _component_list_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("list-icon");
  var _component_cards_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("cards-icon");
  var _component_no_products = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("no-products");
  var _component_productsView = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("productsView");
  var _component_footer_body = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("footer-body");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_ctx.isloading == true ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_loading_body, {
    key: 0
  })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.info) + ". ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_list_icon, {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.toggleBtn]),
    title: "Arrange Products in Lists",
    onClick: _ctx.orderList
  }, null, 8 /* PROPS */, ["class", "onClick"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !this.showList]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_cards_icon, {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.toggleBtn]),
    title: "Arrange Products in Cards",
    onClick: _ctx.orderCard
  }, null, 8 /* PROPS */, ["class", "onClick"]), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, this.showList]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_4, " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($setup.products.length).toLocaleString()) + " Products) ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" products grid/card view  "), !$setup.products ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_no_products, {
    key: 0,
    user: $props.user
  }, null, 8 /* PROPS */, ["user"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_productsView, {
    key: 1,
    products: $setup.products,
    "show-list": this.showList,
    "show-btn": this.showBtn,
    "grid-class": this.gridClass,
    logged: $props.logged,
    onFavorites: $setup.reloadWithMessage
  }, null, 8 /* PROPS */, ["products", "show-list", "show-btn", "grid-class", "logged", "onFavorites"]))]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" footer  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_footer_body), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" end footer  ")], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./resources/js/Composables/useProductView.js":
/*!****************************************************!*\
  !*** ./resources/js/Composables/useProductView.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useProductView)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// composables/useProductView.js


function useProductView(apiEndpoint) {
  var isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
  var info = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
  var products = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
  var gridClass = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
  var btnClass = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
  var showList = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
  var showBtn = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
  var windowWidth = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
  var getWindowWidth = function getWindowWidth() {
    windowWidth.value = document.documentElement.clientWidth;
    if (windowWidth.value < 767) {
      updateLayout('grid grid-cols-1 gap-1', 'top-48', true, orderList);
    } else if (windowWidth.value < 900) {
      updateLayout('grid grid-cols-2 gap-2', 'top-48', true, orderList);
    } else if (windowWidth.value < 1200) {
      updateLayout('grid grid-cols-3 gap-2', '', false, orderCard);
    } else {
      updateLayout('grid grid-cols-4 gap-2', '', false, orderCard);
    }
  };
  var updateLayout = function updateLayout(grid, btn, btnVisible, action) {
    gridClass.value = grid;
    btnClass.value = btn;
    showBtn.value = btnVisible;
    action();
  };
  var orderList = function orderList() {
    showList.value = true;
  };
  var orderCard = function orderCard() {
    showList.value = false;
  };
  var fetchProducts = function fetchProducts(routeId) {
    isLoading.value = true;
    axios__WEBPACK_IMPORTED_MODULE_1___default().get("".concat(apiEndpoint, "/").concat(routeId)).then(function (_ref) {
      var data = _ref.data;
      info.value = data[0];
      products.value = data[1];
      getWindowWidth();
      isLoading.value = false;
    });
  };

  // const reloadProducts = (routeId, flashMessage) => {
  //     axios.get(`${apiEndpoint}/${routeId}`).then(({ data }) => {
  //         info.value = data[0];
  //         products.value = data[1];
  //         getWindowWidth();
  //         isLoading.value = false;
  //     });
  // };

  // Add is_favorited to each product
  var updatedProducts = function updatedProducts(infos, user) {
    if (!user) {
      return infos; // If user is not available, return items without modification
    }

    return infos.map(function (product) {
      var isFavorited = Array.isArray(product.favorites) && product.favorites.some(function (favorite) {
        return String(favorite.user_id) === String(user.id);
      });
      return _objectSpread(_objectSpread({}, product), {}, {
        is_favorited: isFavorited
      });
    });
  };
  var reloadProducts = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(message, routeId) {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_1___default().get("".concat(apiEndpoint, "/").concat(routeId));
          case 3:
            response = _context.sent;
            data = response.data;
            info.value = data[0] || [];
            products.value = data[1] || [];
            _context.next = 12;
            break;
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.error('Error reloading products:', _context.t0);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 9]]);
    }));
    return function reloadProducts(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  return {
    isLoading: isLoading,
    info: info,
    products: products,
    gridClass: gridClass,
    btnClass: btnClass,
    showList: showList,
    showBtn: showBtn,
    getWindowWidth: getWindowWidth,
    fetchProducts: fetchProducts,
    reloadProducts: reloadProducts,
    orderList: orderList,
    orderCard: orderCard,
    updatedProducts: updatedProducts
  };
}

/***/ }),

/***/ "./resources/js/Components/CatergoryComponents/viewCatergory.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/Components/CatergoryComponents/viewCatergory.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _viewCatergory_vue_vue_type_template_id_1647312a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewCatergory.vue?vue&type=template&id=1647312a */ "./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=template&id=1647312a");
/* harmony import */ var _viewCatergory_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewCatergory.vue?vue&type=script&lang=js */ "./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=script&lang=js");
/* harmony import */ var C_Users_Kelvin_Waiyaki_Desktop_Work_Projects_Delight_Electronics_Info_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_Users_Kelvin_Waiyaki_Desktop_Work_Projects_Delight_Electronics_Info_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_viewCatergory_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_viewCatergory_vue_vue_type_template_id_1647312a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/CatergoryComponents/viewCatergory.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewCatergory_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewCatergory_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./viewCatergory.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=template&id=1647312a":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=template&id=1647312a ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewCatergory_vue_vue_type_template_id_1647312a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewCatergory_vue_vue_type_template_id_1647312a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./viewCatergory.vue?vue&type=template&id=1647312a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/CatergoryComponents/viewCatergory.vue?vue&type=template&id=1647312a");


/***/ })

}]);