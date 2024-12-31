"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Components_BrandComponents_viewBrand_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AlertComponents_flash_simple_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AlertComponents/flash-simple.vue */ "./resources/js/Components/AlertComponents/flash-simple.vue");
/* harmony import */ var _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @heroicons/vue/24/outline */ "./node_modules/@heroicons/vue/24/outline/ShoppingCartIcon.js");
/* harmony import */ var _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @heroicons/vue/24/outline */ "./node_modules/@heroicons/vue/24/outline/ListBulletIcon.js");
/* harmony import */ var _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @heroicons/vue/24/outline */ "./node_modules/@heroicons/vue/24/outline/Square2StackIcon.js");
/* harmony import */ var _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_3__);

// import icons 

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: [],
  data: function data() {
    return {
      // load 
      isloading: true,
      //page info
      showList: true,
      showCard: false,
      cardActive: '',
      listActive: '',
      // dataset 
      brand: {}
    };
  },
  components: {
    flash: _AlertComponents_flash_simple_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    ShoppingCartIcon: _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_1__,
    ListBulletIcon: _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_2__,
    Square2StackIcon: _heroicons_vue_24_outline__WEBPACK_IMPORTED_MODULE_3__
  },
  beforeMount: function beforeMount() {
    this.isloading = true;
    this.getBrand();
  },
  methods: {
    loaded: function loaded() {
      this.isloading = false;
    },
    getBrand: function getBrand() {
      var _this = this;
      var brand_id = this.$route.params.id;
      axios.get('/api/getBrand/' + brand_id).then(function (_ref) {
        var data = _ref.data;
        _this.brand = data;
        _this.orderList();
        _this.loaded();
      });
    },
    orderList: function orderList() {
      this.showCard = false;
      this.showList = true;
      this.cardActive = 'text-gray-500 cursor-pointer';
      this.listActive = 'text-black cursor-not-allowed';
    },
    orderCard: function orderCard() {
      this.showCard = true;
      this.showList = false;
      this.cardActive = 'text-black cursor-not-allowed';
      this.listActive = 'text-gray-500 cursor-pointer';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=template&id=fcccf2d6":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=template&id=fcccf2d6 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  key: 1,
  "class": "container bg-blueGray-50 dark:bg-gray-900 max-h-full"
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
var _hoisted_5 = {
  "class": "max-w-md mx-auto my-2 bg-white hover:shadow overflow-hidden md:max-w-2xl border border-gray-200"
};
var _hoisted_6 = {
  "class": "flex"
};
var _hoisted_7 = {
  "class": "md:shrink-0 py-2"
};
var _hoisted_8 = ["href"];
var _hoisted_9 = ["src", "alt"];
var _hoisted_10 = ["src", "alt"];
var _hoisted_11 = {
  "class": "p-4"
};
var _hoisted_12 = {
  "class": "flex"
};
var _hoisted_13 = ["href"];
var _hoisted_14 = ["href"];
var _hoisted_15 = ["href"];
var _hoisted_16 = {
  "class": ""
};
var _hoisted_17 = {
  "class": "text-2xl font-bold uppercase text-gray-900 dark:text-white"
};
var _hoisted_18 = ["href"];
var _hoisted_19 = {
  key: 1,
  "class": "row justify-center"
};
var _hoisted_20 = {
  "class": "col-sm-6 m-2 bg-white border border-gray-200 hover:shadow dark:bg-gray-800 dark:border-gray-700 item-card"
};
var _hoisted_21 = ["href"];
var _hoisted_22 = ["src", "alt"];
var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
  "class": "width-hr mx-auto mb-1 border-b border-blueGray-200"
}, null, -1 /* HOISTED */);
var _hoisted_24 = {
  "class": "p-5"
};
var _hoisted_25 = ["href"];
var _hoisted_26 = {
  "class": "text-2xl font-normal text-gray-500 hover:text-black dark:text-white hover:underline uppercase"
};
var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* HOISTED */);
var _hoisted_28 = {
  "class": "flex"
};
var _hoisted_29 = ["href"];
var _hoisted_30 = ["href"];
var _hoisted_31 = {
  "class": "mb-2"
};
var _hoisted_32 = {
  "class": "text-2xl font-bold uppercase text-gray-900 dark:text-white"
};
var _hoisted_33 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_flash = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("flash");
  var _component_loading_body = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading-body");
  var _component_list_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("list-icon");
  var _component_cards_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("cards-icon");
  var _component_shopping_icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("shopping-icon");
  var _component_footer_body = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("footer-body");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_flash, {
    ref: "childComponentRef"
  }, null, 512 /* NEED_PATCH */), $data.isloading == true ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_loading_body, {
    key: 0
  })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.brand.name) + " Products. ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_list_icon, {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['mx-2 h-6 w-6', this.listActive]),
    title: "Arrange Products in Lists",
    onClick: $options.orderList
  }, null, 8 /* PROPS */, ["class", "onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_cards_icon, {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['mx-2 h-6 w-6', this.cardActive]),
    title: "Arrange Products in Cards",
    onClick: $options.orderCard
  }, null, 8 /* PROPS */, ["class", "onClick"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_4, " ( " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number($data.brand.in_stock_products.length).toLocaleString()) + " Products) ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" brand products  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" rows  "), $data.showList ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 0
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.brand.in_stock_products, function (product) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/product_show/' + product.id
    }, [product.catergory.name == 'TVs' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
      key: 0,
      "class": "",
      src: product.thumbnail_path,
      alt: 'Delight Electronics ' + product.name,
      style: {
        "width": "240px",
        "height": "180px"
      }
    }, null, 8 /* PROPS */, _hoisted_9)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
      key: 1,
      "class": "object-cover",
      src: product.thumbnail_path,
      alt: 'Delight Electronics ' + product.name,
      style: {
        "width": "220px",
        "height": "220px"
      }
    }, null, 8 /* PROPS */, _hoisted_10))], 8 /* PROPS */, _hoisted_8)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/catergory/' + product.catergory_id,
      "class": "bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white hover:underline"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.catergory.name), 9 /* TEXT, PROPS */, _hoisted_13), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/brand/' + product.brand_id,
      "class": "bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white hover:underline"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.brand.name), 9 /* TEXT, PROPS */, _hoisted_14)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/product_show/' + product.id,
      "class": "text-xl font-normal text-gray-700 hover:text-black dark:text-white hover:underline uppercase"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.name), 9 /* TEXT, PROPS */, _hoisted_15), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, "ksh " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(product.price).toLocaleString()), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/product_show/' + product.id,
      "class": "text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-1 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex items-center px-auto justify-between w-full"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Add To cart "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_shopping_icon, {
      "class": "h-6 w-6 mx-2"
    })], 8 /* PROPS */, _hoisted_18)])])]);
  }), 256 /* UNKEYED_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" cards  "), $data.showCard ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.brand.in_stock_products, function (product) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/product_show/' + product.id,
      "class": "flex justify-center"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      "class": "py-2",
      src: product.thumbnail_path,
      alt: 'Delight Electronics ' + product.name
    }, null, 8 /* PROPS */, _hoisted_22)], 8 /* PROPS */, _hoisted_21), _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/product_show/' + product.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.name) + " ", 1 /* TEXT */), _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/catergory/' + product.catergory_id,
      "class": "bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white hover:underline"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.catergory.name), 9 /* TEXT, PROPS */, _hoisted_29), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/brand/' + product.brand_id,
      "class": "bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white hover:underline"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.brand.name), 9 /* TEXT, PROPS */, _hoisted_30)])])], 8 /* PROPS */, _hoisted_25), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_32, "ksh " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Number(product.price).toLocaleString()), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: '/product_show/' + product.id,
      "class": "text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-1 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex items-center px-auto justify-between w-full"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Add To cart "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_shopping_icon, {
      "class": "h-6 w-6 mx-2"
    })], 8 /* PROPS */, _hoisted_33)])]);
  }), 256 /* UNKEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" footer  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_footer_body), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" end footer  ")], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./resources/js/Components/BrandComponents/viewBrand.vue":
/*!***************************************************************!*\
  !*** ./resources/js/Components/BrandComponents/viewBrand.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _viewBrand_vue_vue_type_template_id_fcccf2d6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewBrand.vue?vue&type=template&id=fcccf2d6 */ "./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=template&id=fcccf2d6");
/* harmony import */ var _viewBrand_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewBrand.vue?vue&type=script&lang=js */ "./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=script&lang=js");
/* harmony import */ var C_Users_Kelvin_Waiyaki_Desktop_Work_Projects_Delight_Electronics_Info_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,C_Users_Kelvin_Waiyaki_Desktop_Work_Projects_Delight_Electronics_Info_delight_app_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_viewBrand_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_viewBrand_vue_vue_type_template_id_fcccf2d6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Components/BrandComponents/viewBrand.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=script&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=script&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewBrand_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewBrand_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./viewBrand.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=template&id=fcccf2d6":
/*!*********************************************************************************************!*\
  !*** ./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=template&id=fcccf2d6 ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewBrand_vue_vue_type_template_id_fcccf2d6__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_viewBrand_vue_vue_type_template_id_fcccf2d6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./viewBrand.vue?vue&type=template&id=fcccf2d6 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Components/BrandComponents/viewBrand.vue?vue&type=template&id=fcccf2d6");


/***/ })

}]);