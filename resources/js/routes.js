import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Delight ELectronics Home",
		component: () => import("./Components/BodyComponents/Homepage.vue"),
	},
	{
		path: "/product_show/:id",
		name: "View Product",
		props: { default: true},
		component: () => import("./Components/ProductComponents/viewProduct.vue"),
	},
	{
		path: "/cart/:id",
		name: "View Cart",
		props: { default: true},
		component: () => import("./Components/CartComponents/viewCart.vue"),
	},
	{
		path: "/checkout/:id",
		name: "Checkout",
		props: { default: true},
		component: () => import("./Components/CheckoutComponents/viewCheckout.vue"),
	},
	{
		path: "/shipping/admin/:id",
		name: "Orders Shipping Admin",
		props: { default: true},
		component: () => import("./Components/ShippingComponents/viewShipping.vue"),
	},
	{
		path: "/shipping/:id",
		name: "Orders Shipping",
		props: { default: true},
		component: () => import("./Components/ShippingComponents/viewShipping.vue"),
	},
	{
		path: "/catergory/phones",
		name: "Phones",
		props: { default: true},
		component: () => import("./Components/CatergoryComponents/viewCatergory.vue"),
	},
	{
		path: "/catergory/covers",
		name: "Covers",
		props: { default: true},
		component: () => import("./Components/CatergoryComponents/viewCatergory.vue"),
	},
	{
		path: "/catergory/accessories",
		name: "Accessories",
		props: { default: true},
		component: () => import("./Components/CatergoryComponents/viewCatergory.vue"),
	},
	{
		path: "/stock/admin/:id",
		name: "View Product Stock",
		props: { default: true},
		component: () => import("./Components/ProductComponents/viewStock.vue"),
	},
	{
		path: "/catergory/:id",
		name: "View Catergory",
		props: { default: true},
		component: () => import("./Components/CatergoryComponents/viewCatergory.vue"),
	},
	{
		path: "/brand/:id",
		name: "View Brand",
		props: { default: true},
		component: () => import("./Components/BrandComponents/viewBrand.vue"),
	},
	{
		path: "/latest",
		name: "View Latest",
		props: { default: true},
		component: () => import("./Components/CatergoryComponents/viewLatest.vue"),
	},
	{
		path: "/search/:id",
		name: "Search",
		props: { default: true},
		component: () => import("./Components/SearchComponents/viewSearch.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	// scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // }
});

export default router;