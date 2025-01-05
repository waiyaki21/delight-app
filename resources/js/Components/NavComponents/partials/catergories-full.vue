<template>
    <div class="max-w-screen-xl px-2 mx-auto w-full">
        <div class="text-sm font-medium text-center text-gray-700  border-gray-700 dark:text-gray-400 dark:border-gray-700">
            <button id="zeroButton" data-dropdown-toggle="zero" class="mx-1 text-black bg-white p-1 border border-black rounded-lg hover:underline hover:shadow font-normal text-sm text-center inline-flex items-center uppercase justify-between mb-2" type="button" @click="showModal" v-if="catergories.length == 0 && admin == '1'">
                Add Catergories
                <plus-icon class="w-4 h-4 ml-1"></plus-icon> 
            </button>
            <ul class="flex flex-row -mb-px overflow-x-auto justify-center nav-xs-hidden " style="overflow: hidden; word-wrap: break-word;">
                <!-- show in large screens -->
                <li class="mr-1 nav-xs-hidden" v-for="catergory in catergories">
                    <a :id="'btnCatergory_' + catergory.id" :data-dropdown-toggle="'catergory_' + catergory.id" class="whitespace-nowrap relative inline-flex text-md mt-2 mb-1 py-1 px-4 border-b-2 border-gray-700 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer uppercase">
                        {{ catergory.name }}
                        <div class="absolute inline-flex items-center justify-center w-5 h-5 text-sm text-gray-900 bg-gray-200 border-2 border-gray-900 rounded-full -top-2 -right-2 mt-2 dark:border-gray-900">
                            {{ Number(catergory.brands.length).toLocaleString() }}
                        </div>
                        <down-icon class="h-6 w-6 px-1"></down-icon>
                    </a>

                    <div :id="'catergory_' + catergory.id" class="hidden w-44 z-10 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-gray-500">
                        <ul class="uppercase py-1 text-base text-black hover:text-gray-700" style="text-align: initial;" aria-labelledby="dropdownDividerButton">
                            <li v-if="catergory.brands.length == 0">
                                <a class="inline-flex items-center justify-between w-full px-2 text-sm py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer">
                                    (0) Products.
                                </a>
                                <!-- <hr class="width-hr mx-auto mb-1 border-b-1 border-blueGray-200" /> -->
                            </li>
                            <li v-else v-for="brand in catergory.brands" class="bg-transparent hover:bg-gray-50 inline-flex justify-between w-full">
                                <a :href="'/brand/' + brand.id" class="inline-flex items-center justify-between w-full px-2 text-sm py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer">
                                    {{ brand.name }}
                                </a>
                                <div class="inline-flex justify-end rounded-md shadow-sm" role="group" v-if = "admin == '1'">
                                    <button class="w-6 h-6 whitespace-nowrap m-2 px-2 text-sm font-medium text-white bg-gray-800 border border-gray-800 hover:bg-cyan-700 hover:text-gray-800 hover:border-gray-800 uppercase rounded-full">
                                        {{ brand.in_stock_products.length }} 
                                    </button>
                                    <a class="inline-flex items-center justify-between w-full p-1 text-base text-blue-700 dark:hover:text-blue-800 dark:text-blue-800 uppercase cursor-pointer" @click="editBrand(brand)">
                                        <edit-icon class="h-4 w-4"></edit-icon>
                                    </a>
                                    <a class="inline-flex items-center justify-between w-full p-1 text-base text-red-700 dark:hover:text-red-800 dark:text-red-800 uppercase cursor-pointer" @click="deleteBrand(brand)">
                                        <delete-icon class="h-4 w-4"></delete-icon>
                                    </a>
                                </div>
                                <!-- <hr class="width-hr mx-auto mb-1 border-b-1 border-blueGray-200" /> -->
                            </li>
                        </ul>
                        <div class="py-1" v-if = "admin == '1'" style="text-align: initial;">
                            <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showBrandModal(catergory)">
                                Add Brands
                                <plus-icon class="h-6 w-6 px-1"></plus-icon>
                            </a>
                            <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showEditModal(catergory)">
                                Edit Catergory
                                <edit-icon class="h-6 w-6 px-1"></edit-icon>
                            </a>
                            <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="deleteCatergory(catergory)">
                                Delete Catergory
                                <delete-icon class="h-6 w-6 px-1"></delete-icon>
                            </a>
                        </div>
                    </div>
                </li>
                <!-- Dropdown menu -->
                <div id="catergories_dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-35 dark:bg-gray-700 border border-gray-500">
                    <ul class="py-1 text-base text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton" style="text-align: initial;">
                        <li v-for="catergory in catergories">
                            <button id="doubleDropdownButton" :data-dropdown-toggle="'catergoryDrop_' + catergory.id" data-dropdown-placement="left-end" type="button" class="relative inline-flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase">
                                <left-icon class="h-6 w-6 px-1 hover:rotate-180"></left-icon>
                                {{ catergory.name }}
                            </button>
                            <hr class="width-hr mx-auto mb-1 border-b-1 border-blueGray-200" />
                            <div :id="'catergoryDrop_' + catergory.id" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-35 dark:bg-gray-700 border border-gray-500">
                                <ul class="py-1 text-sm text-gray-700  dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                    <li v-for="brand in catergory.brands" class="inline-flex justify-between w-full">
                                        <a :href="'/brand/' + brand.id" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-black uppercase hover:text-gray-700 hover:underline flex justify-between">  
                                            {{ brand.name }}
                                        </a>
                                        <div class="inline-flex justify-end rounded-md shadow-sm space-x-1" role="group" v-if = "admin == '1'">
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
                                        <hr class="width-hr mx-auto mb-1 border-b-1 border-blueGray-200" />
                                    </li>
                                    <div class="py-1" v-if = "admin == '1'" style="text-align: initial;">
                                        <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showBrandModal(catergory)">
                                            Add Brands
                                            <plus-icon class="h-6 w-6 px-1"></plus-icon>
                                        </a>
                                        <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showEditModal(catergory)">
                                            Edit Catergory
                                            <edit-icon class="h-6 w-6 px-1"></edit-icon>
                                        </a>
                                        <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="deleteCatergory(catergory)">
                                            Delete Catergory
                                            <delete-icon class="h-6 w-6 px-1"></delete-icon>
                                        </a>
                                    </div>
                                </ul>
                            </div>
                        </li>                 
                    </ul>
                </div>
            </ul>         
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'catergories',
            'contact1',
            'admin'
        ],

        methods: {
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