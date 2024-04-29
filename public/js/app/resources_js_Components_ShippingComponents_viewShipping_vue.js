"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Components_ShippingComponents_viewShipping_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['products', 'index', 'shipping', 'admin'],
  data: function data() {
    return {
      // load 
      isloading: true,
      showInfo: false
    };
  },
  beforeMount: function beforeMount() {
    this.isloading = true;
  },
  methods: {
    loaded: function loaded() {
      this.isloading = false;
    },
    show: function show() {
      this.showInfo = !this.showInfo;
    },
    deliverOrder: function deliverOrder(shipping) {
      var _this = this;
      axios.get('/shipping/deliver/' + shipping.id).then(function (_ref) {
        var data = _ref.data;
        var message = "Order Successfully Delivered!";
        _this.$emit('flashreload', [message, 'bg-green-100']);
        _this.$emit('delivered');
      });
    },
    // get diff for humans time
    fromDate: function fromDate(date) {
      return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).fromNow();
    },
    // get formatted time
    formatDate: function formatDate(date) {
      return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format("ddd, Do MMM YYYY");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AlertComponents_flash_simple_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AlertComponents/flash-simple.vue */ "./resources/js/Components/AlertComponents/flash-simple.vue");
/* harmony import */ var _tables_allShippings_table_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tables/allShippings-table.vue */ "./resources/js/Components/ShippingComponents/tables/allShippings-table.vue");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// tables 

