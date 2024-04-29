<template>
    <div class="items-center justify-between md:hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
        <div class="scrollmenu bg-white whitespace-nowrap">
            <!-- moblie no catergories  -->
            <button id="zeroButton" data-dropdown-toggle="zero" class="mx-1 text-black bg-cyan-600 p-2 border border-black rounded-lg hover:underline hover:shadow font-medium text-lg text-center inline-flex items-center uppercase justify-between mb-2" type="button" v-if="catergories.length == 0 && admin == '1'">
                (0) Catergories
                <plus-icon class="w-4 h-4 ml-1"></plus-icon> 
                <!-- Dropdown menu -->
                <div id="zero" class="z-10 ml-2 hidden bg-white divide-y divide-gray-100 rounded-md shadow-md w-44 dark:bg-gray-700 text-start border-2 border-blue-600">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="zeroButton">
                        <li>
                            <a class="underline inline-flex items-center justify-between w-full px-2 text-lg py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showModal">
                                Add Catergory
                                <plus-icon class="h-6 w-6 px-1"></plus-icon>
                            </a>
                        </li>  
                    </ul>
                </div>
            </button>

            <button v-for="catergory in catergories" id="dropdownDefaultButton" :data-dropdown-toggle="'catergory' + catergory.id" class="mx-1 text-black bg-white hover:underline  font-medium text-base px-1 text-center inline-flex items-center uppercase justify-between" type="button">
                {{ catergory.name }}
                <down-icon class="w-4 h-4 ml-1"></down-icon> 
                <!-- Dropdown menu -->
                <div :id="'catergory' + catergory.id" class="z-10 ml-2 hidden bg-white divide-y divide-gray-100 rounded-md shadow-md w-44 dark:bg-gray-700 text-start border-2 border-gray-600">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 flex-col" aria-labelledby="dropdownDefaultButton">
                        <li v-if="catergory.brands.length == 0">
                            <a href="#" class="block px-4 py-2 dark:hover:text-white uppercase text-lg hover:underline">No brands yet!!</a>
                        </li>
                        <li v-for="brand in catergory.brands" v-else  class="bg-transparent hover:bg-gray-50 flex justify-between w-full">
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
                        </li>
                        <li v-if = "admin == '1'">
                            <a class="underline inline-flex items-center justify-between w-full px-2 text-lg py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showBrandModal(catergory)">
                                Add Brands
                                <plus-icon class="h-6 w-6 px-1"></plus-icon>
                            </a>
                        </li> 
                        <li v-if = "admin == '1'">
                            <a class="underline inline-flex items-center justify-between w-full px-2 text-lg py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showEditModal(catergory)">
                                Edit Catergory
                                <edit-icon class="h-6 w-6 px-1"></edit-icon>
                            </a>
                        </li> 
                        <li v-if = "admin == '1'">
                            <a class="underline inline-flex items-center justify-between w-full px-2 text-lg py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="deleteCatergory(catergory)">
                                Delete Catergory
                                <delete-icon class="h-6 w-6 px-1"></delete-icon>
                            </a>
                        </li>  
                    </ul>
                </div>
            </button>

            <!-- contact info and socials  -->
            <ul class="inline-flex justify-normal space-x-1 p-0 mt-0 border border-black rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 dark:border-gray-700 mb-1">
                <li class="text-black dark:text-white">
                    <span data-popover-target="popover-default" class="text-base p-2 text-center cursor-pointer">+{{ contact1 }}</span>
                    <div data-popover id="popover-default" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                        <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                            <h3 class="font-normal uppercase text-gray-900 dark:text-white underline">Contact Customer Support</h3>
                        </div>
                        <div class="px-3 py-2">
                            <p>Click to Either Call / Whatsapp</p>
                            <a :href="'tel:' + contact1" class="text-primary dark:text-blue-600 underline py-2 inline-flex">
                                <phone-icon class="h-6 w-6 px-1"></phone-icon>
                                Call: {{ contact1 }}
                            </a><br>
                            <a :href="'whatsapp://send?text=Hello Delight Electronics&phone=' + contact1" class="text-primary dark:text-blue-600 underline py-2">
                                <i class=" text-primary fab fa-whatsapp fa-1x mx-2"></i>
                                Whatsapp: {{ contact1 }}
                            </a>
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                </li>
                <div class="divider my-2 px-1 text-black"></div>
                <!-- <li class="text-black dark:text-white">
                <span data-popover-target="popover-default2" class="text-lg p-2 text-center cursor-pointer">+{{ contact2 }}</span>
                <div data-popover id="popover-default2" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                    <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                        <h3 class="font-normal uppercase text-gray-900 dark:text-white underline">Contact Customer Support</h3>
                    </div>
                    <div class="px-3 py-2">
                        <p>Click to Either Call / Whatsapp</p>
                        <a :href="'tel:'+ contact2" class="text-primary dark:text-blue-600 underline py-2 inline-flex">
                            <phone-icon class="h-6 w-6 px-1"></phone-icon>
                            Call: {{ contact2 }}
                        </a>
                        <a :href="'whatsapp://send?text=Hello Delight Electronics&phone='+contact2" class="text-primary dark:text-blue-600 underline py-2 inline-flex">
                            <i class=" text-primary fab fa-whatsapp fa-1x mx-2"></i>
                            Whatsapp: {{ contact2 }}
                        </a>
                    </div>
                    <div data-popper-arrow></div>
                </div>
            </li> -->
                <!-- <div class="divider my-1 px-1 text-black"></div> -->
                <li class="flex items-center">
                    <a class="text-black px-2 py-1 lg:py-2 flex items-center text-xs uppercase font-bold" href="https://www.facebook.com/profile.php?id=100089041675686&mibextid=ZbWKwL" target="_blank">
                        <i class="lg:text-blueGray-200 text-gray-800 hover:text-cyan-600 fab fa-facebook text-lg leading-lg">
                        </i>
                    </a>
                </li>
                <!-- <div class="divider my-1 px-1 text-black"></div> -->
                <li class="flex items-center">
                    <a class="text-black px-2 py-1 lg:py-2 flex items-center text-xs uppercase font-bold"
                        href="https://www.tiktok.com/@delight_electronics"
                        target="_blank">
                        <i class="lg:text-blueGray-200 text-gray-800 hover:text-cyan-600 fab fa-tiktok text-lg leading-lg"></i>
                    </a>
                </li>
                <!-- <div class="divider my-1 px-1 text-black"></div> -->
                <li class="flex items-center">
                    <a class="text-black px-2 py-1 lg:py-2 flex items-center text-xs uppercase font-bold"
                        href="https://instagram.com/delightelectronics?igshid=ZDdkNTZiNTM="
                        target="_blank"
                        ><i class="lg:text-blueGray-200 text-gray-800 hover:text-cyan-600 fab fa-instagram text-lg leading-lg"></i>
                    </a>
                </li>
                <!-- <div class="divider my-1 px-1 text-black"></div> -->
                <li class="flex items-center">
                    <a class="text-black px-2 py-1 lg:py-2 flex items-center text-xs uppercase font-bold"
                        href="https://goo.gl/maps/3PNHLHn3e4LqRp8d6"
                        target="_blank"
                        ><i class="lg:text-blueGray-200 text-gray-800 hover:text-cyan-600 fas fa-location-arrow text-lg leading-lg"></i>
                    </a>
                </li>
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