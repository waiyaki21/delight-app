<template>
    <div class="fixed group z-10 top-[140px] right-[10px]" v-if = "logged == true && user.admin == '1'" @mouseleave="closeDial">
        <!-- dial btn  -->
        <button type="button" class="flex justify-center items-center w-10 h-10 rounded shadow text-black hover:text-white bg-white hover:bg-black border-2 border-black hover:border-gray-600 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" v-if = "logged == true && user.admin == '1'" @click="showDial">
            <plus-icon class="h-6 w-6 transition-transform group-hover:rotate-45"></plus-icon>
            <span class="sr-only">Open actions menu</span>
        </button>

        <div :class="[this.dialClass]" v-show="this.dialShow">
            <!-- product  -->
            <button type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left" class="flex justify-center items-center w-10 h-10 rounded shadow text-black hover:text-white bg-white hover:bg-black border-2 border-black hover:border-gray-600 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" @click="showProduct">
                <bag-icon class="h-6 w-6"></bag-icon>
                <span class="sr-only">Add Product</span>
            </button>
            <div id="tooltip-share" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Add Product
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <!-- catergory  -->
            <button type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="left" class="flex justify-center items-center w-10 h-10 rounded shadow text-black hover:text-white bg-white hover:bg-black border-2 border-black hover:border-gray-600 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400" @click="addCatergory">
                <phone-icon class="h-6 w-6"></phone-icon>
                <span class="sr-only">Add Catergory</span>
            </button>
            <div id="tooltip-print" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Add Catergory
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <!-- shipping  -->
            <router-link :to="'/shipping/admin/'+user.id" type="button" data-tooltip-target="tooltip-download" data-tooltip-placement="left" class="flex justify-center items-center w-10 h-10 rounded shadow text-black hover:text-white bg-white hover:bg-black border-2 border-black hover:border-gray-600 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                <truck-icon class="h-6 w-6"></truck-icon>
                <span class="sr-only">Shipping</span>
            </router-link>
            <div id="tooltip-download" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Shipping
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <!-- out of stock items  -->
            <router-link :to="'/stock/admin/'+user.id" type="button" data-tooltip-target="tooltip-stock" data-tooltip-placement="left" class="flex justify-center items-center w-10 h-10 rounded shadow text-black hover:text-white bg-white hover:bg-black border-2 border-black hover:border-gray-600 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                <no-icon class="h-6 w-6"></no-icon>
                <span class="sr-only">Stock</span>
            </router-link>
            <div id="tooltip-stock" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Stock
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    </div>

    <div class="fixed right-[10px] top-[33rem] z-10 group">
        <a :href="'whatsapp://send?text=Hello Delight Electronics&phone=' + contact1" class="flex items-center justify-center text-black bg-green-700 rounded-full w-12 h-12 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none dark:focus:ring-green-800 border-2 border-black">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>
</template>

<script>
    export default {
        props: [
            'user',
            'logged',
            'contact1'
        ],

        data() {
            return {
                dialClass: 'flex hidden flex-col items-center mb-4 space-y-2',
                dialShow: false
            }
        },

        methods: {
            addCatergory() {
                this.showDial();
                this.$emit('opencatergory');
            },

            showProduct() {
                this.showDial();
                this.$emit('openproduct');
            },

            showDial() {
                this.dialShow = !this.dialShow;
                if (this.dialShow == true) {
                    this.dialClass = 'flex flex-col items-center mb-4 space-y-2';
                } else {
                    this.dialClass = 'flex hidden flex-col items-center mb-4 space-y-2';
                }
            },

            closeDial() {
                this.dialShow = false;
            }
        }
    }
</script>