// import transitTable           from '../tables/transitShippings-table.vue';
// import deliveredTable         from '../tables/deliveredShippings-table.vue';


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: [],
  data: function data() {
    return {
      // load 
      isloading: false,
      // datasets 
      inStock: [],
      outOfStock: [],
      // page name 
      view_name: "",
      // tabs
      // classes
      activeTab: 'inline-block p-4 py-3 border-b-2 border-blue-700 uppercase text-blue-700',
      inactiveTab: 'inline-block p-4 py-3 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 uppercase',
      tabBody: 'bg-transparent dark:bg-transparent relative flex flex-col min-w-0 break-words w-full mb-4',
      sectionBody: 'bg-gray-100/50 dark:bg-gray-800 relative flex flex-col min-w-0 break-words w-full mb-2 bg-blueGray-200 border border-gray-900 rounded-md shadow hover:shadow-md p-2',
      sectionBodyTransit: 'bg-blue-400/10 dark:bg-blue-800 relative flex flex-col min-w-0 break-words w-full mb-2 border border-blue-900 rounded-md shadow hover:shadow-md p-2',
      sectionBodyDelivered: 'bg-green-400/10 dark:bg-green-800 relative flex flex-col min-w-0 break-words w-full mb-2 border border-green-900 rounded-md shadow hover:shadow-md p-2',
      sectionBodyToday: 'bg-rose-400/10 dark:bg-rose-800 relative flex flex-col min-w-0 break-words w-full mb-2 border border-rose-900 rounded-md shadow hover:shadow-md p-2',
      caretClass: 'bg-white border-2 border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring focus:ring-gray-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-8 w-8 rounded-full accordion-caret',
      caretClassTransit: 'bg-blue-400/10 border-2 border-blue-800 focus:outline-none hover:bg-blue-100 focus:ring focus:ring-blue-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-600 dark:focus:ring-blue-700 h-8 w-8 rounded-full accordion-caret',
      caretClassDelivered: 'bg-green-400/10 border-2 border-green-800 focus:outline-none hover:bg-green-100 focus:ring focus:ring-green-200 text-md dark:bg-green-800 text-gray-800 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-600 dark:focus:ring-green-700 h-8 w-8 rounded-full accordion-caret',
      caretClassToday: 'bg-rose-400/10 border-2 border-rose-800 focus:outline-none hover:bg-rose-100 focus:ring focus:ring-rose-200 text-md dark:bg-rose-800 text-gray-800 dark:text-white dark:border-rose-600 dark:hover:bg-rose-700 dark:hover:border-rose-600 dark:focus:ring-rose-700 h-8 w-8 rounded-full accordion-caret',
      btn1class: '',
      btn2class: '',
      btn3class: '',
      btn4class: '',
      // bodies 
      tab1body: true,
      tab2body: false,
      tab3body: false,
      tab4body: false,
      // bodies 
      tab1name: 'View all',
      tab2name: 'In Transit',
      tab3name: 'Delivered',
      tab4name: 'Today Deliveries',
      // auth datasets 
      user: {},
      logged: '',
      admin: '',
      // shipping datasets 
      allShippings: [],
      transit: [],
      delivered: [],
      today: []
    };
  },
  components: {
    flash: _AlertComponents_flash_simple_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    shippingsTable: _tables_allShippings_table_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  beforeMount: function beforeMount() {
    this.isloading = true;
    this.getUser();
    // this.tab1show();
  },

  methods: {
    loaded: function loaded() {
      this.view_name = this.$route.name;
      this.isloading = false;
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    },
    // get diff for humans time
    fromDate: function fromDate(date) {
      return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).fromNow();
    },
    // get formatted time
    formatDate: function formatDate(date) {
      return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).format("ddd, Do MMM YYYY");
    },
    getUser: function getUser() {
      var _this = this;
      axios.get('/getUser/').then(function (_ref) {
        var data = _ref.data;
        _this.user = data[0];
        _this.logged = data[1];
        _this.admin = data[2];
        // get shippings 
        if (_this.admin == '1') {
          _this.getShippingsAdmin();
          _this.tab1name = 'View all (admin)';
          _this.tab4show();
        } else {
          _this.getShippings(data[0]);
          _this.tab1show();
        }
      });
    },
    getShippingsAdmin: function getShippingsAdmin() {
      var _this2 = this;
      this.isLoading = true;
      axios.get('/api/getShippings').then(function (_ref2) {
        var data = _ref2.data;
        _this2.allShippings = data[0];
        _this2.transit = data[1];
        _this2.delivered = data[2];
        _this2.today = data[3];
        _this2.loaded();
      });
    },
    getShippings: function getShippings(user) {
      var _this3 = this;
      this.isLoading = true;
      axios.get('/api/getShippings/' + user.id).then(function (_ref3) {
        var data = _ref3.data;
        _this3.allShippings = data[0];
        _this3.transit = data[1];
        _this3.delivered = data[2];
        _this3.loaded();
      });
    },
    // show tabs 
    tab1show: function tab1show() {
      this.tab1body = true;
      this.tab2body = false;
      this.tab3body = false;
      this.tab4body = false;
      this.btn1class = this.activeTab;
      this.btn2class = this.inactiveTab;
      this.btn3class = this.inactiveTab;
      this.btn4class = this.inactiveTab;
      this.sectionBody = this.sectionBody;
      this.caretClass = this.caretClass;
    },
    tab2show: function tab2show() {
      this.tab1body = false;
      this.tab2body = true;
      this.tab3body = false;
      this.tab4body = false;
      this.btn1class = this.inactiveTab;
      this.btn2class = this.activeTab;
      this.btn3class = this.inactiveTab;
      this.btn4class = this.inactiveTab;
      this.sectionBody = this.sectionBodyTransit;
      this.caretClass = this.caretClassTransit;
    },
    tab3show: function tab3show() {
      this.tab1body = false;
      this.tab2body = false;
      this.tab3body = true;
      this.tab4body = false;
      this.btn1class = this.inactiveTab;
      this.btn2class = this.inactiveTab;
      this.btn3class = this.activeTab;
      this.btn2class = this.inactiveTab;
      this.sectionBody = this.sectionBodyDelivered;
      this.caretClass = this.caretClassDelivered;
    },
    tab4show: function tab4show() {
      this.tab1body = false;
      this.tab2body = false;
      this.tab3body = false;
      this.tab4body = true;
      this.btn1class = this.inactiveTab;
      this.btn2class = this.inactiveTab;
      this.btn3class = this.inactiveTab;
      this.btn4class = this.activeTab;
      this.sectionBody = this.sectionBodyToday;
      this.caretClass = this.caretClassToday;
    },
    // show accordions 
    showAllInfo: function showAllInfo(index) {
      this.$refs.allShippingRef[index].show();
    },
    showTransitInfo: function showTransitInfo(index) {
      this.$refs.allTransitRef[index].show();
    },
    showDeliveredInfo: function showDeliveredInfo(index) {
      this.$refs.allDeliveredRef[index].show();
    },
    showTodayInfo: function showTodayInfo(index) {
      this.$refs.allTodayRef[index].show();
    },
    flashReload: function flashReload(_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        message = _ref5[0],
        body = _ref5[1];
      this.$refs.childComponentRef.flash([message, body]);
      // get shippings 
      if (this.admin == '1') {
        this.getShippingsAdmin();
      } else {
        this.getShippings(this.user);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tabs_shippingTabs_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs/shippingTabs.vue */ "./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: [],
  data: function data() {
    return {
      // auth datasets 
      user: {},
      logged: '',
      admin: '',
      // shipping datasets 
      allShippings: [],
      shippings: [],
      delivered: []
    };
  },
  components: {
    shippingTabs: _tabs_shippingTabs_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  beforeMount: function beforeMount() {},
  // created() {
  //     this.getUser();
  //     this.getShippings();
  // },

  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=template&id=9debf122":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=template&id=9debf122 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = ["id", "aria-labelledby"];
var _hoisted_2 = {
  "class": "w-full flex-col"
};
var _hoisted_3 = {
  key: 0,
  "class": "inline-flex justify-end w-full",
  role: "group"
};
var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-check mx-2"
}, null, -1 /* HOISTED */);
var _hoisted_5 = {
  key: 1,
  type: "button",
  "class": "inline-flex items-center px-4 py-2 text-lg uppercase font-medium text-black bg-white hover:bg-black border border-black hover:text-white hover:shadow focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 cursor-not-allowed rounded-md mx-2"
};
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-check mx-2"
}, null, -1 /* HOISTED */);
var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
  type: "button",
  "class": "inline-flex items-center px-4 py-2 text-lg uppercase font-medium text-black bg-white hover:bg-black hover:text-white border border-t border-b border-black focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white hover:shadow dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 rounded-md mx-2"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-save mx-2"
}), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save As PDF ")], -1 /* HOISTED */);
var _hoisted_8 = {
  "class": "text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col"
};
var _hoisted_9 = {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
};
var _hoisted_10 = {
  key: 0,
  "class": "text-warning uppercase underline"
};
var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-truck px-2"
}, null, -1 /* HOISTED */);
var _hoisted_12 = {
  key: 1,
  "class": "text-success uppercase underline"
};
var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-thumbs-up px-2"
}, null, -1 /* HOISTED */);
var _hoisted_14 = {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
};
var _hoisted_15 = {
  "class": "text-primary uppercase underline"
};
var _hoisted_16 = {
  key: 0,
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
};
var _hoisted_17 = {
  "class": "text-danger uppercase underline"
};
var _hoisted_18 = {
  key: 1,
  "class": "text-black uppercase text-xl"
};
var _hoisted_19 = {
  "class": "text-success uppercase underline"
};
var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
  "class": "border-b-2 border-gray-700 rounded-md my-2 w-4/5 mx-auto"
}, null, -1 /* HOISTED */);
var _hoisted_21 = {
  "class": "w-full text-base text-left text-gray-500 dark:text-gray-400 nav-xs-hidden"
};
var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", {
  "class": "text-xl text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  scope: "col",
  "class": "px-6 py-3 font-medium underline text-start"
}, " Product. "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  scope: "col",
  "class": "px-6 py-3 font-medium underline text-start xs-hidden"
}, " Price. "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  scope: "col",
  "class": "px-6 py-3 font-medium underline text-start xs-hidden"
}, " Quantity. "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  scope: "col",
  "class": "px-6 py-3 font-medium underline text-start"
}, " Total. "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  scope: "col",
  "class": "px-6 py-3 font-medium underline text-start"
}, " Delivered. ")])], -1 /* HOISTED */);
var _hoisted_23 = {
  "class": "bg-transparent border-b dark:bg-transparent dark:border-gray-700"
};
var _hoisted_24 = {
  scope: "row",
  "class": "row px-4 py-3 font-normal text-xl text-gray-900 whitespace-nowrap dark:text-white"
};
var _hoisted_25 = {
  "class": ""
};
var _hoisted_26 = ["src", "alt"];
var _hoisted_27 = {
  "class": "uppercase underline text-xl"
};
var _hoisted_28 = {
  "class": "p-1 uppercase font-normal text-lg text-gray-900 xs-hidden"
};
var _hoisted_29 = {
  scope: "row",
  "class": "px-4 py-3 font-normal text-lg text-gray-900 whitespace-nowrap dark:text-white xs-hidden"
};
var _hoisted_30 = {
  "class": "p-1 uppercase font-normal text-lg text-gray-900 xs-hidden"
};
var _hoisted_31 = {
  "class": "p-1 uppercase font-normal text-lg text-gray-900 nav-xs-show"
};
var _hoisted_32 = {
  "class": "p-1 uppercase font-normal text-xl text-gray-900 xs-hidden"
};
var _hoisted_33 = {
  key: 0,
  "class": "text-success uppercase underline mx-4"
};
var _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-check"
}, null, -1 /* HOISTED */);
var _hoisted_35 = [_hoisted_34];
var _hoisted_36 = {
  key: 1,
  "class": "text-danger uppercase underline mx-4"
};
var _hoisted_37 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-times"
}, null, -1 /* HOISTED */);
var _hoisted_38 = [_hoisted_37];
var _hoisted_39 = {
  "class": "w-full text-base text-left text-gray-500 dark:text-gray-400 nav-xs-show"
};
var _hoisted_40 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", {
  "class": "text-lg text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400",
  style: {
    "width": "100% !important",
    "display": "inline-table"
  }
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  scope: "col",
  "class": "px-6 py-3 underline text-center font-medium"
}, " Product. "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  scope: "col",
  "class": "px-6 py-3 underline text-center font-medium"
}, " Total. "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  scope: "col",
  "class": "px-6 py-3 underline text-center font-medium"
}, " Delivered. ")])], -1 /* HOISTED */);
var _hoisted_41 = {
  style: {
    "width": "100% !important",
    "display": "inline-table"
  }
};
var _hoisted_42 = {
  "class": "bg-transparent border-b dark:bg-transparent dark:border-gray-700"
};
var _hoisted_43 = {
  scope: "row",
  "class": "row px-4 py-3 font-normal text-xl text-gray-900 whitespace-nowrap dark:text-white"
};
var _hoisted_44 = {
  "class": ""
};
var _hoisted_45 = ["src", "alt"];
var _hoisted_46 = {
  "class": "uppercase underline text-xl xs:text-base"
};
var _hoisted_47 = {
  "class": "p-1 uppercase font-normal text-lg text-gray-900"
};
var _hoisted_48 = {
  "class": "flex-col"
};
var _hoisted_49 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */);
var _hoisted_50 = {
  scope: "row",
  "class": "row px-4 py-3 font-normal text-xl text-gray-900 whitespace-nowrap dark:text-white"
};
var _hoisted_51 = {
  "class": "uppercase underline text-xl xs:text-base"
};
var _hoisted_52 = {
  key: 0,
  "class": "text-success text-xl uppercase underline mx-1",
  title: "Item Delivered"
};
var _hoisted_53 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-check"
}, null, -1 /* HOISTED */);
var _hoisted_54 = [_hoisted_53];
var _hoisted_55 = {
  key: 1,
  "class": "text-danger text-xl uppercase underline mx-1",
  title: "Item Not Yet Delivered"
};
var _hoisted_56 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
  "class": "fas fa-times"
}, null, -1 /* HOISTED */);
var _hoisted_57 = [_hoisted_56];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" body  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "relative overflow-x-auto m-1 bg-gray-50 border border-gray-100 rounded p-1",
    id: $props.index,
    "aria-labelledby": $props.index
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" info  "), this.admin == '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [$props.shipping.shipping_delivered == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    "class": "inline-flex items-center px-4 py-2 text-lg uppercase font-medium text-black bg-white hover:bg-black border border-black hover:text-white hover:shadow focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 rounded-md mx-2",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.deliverOrder($props.shipping);
    })
  }, [_hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Mark as Delivered ")])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", _hoisted_5, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivered ")])), _hoisted_7])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" shipping status  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Shipping Status: "), $props.shipping.shipping_delivered == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In Transit "), _hoisted_11])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivered "), _hoisted_13]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Shipping Delivery: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.shipping.shipping_location) + ".", 1 /* TEXT */)]), $props.shipping.shipping_delivered == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Deliver by: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate($props.shipping.delivery_date)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate($props.shipping.delivery_date)) + ".", 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Delivered On: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate($props.shipping.delivered_on)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate($props.shipping.delivered_on)) + ".", 1 /* TEXT */)]))])]), _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_21, [_hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.products, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
      to: '/product_show/' + item.product_id
    }, {
      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
          "class": "max-w-full h-16 w-16 mx-2 rounded-md hover:shadow-md",
          src: item.thumbnail_path,
          alt: item.name
        }, null, 8 /* PROPS */, _hoisted_26)];
      }),
      _: 2 /* DYNAMIC */
    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["to"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
      to: '/product_show/' + item.product_id
    }, {
      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1 /* TEXT */)];
      }),

      _: 2 /* DYNAMIC */
    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["to"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_28, " ksh " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(item.price).toLocaleString()), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.quantity) + " Items ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_30, " ksh " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(item.total_price).toLocaleString()), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.quantity) + " @ ksh " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(item.price).toLocaleString()) + " = ksh " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(item.total_price).toLocaleString()), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_32, [item.delivered == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_33, _hoisted_35)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_36, _hoisted_38))])]);
  }), 256 /* UNKEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_39, [_hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", _hoisted_41, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.products, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
      to: '/product_show/' + item.product_id
    }, {
      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
          "class": "max-w-full h-8 w-8 rounded-md m-2",
          src: item.thumbnail_path,
          alt: item.name
        }, null, 8 /* PROPS */, _hoisted_45)];
      }),
      _: 2 /* DYNAMIC */
    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["to"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
      to: '/product_show/' + item.product_id
    }, {
      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1 /* TEXT */)];
      }),

      _: 2 /* DYNAMIC */
    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["to"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.quantity) + " @ ksh " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(item.price).toLocaleString()) + " ", 1 /* TEXT */), _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "= ksh " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(item.total_price).toLocaleString()), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [item.delivered == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_52, _hoisted_54)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_55, _hoisted_57))])])]);
  }), 256 /* UNKEYED_FRAGMENT */))])])], 8 /* PROPS */, _hoisted_1), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.showInfo]])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=template&id=ee6b7dc6":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=template&id=ee6b7dc6 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "col-md-12"
};
var _hoisted_2 = {
  "class": "mx-auto bg-blueGray-50 dark:bg-gray-900 max-h-full"
};
var _hoisted_3 = {
  "class": "col-md-12 text-black underline uppercase text-5xl my-4"
};
var _hoisted_4 = {
  key: 0,
  "class": "text-muted mx-2 text-2xl"
};
var _hoisted_5 = {
  "class": "mb-2 border-b border-gray-200 dark:border-gray-700"
};
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
  "class": "col-md-12 text-muted underline text-base my-2"
}, " Select Shipping Catergories. ", -1 /* HOISTED */);
var _hoisted_7 = {
  "class": "sm:hidden"
};
var _hoisted_8 = {
  id: "tabs",
  "class": "bg-white border-0 border-b border-gray-400 text-black text-xl uppercase underline block w-full p-2.5 cursor-pointer"
};
var _hoisted_9 = ["data-tabs-toggle"];
var _hoisted_10 = {
  "class": "mr-2"
};
var _hoisted_11 = ["id"];
var _hoisted_12 = {
  "class": "mr-2"
};
var _hoisted_13 = ["id"];
var _hoisted_14 = {
  "class": "mr-2"
};
var _hoisted_15 = ["id"];
var _hoisted_16 = {
  "class": "mr-2"
};
var _hoisted_17 = ["id"];
var _hoisted_18 = ["id"];
var _hoisted_19 = {
  "class": "text-black underline uppercase text-3xl my-4"
};
var _hoisted_20 = {
  key: 1
};
var _hoisted_21 = {
  key: 0,
  "class": "my-1 py-1 text-4xl text-center font-semibold underline uppercase title"
};
var _hoisted_22 = {
  id: "accordion-flush",
  "data-accordion": "collapse",
  "data-active-classes": "dark:bg-gray-900 text-gray-900 dark:text-white bg-blueGray-200",
  "data-inactive-classes": "text-gray-500 dark:text-gray-400"
};
var _hoisted_23 = ["id"];
var _hoisted_24 = ["data-accordion-target", "aria-controls", "onClick"];
var _hoisted_25 = {
  "class": "w-[90%]"
};
var _hoisted_26 = {
  "class": "inline-flex justify-start text-black uppercase text-xl mx-2 mt-2 mb-1 w-full"
};
var _hoisted_27 = {
  "class": "text-black underline uppercase text-3xl w-full text-left inline-flex justify-start ml-2"
};
var _hoisted_28 = {
  "class": "px-2"
};
var _hoisted_29 = {
  "class": "m-2"
};
var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1 /* HOISTED */);
var _hoisted_31 = [_hoisted_30];
var _hoisted_32 = ["id"];
var _hoisted_33 = {
  "class": "text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col"
};
var _hoisted_34 = {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
};
var _hoisted_35 = {
  key: 0,
  "class": "text-rose-500 uppercase underline"
};
var _hoisted_36 = {
  key: 1,
  "class": "text-emerald-600 uppercase underline"
};
var _hoisted_37 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Delivery Cost: "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-teal-600 uppercase underline"
}, " KSH 150 ")], -1 /* HOISTED */);
var _hoisted_38 = {
  "class": "text-black uppercase text-3xl inline-flex justify-between w-full"
};
var _hoisted_39 = {
  "class": "text-blue-600 uppercase underline"
};
var _hoisted_40 = {
  "class": "text-green-600 uppercase underline"
};
var _hoisted_41 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
  "class": "border-b border-gray-500 rounded-md my-2 w-[90%] mx-auto"
}, null, -1 /* HOISTED */);
var _hoisted_42 = {
  "class": "text-black underline uppercase text-3xl my-4"
};
var _hoisted_43 = {
  key: 1
};
var _hoisted_44 = {
  key: 0,
  "class": "my-1 py-1 text-4xl text-center font-semibold underline uppercase title"
};
var _hoisted_45 = {
  id: "accordion-flush",
  "data-accordion": "collapse",
  "data-active-classes": "dark:bg-gray-900 text-gray-900 dark:text-white bg-blueGray-200",
  "data-inactive-classes": "text-gray-500 dark:text-gray-400"
};
var _hoisted_46 = ["id"];
var _hoisted_47 = ["data-accordion-target", "aria-controls", "onClick"];
var _hoisted_48 = {
  "class": "w-[90%]"
};
var _hoisted_49 = {
  "class": "inline-flex justify-start text-black uppercase text-xl mx-2 mt-2 mb-1 w-full"
};
var _hoisted_50 = {
  "class": "text-black underline uppercase text-3xl w-full text-left inline-flex justify-start ml-2"
};
var _hoisted_51 = {
  "class": "px-2"
};
var _hoisted_52 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "m-2"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  "data-accordion-icon": "",
  "class": "bg-white border-2 border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring focus:ring-gray-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-8 w-8 rounded-full accordion-caret",
  viewBox: "0 0 20 20"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
})])], -1 /* HOISTED */);
var _hoisted_53 = ["id"];
var _hoisted_54 = {
  "class": "text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col"
};
var _hoisted_55 = {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
};
var _hoisted_56 = {
  key: 0,
  "class": "text-rose-500 uppercase underline"
};
var _hoisted_57 = {
  key: 1,
  "class": "text-emerald-600 uppercase underline"
};
var _hoisted_58 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Delivery Cost: "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-teal-600 uppercase underline"
}, " KSH 150 ")], -1 /* HOISTED */);
var _hoisted_59 = {
  "class": "text-black uppercase text-3xl inline-flex justify-between w-full"
};
var _hoisted_60 = {
  "class": "text-blue-600 uppercase underline"
};
var _hoisted_61 = {
  "class": "text-green-600 uppercase underline"
};
var _hoisted_62 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
  "class": "border-b border-gray-500 rounded-md my-2 w-[90%] mx-auto"
}, null, -1 /* HOISTED */);
var _hoisted_63 = {
  "class": "text-black underline uppercase text-3xl my-4"
};
var _hoisted_64 = {
  key: 1
};
var _hoisted_65 = {
  key: 0,
  "class": "my-1 py-1 text-4xl text-center font-semibold underline uppercase title"
};
var _hoisted_66 = {
  id: "accordion-flush",
  "data-accordion": "collapse",
  "data-active-classes": "dark:bg-gray-900 text-gray-900 dark:text-white bg-blueGray-200",
  "data-inactive-classes": "text-gray-500 dark:text-gray-400"
};
var _hoisted_67 = ["id"];
var _hoisted_68 = ["data-accordion-target", "aria-controls", "onClick"];
var _hoisted_69 = {
  "class": "w-[90%]"
};
var _hoisted_70 = {
  "class": "inline-flex justify-start text-black uppercase text-xl mx-2 mt-2 mb-1 w-full"
};
var _hoisted_71 = {
  "class": "text-black underline uppercase text-3xl w-full text-left inline-flex justify-start ml-2"
};
var _hoisted_72 = {
  "class": "px-2"
};
var _hoisted_73 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "m-2"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  "data-accordion-icon": "",
  "class": "bg-white border-2 border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring focus:ring-gray-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-8 w-8 rounded-full accordion-caret",
  viewBox: "0 0 20 20"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
})])], -1 /* HOISTED */);
var _hoisted_74 = ["id"];
var _hoisted_75 = {
  "class": "text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col"
};
var _hoisted_76 = {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
};
var _hoisted_77 = {
  key: 0,
  "class": "text-rose-500 uppercase underline"
};
var _hoisted_78 = {
  key: 1,
  "class": "text-emerald-600 uppercase underline"
};
var _hoisted_79 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Delivery Cost: "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-teal-600 uppercase underline"
}, " KSH 150 ")], -1 /* HOISTED */);
var _hoisted_80 = {
  "class": "text-black uppercase text-3xl inline-flex justify-between w-full"
};
var _hoisted_81 = {
  "class": "text-blue-600 uppercase underline"
};
var _hoisted_82 = {
  "class": "text-green-600 uppercase underline"
};
var _hoisted_83 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
  "class": "border-b border-gray-500 rounded-md my-2 w-[90%] mx-auto"
}, null, -1 /* HOISTED */);
var _hoisted_84 = {
  "class": "text-black underline uppercase text-3xl my-4"
};
var _hoisted_85 = {
  key: 1
};
var _hoisted_86 = {
  key: 0,
  "class": "my-1 py-1 text-4xl text-center font-semibold underline uppercase title"
};
var _hoisted_87 = {
  id: "accordion-flush",
  "data-accordion": "collapse",
  "data-active-classes": "dark:bg-gray-900 text-gray-900 dark:text-white bg-blueGray-200",
  "data-inactive-classes": "text-gray-500 dark:text-gray-400"
};
var _hoisted_88 = ["id"];
var _hoisted_89 = ["data-accordion-target", "aria-controls", "onClick"];
var _hoisted_90 = {
  "class": "w-[90%]"
};
var _hoisted_91 = {
  "class": "inline-flex justify-start text-black uppercase text-xl mx-2 mt-2 mb-1 w-full"
};
var _hoisted_92 = {
  "class": "text-black underline uppercase text-3xl w-full text-left inline-flex justify-start ml-2"
};
var _hoisted_93 = {
  "class": "px-2"
};
var _hoisted_94 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
  "class": "m-2"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  "data-accordion-icon": "",
  "class": "bg-white border-2 border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring focus:ring-gray-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-8 w-8 rounded-full accordion-caret",
  viewBox: "0 0 20 20"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
})])], -1 /* HOISTED */);
var _hoisted_95 = ["id"];
var _hoisted_96 = {
  "class": "text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col"
};
var _hoisted_97 = {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
};
var _hoisted_98 = {
  key: 0,
  "class": "text-rose-500 uppercase underline"
};
var _hoisted_99 = {
  key: 1,
  "class": "text-emerald-600 uppercase underline"
};
var _hoisted_100 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
  "class": "text-black uppercase text-xl inline-flex justify-between w-full"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Delivery Cost: "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-teal-600 uppercase underline"
}, " KSH 150 ")], -1 /* HOISTED */);
var _hoisted_101 = {
  "class": "text-black uppercase text-3xl inline-flex justify-between w-full"
};
var _hoisted_102 = {
  "class": "text-blue-600 uppercase underline"
};
var _hoisted_103 = {
  "class": "text-green-600 uppercase underline"
};
var _hoisted_104 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
  "class": "border-b border-gray-500 rounded-md my-2 w-[90%] mx-auto"
}, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;
  var _component_flash = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("flash");
  var _component_loading_body = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading-body");
  var _component_shippingsTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("shippingsTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" flash  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_flash, {
    ref: "childComponentRef"
  }, null, 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Orders Shipping. "), this.admin == '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_4, " ( Admin ) ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" tab links  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", _hoisted_8, [this.admin == '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
    key: 0,
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.tab4show();
    }),
    "class": "uppercase px-2 cursor-pointer"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab4name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.today.length).toLocaleString()) + " ) ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.tab1show();
    }),
    "class": "uppercase px-2 cursor-pointer"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab1name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.allShippings.length).toLocaleString()) + " ) ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.tab2show();
    }),
    "class": "uppercase px-2 cursor-pointer"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab2name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.transit.length).toLocaleString()) + " ) ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.tab3show();
    }),
    "class": "uppercase px-2 cursor-pointer"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab3name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.delivered.length).toLocaleString()) + " ) ", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    "class": "hidden sm:flex flex-wrap mb-2 text-lg font-medium text-center",
    "data-tabs-toggle": ['#' + this.view_name]
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_10, [this.admin == '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.btn4class]),
    id: [$data.tab4name],
    type: "button",
    role: "tab",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.tab4show();
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab4name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.today.length).toLocaleString()) + " )", 11 /* TEXT, CLASS, PROPS */, _hoisted_11)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.btn1class]),
    id: [$data.tab1name],
    type: "button",
    role: "tab",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return $options.tab1show();
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab1name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.allShippings.length).toLocaleString()) + " )", 11 /* TEXT, CLASS, PROPS */, _hoisted_13)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.btn2class]),
    id: [$data.tab2name],
    type: "button",
    role: "tab",
    onClick: _cache[6] || (_cache[6] = function ($event) {
      return $options.tab2show();
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab2name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.transit.length).toLocaleString()) + " )", 11 /* TEXT, CLASS, PROPS */, _hoisted_15)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.btn3class]),
    id: [$data.tab3name],
    type: "button",
    role: "tab",
    onClick: _cache[7] || (_cache[7] = function ($event) {
      return $options.tab3show();
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab3name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.delivered.length).toLocaleString()) + " )", 11 /* TEXT, CLASS, PROPS */, _hoisted_17)])], 8 /* PROPS */, _hoisted_9)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: [this.view_name]
  }, [$data.tab1body ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.tabBody])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab1name) + ".", 1 /* TEXT */), $data.isloading == true ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_loading_body, {
    key: 0
  })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_20, [$data.allShippings.length == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_21, " (0) Shipments. No Order shipments! ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.allShippings, function (shipping, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h2", {
      id: index,
      key: index,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_this.sectionBody)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      "class": "inline-flex space-x-2 items-start justify-between w-full py-2 font-medium text-gray-500 hover:text-blue-800 border-b-2 border-gray-700 hover:border-cyan-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-800",
      "data-accordion-target": '#body-' + index,
      "aria-expanded": "true",
      "aria-controls": index,
      onClick: function onClick($event) {
        return $options.showAllInfo(index);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shipping.id) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shipping.buyer_name) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, " KSH " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_total).toLocaleString()), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", {
      "data-accordion-icon": "",
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_this.caretClass),
      viewBox: "0 0 20 20"
    }, _hoisted_31, 2 /* CLASS */))])], 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: 'body-' + index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_shippingsTable, {
      admin: $data.admin,
      index: index,
      products: shipping.shippedproducts,
      shipping: shipping,
      onFlashreload: $options.flashReload,
      onDelivered: $options.tab3show,
      ref_for: true,
      ref: "allShippingRef"
    }, null, 8 /* PROPS */, ["admin", "index", "products", "shipping", "onFlashreload", "onDelivered"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" footer  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivery Status: "), shipping.shipping_delivered == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In Transit: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(shipping.delivery_date)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate(shipping.delivery_date)) + ".", 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivered: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(shipping.delivered_on)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate(shipping.delivered_on)) + ".", 1 /* TEXT */)]))]), _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Total Costs: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_items).toLocaleString()) + " Items ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_40, " KSH " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_total).toLocaleString()), 1 /* TEXT */)])])], 8 /* PROPS */, _hoisted_32)], 10 /* CLASS, PROPS */, _hoisted_23)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" space  "), _hoisted_41]);
  }), 256 /* UNKEYED_FRAGMENT */))]))], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.tab2body ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.tabBody])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab2name) + ".", 1 /* TEXT */), $data.isloading == true ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_loading_body, {
    key: 0
  })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_43, [$data.transit.length == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_44, " (0) Successful Shipments. No Completed shipments! ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.transit, function (shipping, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h2", {
      id: index,
      key: index,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_this.sectionBody)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      "class": "inline-flex space-x-2 items-start justify-between w-full py-2 font-medium text-gray-500 hover:text-blue-800 border-b-2 border-gray-700 hover:border-cyan-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-800",
      "data-accordion-target": '#body-' + index,
      "aria-expanded": "true",
      "aria-controls": index,
      onClick: function onClick($event) {
        return $options.showTransitInfo(index);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shipping.id) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shipping.buyer_name) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_51, " KSH " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_total).toLocaleString()), 1 /* TEXT */)])])]), _hoisted_52], 8 /* PROPS */, _hoisted_47), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: 'body-' + index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_shippingsTable, {
      admin: $data.admin,
      index: index,
      products: shipping.shippedproducts,
      shipping: shipping,
      onFlashreload: $options.flashReload,
      onDelivered: $options.tab3show,
      ref_for: true,
      ref: "allTransitRef"
    }, null, 8 /* PROPS */, ["admin", "index", "products", "shipping", "onFlashreload", "onDelivered"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" footer  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivery Status: "), shipping.shipping_delivered == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In Transit: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(shipping.delivery_date)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate(shipping.delivery_date)) + ".", 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivered: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(shipping.delivered_on)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate(shipping.delivered_on)) + ".", 1 /* TEXT */)]))]), _hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Total Costs: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_items).toLocaleString()) + " Items ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_61, " KSH " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_total).toLocaleString()), 1 /* TEXT */)])])], 8 /* PROPS */, _hoisted_53)], 10 /* CLASS, PROPS */, _hoisted_46)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" space  "), _hoisted_62]);
  }), 256 /* UNKEYED_FRAGMENT */))]))], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.tab3body ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 2,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.tabBody])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab3name) + ".", 1 /* TEXT */), $data.isloading == true ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_loading_body, {
    key: 0
  })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_64, [$data.delivered.length == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_65, " (0) Delivered Shipments. No Delivered shipments! ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.delivered, function (shipping, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_66, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h2", {
      id: index,
      key: index,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_this.sectionBody)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      "class": "inline-flex space-x-2 items-start justify-between w-full py-2 font-medium text-gray-500 hover:text-blue-800 border-b-2 border-gray-700 hover:border-cyan-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-800",
      "data-accordion-target": '#body-' + index,
      "aria-expanded": "true",
      "aria-controls": index,
      onClick: function onClick($event) {
        return $options.showDeliveredInfo(index);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shipping.id) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shipping.buyer_name) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_72, " KSH " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_total).toLocaleString()), 1 /* TEXT */)])])]), _hoisted_73], 8 /* PROPS */, _hoisted_68), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: 'body-' + index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_shippingsTable, {
      admin: $data.admin,
      index: index,
      products: shipping.shippedproducts,
      shipping: shipping,
      onFlashreload: $options.flashReload,
      onDelivered: $options.tab3show,
      ref_for: true,
      ref: "allDeliveredRef"
    }, null, 8 /* PROPS */, ["admin", "index", "products", "shipping", "onFlashreload", "onDelivered"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" footer  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivery Status: "), shipping.shipping_delivered == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_77, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In Transit: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(shipping.delivery_date)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate(shipping.delivery_date)) + ".", 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivered: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(shipping.delivered_on)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate(shipping.delivered_on)) + ".", 1 /* TEXT */)]))]), _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Total Costs: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_81, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_items).toLocaleString()) + " Items ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_82, " KSH " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_total).toLocaleString()), 1 /* TEXT */)])])], 8 /* PROPS */, _hoisted_74)], 10 /* CLASS, PROPS */, _hoisted_67)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" space  "), _hoisted_83]);
  }), 256 /* UNKEYED_FRAGMENT */))]))], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.tab4body && this.admin == '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 3,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([this.tabBody])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_84, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tab4name) + " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.today.length).toLocaleString()) + " Deliveries). ", 1 /* TEXT */), $data.isloading == true ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_loading_body, {
    key: 0
  })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_85, [$data.today.length == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_86, " (0) Delivery Shipments for Today! ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.today, function (shipping, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_87, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h2", {
      id: index,
      key: index,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_this.sectionBody)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      "class": "inline-flex space-x-2 items-start justify-between w-full py-2 font-medium text-gray-500 hover:text-blue-800 border-b-2 border-gray-700 hover:border-cyan-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-800",
      "data-accordion-target": '#body-' + index,
      "aria-expanded": "true",
      "aria-controls": index,
      onClick: function onClick($event) {
        return $options.showTodayInfo(index);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_91, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shipping.id) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_92, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(shipping.buyer_name) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_93, " KSH " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_total).toLocaleString()), 1 /* TEXT */)])])]), _hoisted_94], 8 /* PROPS */, _hoisted_89), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: 'body-' + index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_shippingsTable, {
      admin: $data.admin,
      index: index,
      products: shipping.shippedproducts,
      shipping: shipping,
      onFlashreload: $options.flashReload,
      onDelivered: $options.tab3show,
      ref_for: true,
      ref: "allTodayRef"
    }, null, 8 /* PROPS */, ["admin", "index", "products", "shipping", "onFlashreload", "onDelivered"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" footer  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_96, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivery Status: "), shipping.shipping_delivered == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In Transit: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(shipping.delivery_date)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate(shipping.delivery_date)) + ".", 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_99, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delivered: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(shipping.delivered_on)) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.fromDate(shipping.delivered_on)) + ".", 1 /* TEXT */)]))]), _hoisted_100, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Total Costs: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_102, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_items).toLocaleString()) + " Items ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_103, " KSH " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(shipping.shipping_total).toLocaleString()), 1 /* TEXT */)])])], 8 /* PROPS */, _hoisted_95)], 10 /* CLASS, PROPS */, _hoisted_88)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" space  "), _hoisted_104]);
  }), 256 /* UNKEYED_FRAGMENT */))]))], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_18)])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=template&id=b055a07a":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=template&id=b055a07a ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "row mx-2 bg-blueGray-50 dark:bg-gray-900 max-h-full"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_shippingTabs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("shippingTabs");
  var _component_footer_body = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("footer-body");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_shippingTabs)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" footer  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_footer_body), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" end footer  ")], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./resources/js/Components/ShippingComponents/tables/allShippings-table.vue":
