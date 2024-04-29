<template>
        <nav class=" bg-white dark:bg-gray-900 border-b border-gray-700">
            <!-- drawer -->
            <div id="drawer" class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 xs-max:w-72 dark:bg-gray-800 thin-scrollbar border-r-2 border-black shadow" tabindex="-1" aria-labelledby="drawer-label">
                <a href="/" class="flex items-center">
                    <img src="/img/logos/delight-electronics-logo-bny.png" class="mr-2 mb-2 logo" alt="Delight Electronics Logo" />
                    <h5 id="drawer-label" class="logotext underline font-normal text-black uppercase dark:text-white cursor-default">Delight Electronics</h5>
                </a>
                <div class="py-4 overflow-y-auto">
                    <ul class="space-y-2">
                        <li>
                            <a href="/" class="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white hover:underline dark:hover:bg-gray-50 justify-start cursor-pointer">
                                <home-icon class="h-6 w-6 mx-1"></home-icon>
                                <span class="ml-3 uppercase text-xl ">Homepage</span>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white hover:underline dark:hover:bg-gray-700 justify-start cursor-pointer" @click="showSearch">
                                <search-icon class="h-6 w-6 mx-1"></search-icon>
                                <span class="ml-3 uppercase text-xl">Search</span>
                            </a>
                            <!-- <form @keyup.enter="enterClicked(fields.search)" >
                                <div class="mb-4">
                                    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div class="relative">
                                        <input type="search" name="search" id="search" v-model="fields.search" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-900 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="SEARCH PRODUCTS" required>
                                        <button type="button" class="absolute inline-flex items-center px-2 py-1 my-1 text-sm mt-2 font-medium text-black bg-white border border-black hover:border-black rounded-lg right-2 bottom-0 hover:bg-black hover:text-white focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600">
                                            <search-icon class="h-6 w-6"></search-icon>
                                        </button>
                                    </div>
                                </div>
                            </form> -->
                        </li>
                        <li v-if="logged == true">
                            <a :href="'/shipping/admin/' + user.id" class="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white hover:underline dark:hover:bg-gray-700 justify-start cursor-pointer" v-if = "user.admin == '1'">
                                <truck-icon class="h-6 w-6 mx-1"></truck-icon>
                                <span class="ml-3 uppercase text-xl">Shipping Orders</span>
                            </a>
                            <a :href="'/shipping/' + user.id" class="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white hover:underline dark:hover:bg-gray-700 justify-start cursor-pointer" v-else>
                                <truck-icon class="h-6 w-6 mx-1"></truck-icon>
                                <span class="ml-3 uppercase text-xl">Shipping Orders</span>
                            </a>
                        </li>
                        <li v-if="logged == true">
                            <a :href="'/cart/' + user.id" class="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white hover:underline dark:hover:bg-gray-700 justify-start cursor-pointer">
                                <shopping-icon class="h-6 w-6 mx-1"></shopping-icon>
                                <span class="w-full ml-3 uppercase text-xl inline-flex justify-between">
                                    Cart
                                    <button class="w-6 h-6 whitespace-nowrap mx-2 text-sm font-normal text-black bg-white border border-black hover:bg-gray-100 hover:text-gray-800 hover:border-gray-800 uppercase rounded-full">
                                        {{ this.cartitems }}
                                    </button>
                                </span>
                            </a>
                        
                        </li>
                        <li v-if = "user.admin == '1'">
                            <a class="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white hover:underline dark:hover:bg-gray-700 justify-start cursor-pointer" @click="showModal">
                                <plus-icon class="h-6 w-6 mx-1"></plus-icon>
                                <span class="ml-3 uppercase text-xl">New Catergory</span>
                            </a>
                        </li>
                        <li v-for="catergory in catergories">
                            <button type="button" class="flex items-center w-full p-2 text-base font-normal text-black transition duration-75 rounded-lg group hover:underline dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" :data-collapse-toggle="'dropdown-' + catergory.id">
                                <span class="flex-1 ml-3 text-left text-2xl whitespace-nowrap uppercase hover:underline">{{ catergory.name }}</span>
                                <down-icon class="h-6 w-6 px-1 text-black"></down-icon>
                            </button>
                            <hr class="width-hr mx-auto mb-1 border-b border-black" />
                            <ul :id="'dropdown-' + catergory.id" class="py-2 space-y-2 border border-black rounded shadow">
                                <li class="bg-transparent hover:underline" v-if="catergory.brands.length == 0">
                                    <a class="w-full p-2 text-xl font-normal text-black transition duration-75 rounded-lg pl-11 group hover:underline dark:text-white dark:hover:bg-gray-700 uppercase inline-flex justify-between">
                                        (0) Products.
                                    </a>
                                    <hr class="width-hr mx-auto border-b border-black" v-if = "user.admin == '1'"/>
                                </li>
                                <li v-for="brand in catergory.brands" class="bg-transparent hover:underline inline-flex justify-between w-full" v-else>
                                    <a :href="'/brand/' + brand.id" class="w-full p-2 text-xl font-normal text-black transition duration-75 rounded-lg pl-11 group hover:underline dark:text-white dark:hover:bg-gray-700 uppercase inline-flex justify-start">
                                        {{ brand.name }}                                    
                                    </a>
                                    <div class="inline-flex justify-end rounded-md shadow-sm space-x-1" role="group" v-if = "user.admin == '1'">
                                        <button class="w-6 h-6 whitespace-nowrap m-2 px-2 text-sm font-medium text-white bg-gray-800 border border-gray-800 hover:bg-cyan-700 hover:text-gray-800 hover:border-gray-800 uppercase rounded-full">
                                            {{ brand.in_stock_products.length }} 
                                        </button>
                                        <a class="inline-flex items-center justify-between w-full p-2 text-base text-blue-700 dark:hover:text-blue-800 dark:text-blue-800 uppercase cursor-pointer" @click="editBrand(brand)">
                                            <edit-icon class="h-5 w-5 mx-1"></edit-icon>
                                        </a>
                                        <a class="inline-flex items-center justify-between w-full p-2 text-base text-red-700 dark:hover:text-red-800 dark:text-red-800 uppercase cursor-pointer" @click="deleteBrand(brand)">
                                            <delete-icon class="h-5 w-5 mx-1"></delete-icon>
                                        </a>
                                    </div>
                                    <hr class="width-hr mx-auto border-b border-black" />
                                </li>
                                <div class="py-1" v-if = "user.admin == '1'" style="text-align: initial;">
                                    <a class="inline-flex items-center justify-between w-full px-2 text-base py-2 text-black hover:underline dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showBrandModal(catergory)">
                                        Add Brands
                                        <plus-icon class="h-5 w-5 mx-1"></plus-icon>
                                    </a>
                                    <a class="inline-flex items-center justify-between w-full px-2 text-base py-2 text-black hover:underline dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showEditModal(catergory)">
                                        Edit Catergory
                                        <edit-icon class="h-5 w-5 mx-1"></edit-icon>
                                    </a>
                                    <a class="inline-flex items-center justify-between w-full px-2 text-base py-2 text-black hover:underline dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="deleteCatergory(catergory)">
                                        Delete Catergory
                                        <delete-icon class="h-5 w-5 mx-1"></delete-icon>
                                    </a>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!--end drawer -->
        </nav>
</template>

<script>
    export default {
        props: [
            'catergories',
            'logged',
            'user',
            'cartitems'
        ],

        methods: {
            showSearch() {
                this.$emit('search');
            },

            showModal() {
                this.$emit('show');
            },

            editBrand(info) {
                this.$emit('editbrand', info);
            },

            deleteBrand(info) {
                this.$emit('deletebrand', info);
            },

            showBrandModal(info) {
                this.$emit('showbrand', info);
            },

            showEditModal(info) {
                this.$emit('showedit', info);
            },

            deleteCatergory(info) {
                this.$emit('deletecatergory', info);
            },
        }
    }
</script>