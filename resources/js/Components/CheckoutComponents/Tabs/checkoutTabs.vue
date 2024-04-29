<template>
    <div id="root">
        <flash ref="childComponentRef"></flash>
        <flashship v-bind:user="user" ref="shipComponentRef"></flashship>
        <loading-body v-if="isloading == true"></loading-body>
        <div class="container bg-blueGray-50 dark:bg-gray-900 max-h-full" v-else>
            <h2 class="text-black underline uppercase text-5xl my-4">Checkout Items.</h2>

            <div class="container bg-blueGray-50 dark:bg-gray-900 max-h-full">
                <div class="mb-2 border-b border-gray-200 dark:border-gray-700">
                    <div class="sm:hidden">
                        <label for="tabs" class="sr-only uppercase">Select tab</label>
                        <select id="tabs"
                            class="bg-white border-0 border-b border-gray-400 text-black text-base uppercase underline block w-full p-2.5">
                            <option @click="tab1show()" class="uppercase px-2">{{ tab1name }}</option>
                            <option @click="tab2show()" class="uppercase px-2">{{ tab2name }}</option>
                            <option @click="tab3show()" class="uppercase px-2">{{ tab3name }}</option>
                        </select>
                    </div>
                    <ul class="hidden sm:flex flex-wrap mb-2 text-lg font-medium text-center"
                        :data-tabs-toggle="['#' + this.view_name]">
                        <li class="mr-2">
                            <button :class="[this.btn1class]" :id="[tab1name]" type="button" role="tab"
                                @click="tab1show()">{{
                                    tab1name }}</button>
                        </li>
                        <li class="mr-2">
                            <button :class="[this.btn2class]" :id="[tab2name]" type="button" role="tab"
                                @click="tab2show()">{{
                                    tab2name }}</button>
                        </li>
                        <li class="mr-2">
                            <button :class="[this.btn3class]" :id="[tab3name]" type="button" role="tab"
                                @click="tab3show()">{{
                                    tab3name }}</button>
                        </li>
                    </ul>
                </div>
                <div :id="[this.view_name]">
                    <div :class="[this.tabBody]" v-if="tab1body">
                        <h2 class="text-black underline uppercase text-3xl my-4">{{ tab1name }}.</h2>
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200  border-2 border-teal-600 hover:border-emerald-600">
                            <p class="text-black underline uppercase text-2xl text-center my-2">Confirm Shipping and
                                Payment.</p>
                            <span class="uppercase text-sm text-muted text-center my-0">( Confirm Shipping Info. )</span>
                            <addShipping @cartinfo=fullreload v-bind:deliveries="deliveries" v-bind:user="user"
                                v-bind:id="user.id" @shipping=shipReload v-bind:cartitems="cartItems"
                                v-bind:carttotal="cartTotal" @failed=updateFailed v-bind:cartitemsno="cartItemsNo">
                            </addShipping>
                        </div>
                    </div>
                    <div :class="[this.tabBody]" v-if="tab2body">
                        <h2 class="text-black underline uppercase text-3xl my-4">{{ tab2name }}.</h2>
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-2 border-teal-600 hover:border-emerald-600">
                            <p class="text-black underline uppercase text-2xl text-center my-2">Delivery Locations.</p>
                            <div class="rounded-t mb-0 px-6 py-2">
                                <ol class="relative border-l border-gray-200 dark:border-gray-700">
                                    <li class="mb-10 ml-4" v-for="delivery in deliveries">
                                        <div
                                            class="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-teal-500 dark:border-gray-900 dark:bg-gray-700">
                                        </div>
                                        <h3 class="text-xl font-semibold uppercase underline text-gray-900 dark:text-white">
                                            <span class="text-muted pr-4">Location: </span>{{ delivery.city }}: {{
                                                delivery.estate }}: {{ delivery.apartment }}
                                        </h3>
                                        <p class="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            <span class="text-muted">Name: </span>{{ delivery.first_name }} {{
                                                delivery.second_name }}
                                        </p>
                                        <p class="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            <span class="text-muted">Number: </span>{{ delivery.phone_number }}
                                        </p>
                                        <a class="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-white border border-gray-200 hover:bg-black hover:text-white focus:z-10 focus:ring-2 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase dark:focus:ring-gray-700"
                                            @click="deleteDelivery(delivery)">
                                            Delete
                                            <delete-icon class="h-4 w-4 mx-2"></delete-icon>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div :class="[this.tabBody]" v-if="tab3body">
                        <h2 class="text-black underline uppercase text-3xl my-4">{{ tab3name }}.</h2>
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-2 border-teal-600 hover:border-emerald-600">
                            <p class="text-black underline uppercase text-2xl text-center my-2">Payment Options.</p>
                            <div class="rounded-t mb-0 px-6 py-2">
                                <div class="btn-wrapper text-center">
                                    <button
                                        class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal p-4 pt-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-lg ease-linear transition-all duration-150 cursor-not-allowed"
                                        title="This Feature is not yet ready!" type="button">
                                        <img alt="Delight Electronics M-Pesa on delivery" class="w-10 mr-1"
                                            src="/img/logos/mpesa.svg" />
                                        Mpesa On Delivery
                                    </button>
                                    <!-- <button
                                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 pb-2 pt-4 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-lg ease-linear transition-all duration-150 cursor-not-allowed" title="This Feature is not yet ready!" type="button">
                                    <i class="fas fa-dollar-sign mr-2"></i>        
                                    Pay On Delivery
                                </button> -->
                                </div>
                                <hr class="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <p class="text-black underline uppercase text-2xl text-center mt-2 mb-1">Delivery Information.
                            </p>
                            <span class="uppercase text-sm text-muted text-center my-0">( Add New Delivery Information.
                                )</span>
                            <div class="rounded-t mb-0 px-6 py-2">
                                <addDelivery @update=updateSuccess @failure=updateFailure></addDelivery>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- footer  -->
    <footer-body></footer-body>
    <!-- end footer  -->