/*!**********************************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/tables/allShippings-table.vue ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _allShippings_table_vue_vue_type_template_id_9debf122__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./allShippings-table.vue?vue&type=template&id=9debf122 */ "./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=template&id=9debf122");
/* harmony import */ var _allShippings_table_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./allShippings-table.vue?vue&type=script&lang=js */ "./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=script&lang=js");
/* harmony import */ var C_Users_kelvi_Desktop_Work_Projects_DELIGHT_ELECTRONICS_OG_APP_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_Users_kelvi_Desktop_Work_Projects_DELIGHT_ELECTRONICS_OG_APP_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_allShippings_table_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_allShippings_table_vue_vue_type_template_id_9debf122__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/ShippingComponents/tables/allShippings-table.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shippingTabs_vue_vue_type_template_id_ee6b7dc6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shippingTabs.vue?vue&type=template&id=ee6b7dc6 */ "./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=template&id=ee6b7dc6");
/* harmony import */ var _shippingTabs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shippingTabs.vue?vue&type=script&lang=js */ "./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=script&lang=js");
/* harmony import */ var C_Users_kelvi_Desktop_Work_Projects_DELIGHT_ELECTRONICS_OG_APP_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_Users_kelvi_Desktop_Work_Projects_DELIGHT_ELECTRONICS_OG_APP_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_shippingTabs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_shippingTabs_vue_vue_type_template_id_ee6b7dc6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/ShippingComponents/tabs/shippingTabs.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/ShippingComponents/viewShipping.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/viewShipping.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _viewShipping_vue_vue_type_template_id_b055a07a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewShipping.vue?vue&type=template&id=b055a07a */ "./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=template&id=b055a07a");
/* harmony import */ var _viewShipping_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewShipping.vue?vue&type=script&lang=js */ "./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=script&lang=js");
/* harmony import */ var C_Users_kelvi_Desktop_Work_Projects_DELIGHT_ELECTRONICS_OG_APP_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_Users_kelvi_Desktop_Work_Projects_DELIGHT_ELECTRONICS_OG_APP_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_viewShipping_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_viewShipping_vue_vue_type_template_id_b055a07a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/ShippingComponents/viewShipping.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_allShippings_table_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_allShippings_table_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./allShippings-table.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=script&lang=js":
/*!**************************************************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_shippingTabs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_shippingTabs_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./shippingTabs.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewShipping_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewShipping_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./viewShipping.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=template&id=9debf122":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=template&id=9debf122 ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_allShippings_table_vue_vue_type_template_id_9debf122__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_allShippings_table_vue_vue_type_template_id_9debf122__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./allShippings-table.vue?vue&type=template&id=9debf122 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tables/allShippings-table.vue?vue&type=template&id=9debf122");


/***/ }),

/***/ "./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=template&id=ee6b7dc6":
/*!********************************************************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=template&id=ee6b7dc6 ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_shippingTabs_vue_vue_type_template_id_ee6b7dc6__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_shippingTabs_vue_vue_type_template_id_ee6b7dc6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./shippingTabs.vue?vue&type=template&id=ee6b7dc6 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/tabs/shippingTabs.vue?vue&type=template&id=ee6b7dc6");


/***/ }),

/***/ "./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=template&id=b055a07a":
/*!***************************************************************************************************!*\
  !*** ./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=template&id=b055a07a ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewShipping_vue_vue_type_template_id_b055a07a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewShipping_vue_vue_type_template_id_b055a07a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./viewShipping.vue?vue&type=template&id=b055a07a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/ShippingComponents/viewShipping.vue?vue&type=template&id=b055a07a");


/***/ })

}]);