</template>

<script>
import flash from '../AlertComponents/flash-simple.vue';
import flashship from '../AlertComponents/flash-ship.vue';
import addDelivery from '../FormComponents/Delivery/addDelivery.vue';
import addShipping from '../FormComponents/Shipping/addShipping.vue';

export default {
    props: [

    ],

    data() {
        return {
            // loading 
            isloading: true,

            // datasets 
            user: {},
            delivery: {},
            deliveries: [],
            cartItems: {},
            cartTotal: "",
            cartItemsNo: "",

            // page name 
            view_name: "",

            // tabs
            // classes
            activeTab: 'inline-block p-4 py-3 border-b-2 border-blue-700 uppercase text-blue-700',
            inactiveTab: 'inline-block p-4 py-3 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 uppercase',
            tabBody: 'bg-white dark:bg-gray-800 relative flex flex-col min-w-0 break-words w-full mb-6 shadow bg-blueGray-200 border-0 p-4 py-2',
            btn1class: '',
            btn2class: '',
            btn3class: '',

            // bodies 
            tab1body: true,
            tab2body: false,
            tab3body: false,

            // bodies 
            tab1name: 'Delivery Details',
            tab2name: 'Payment Details',
            tab3name: 'Confirmation',
        }
    },

    components: {
        flash,
        flashship,
        addDelivery,
        addShipping,
    },

    beforeMount() {
        this.getUser();
        this.tab1show();
    },

    methods: {
        loaded() {
            this.view_name = this.$route.name;
            this.isloading = false;
            setTimeout(this.scrollTo, 600);
        },

        // show tabs 
        tab1show() {
            this.tab1body = true;
            this.tab2body = false;
            this.tab3body = false;
            this.btn1class = this.activeTab;
            this.btn2class = this.inactiveTab;
            this.btn3class = this.inactiveTab;
        },

        tab2show() {
            this.tab1body = false;
            this.tab2body = true;
            this.tab3body = false;
            this.btn1class = this.inactiveTab;
            this.btn2class = this.activeTab;
            this.btn3class = this.inactiveTab;
        },

        tab3show() {
            this.tab1body = false;
            this.tab2body = false;
            this.tab3body = true;
            this.btn1class = this.inactiveTab;
            this.btn2class = this.inactiveTab;
            this.btn3class = this.activeTab;
        },

        scrollTo() {
            window.scrollTo(0, 1);
            window.scrollTo(0, 0);
        },

        getUser() {
            axios.get('/getUser/delivery')
                .then(
                    ({ data }) => {
                        this.user = data[0]
                        this.delivery = data[1]
                        this.deliveries = data[2]
                        this.getCart(data[0])
                    });
        },

        getCart(user) {
            axios.get('/api/getCart/' + user.id)
                .then(
                    ({ data }) => {
                        this.cartItems = data[0];
                        this.cartTotal = data[1];
                        this.cartItemsNo = data[2];
                        this.$emit('cartinfo', user);
                        this.loaded();
                    });
        },

        updateSuccess() {
            let message = 'Delivery Point added Successfully!';
            this.$refs.childComponentRef.flash([message, 'bg-green-100']);
            this.reload();
        },

        updateFailure() {
            let message = 'Delivery Point Entry Failed!';
            this.$refs.childComponentRef.flash([message, 'bg-red-100']);
        },

        updateFailed() {
            let message = 'Shipping Entry Failed Add a delivery point!';
            this.$refs.childComponentRef.flash([message, 'bg-red-100']);
        },

        fullreload() {
            let message = 'Item removed from cart!';
            this.$refs.childComponentRef.flash([message, 'bg-red-100']);
            this.getUser();
        },

        shipReload(shipping, products) {
            let newShipping = shipping;
            let newProducts = products;
            let message = 'Items sent for Shipping and Delivering!';
            this.$refs.shipComponentRef.flash([message, 'bg-green-100', newShipping, newProducts]);
            this.getUser();
        },

        reload() {
            axios.get('/getUser/delivery')
                .then(
                    ({ data }) => {
                        this.deliveries = data[2]
                    });
        },

        deleteDelivery(delivery) {
            if (confirm('ARE YOU SURE YOU WANT TO REMOVE THIS DELIVERY LOCATION?')) {
                axios.get('/delivery/remove/' + delivery.id)
                    .then(response => {
                        let message = 'delivery location removed!';
                        this.reload();
                        this.$refs.childComponentRef.flash([message, 'bg-red-100 dark:bg-red-900']);
                    })
            }
        },
    }
}
</script>