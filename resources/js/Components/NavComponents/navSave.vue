<style>
    div.scrollmenu {
    /* background-color: #333; */
    overflow: auto;
    white-space: nowrap;
    scrollbar-width: thin;
    }

    /* div.scrollmenu button {
    display: inline-block;
    } */
</style>
<template>
    <nav class="fixed w-full bg-gray-900 border-b-2 border-yellow-200 px-2 sm:px-4 py-1 dark:bg-gray-900 shadow z-40">
        <!-- flash -->
        <flash 
            ref="childComponentRef"
        ></flash>
        <div class="container flex flex-wrap items-center justify-between mx-auto">
            <a href="/" class="flex items-center">
                <img src="/img/logos/delight-electronics-logo-bny.png" class="mr-2 mb-2" style="height: 45px;" alt="Delight Electronics Logo" />
                <span class="self-center text-2xl uppercase underline font-semibold whitespace-nowrap text-yellow-200"> {{ appname }}. </span>
            </a>
            <div class="flex items-center md:order-2">
                <!-- menu  -->
                <button type="button" class="inline-flex nav-xs-hidden items-center p-2 ml-1 text-sm text-yellow-200  hover:bg-transparent hover:text-yellow-200 dark:text-gray-400 dark:hover:bg-gray-700 " data-drawer-target="drawer" data-drawer-show="drawer" data-drawer-body-scrolling="false" aria-controls="drawer">
                    <span class="sr-only">Open main menu</span>
                    <bars-icon class="h-6 w-6"></bars-icon>
                </button>
                <div class="divider px-1 text-yellow-200 xs-hidden"></div>

                <!-- shopping cart -->
                <a href="/login" type="button" class="relative items-center text-center text-yellow-200 dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1 xs-hidden" v-if="logged == false">
                    <shopping-icon class="h-6 w-6"></shopping-icon>
                    <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-sm text-yellow-200 bg-gray-600 rounded-full border-2 border-black dark:border-gray-900">
                        0
                    </div>
                </a>
                <router-link :to="'/cart/'+user.id" type="button" class="relative items-center text-center text-yellow-200 dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1" v-else>
                    <shopping-icon class="h-6 w-6"></shopping-icon>
                    <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-sm text-yellow-200 bg-gray-600 rounded-full border-2 border-black dark:border-gray-900">
                        {{ this.cartItems }}
                    </div>
                </router-link>
                <div class="divider px-1 text-yellow-200 xs-hidden"></div>

                <!-- search -->
                <button type="button" class="inline-flex relative items-center text-center text-yellow-200 dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1" @click="showSearch">
                    <search-icon class="h-6 w-6"></search-icon>
                </button>
                <div class="divider px-1 text-yellow-200 xs-hidden"></div>

                <!-- notification -->
                <button type="button" class="relative items-center text-center text-yellow-200 dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1 xs-hidden" id="nofity-button" aria-expanded="false" data-dropdown-toggle="not-dropdown" data-dropdown-placement="bottom" v-if="logged == true">
                    <bell-icon class="h-6 w-6"></bell-icon>
                    <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-sm text-yellow-200 bg-gray-600 rounded-full border-2 border-black dark:border-gray-900">
                        {{ this.notifications.length }}
                    </div>
                </button>
                <!-- Dropdown menu -->
                <div class="z-50 hidden my-4 text-base list-none bg-gray-800 divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-black" id="not-dropdown">
                    <ul class="py-1" aria-labelledby="nofity-button">
                        <li v-for="notification in notifications">
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" :href="'/notification/'+notification.id" v-if = "user.admin == '1'">
                                <div class="flex py-1 px-1">
                                    <div class="flex flex-col justify-center">
                                        <h6 class="mb-1 font-normal leading-normal text-sm">
                                            <span class="font-normal text-gray-700">{{ notification.data.message }}</span>
                                        </h6>
                                        <p class="mb-0 leading-tight text-xs text-slate-400">
                                            <i class="mr-1 fa fa-clock"></i>
                                            {{ fromDate(notification.created_at) }}
                                        </p>
                                    </div>
                                </div>
                                <hr class="width-hr mx-auto mb-1 border-b border-blueGray-200" />
                            </a>
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" :href="'/notification/'+notification.id" v-else>
                                <div class="flex py-1 px-1">
                                    <div class="flex flex-col justify-center">
                                        <h6 class="mb-1 font-normal leading-normal text-sm">
                                            <span class="font-normal text-gray-700">{{ notification.data.message }}</span>
                                        </h6>
                                        <p class="mb-0 leading-tight text-xs text-slate-400">
                                            <i class="mr-1 fa fa-clock"></i>
                                            {{ fromDate(notification.created_at) }}
                                        </p>
                                    </div>
                                </div>
                                <hr class="width-hr mx-auto mb-1 border-b border-blueGray-200" />
                            </a>
                        </li>
                        <div class="px-4 py-3">
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-transparent px-4 duration-300 hover:bg-green-200 hover:text-slate-700 lg:transition-colors" v-if="this.notifications.length == 0">
                                <div class="flex py-1">
                                    <div class="flex flex-col justify-center">
                                        <h6 class="mb-1 font-normal leading-normal text-sm underline uppercase">
                                            <span class="font-normal text-gray-700">
                                                (0) Notifications! 
                                                <i class="mr-1 fa fa-check mx-2"></i>
                                        </span>
                                        </h6>
                                    </div>
                                </div>
                            </a>
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" @click="clearNotifications" v-else>
                                <div class="flex py-1">
                                    <div class="flex flex-col justify-center">
                                        <h6 class="mb-1 font-normal leading-normal text-sm underline uppercase"><span class="font-normal text-gray-700">Mark All Notifications As Read <i class="mr-1 fa fa-check mx-2"></i></span></h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </ul>
                </div>
                <div class="divider px-1 text-yellow-200 xs-hidden" v-if="logged == true"></div>

                <!-- user -->
                <button type="button" class="mr-1 text-base bg-transparent text-yellow-200 uppercase md:mr-0 focus:ring-0 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" v-if="logged == true">
                    <user-icon class="w-6 h-6"/> 
                </button>
                <button type="button" class="mr-1 text-base bg-transparent text-yellow-200 uppercase md:mr-0 focus:ring-0 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" v-else>
                    sign in/up
                </button>
                <!-- Dropdown menu -->
                <div class="z-50 hidden my-4 text-base list-none bg-gray-800 divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-yellow-200" id="user-dropdown">
                    <div class="px-4 py-3" v-if="logged == true">
                        <span class="block text-sm text-yellow-200 dark:text-white uppercase"> {{ user.name }} </span>
                        <span class="block text-sm font-medium text-yellow-200 truncate dark:text-gray-400 uppercase"> {{ user.email }} </span>
                    </div>
                    <ul class="py-1" aria-labelledby="user-menu-button">
                        <!-- <li>
                            <a :href="'/'" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                        </li> -->
                        <li v-if = "user.admin == '1'">
                            <a :href="'/settings'" class="block px-4 py-2 text-sm text-yellow-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase">Settings</a>
                        </li>
                        <li>
                            <router-link :to="'/shipping/admin/'+user.id" class="block px-4 py-2 text-sm text-yellow-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase" v-if = "user.admin == '1'">Orders Admin</router-link>
                            <router-link :to="'/shipping/'+user.id" class="block px-4 py-2 text-sm text-yellow-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase" v-else>Shipping Orders</router-link>
                        </li>                      
                        <li v-if="logged == true">
                            <a :href="'/logout'" class="block px-4 py-2 text-sm text-yellow-200 hover:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase">Sign out</a>
                        </li>
                        <li v-else>
                            <a href="/login" class="block px-4 py-2 text-sm text-yellow-200 hover:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer uppercase">Login</a>
                        </li>
                        <li v-if="logged == false">
                            <a href="/register" class="block px-4 py-2 text-sm text-yellow-200 hover:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer uppercase">Register</a>
                        </li>
                    </ul>
                </div>
                <!-- <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false"> -->
                
            </div>
            <div class="items-center justify-between md:hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                <div class="scrollmenu bg-gray-900 whitespace-nowrap">
                    <button v-for="catergory in catergories" id="dropdownDefaultButton" :data-dropdown-toggle="'catergory'+catergory.id" class="mx-1 text-yellow-200 bg-gray-900 hover:underline  font-medium text-base px-1 text-center inline-flex items-center uppercase justify-between" type="button">
                        {{catergory.name }}
                        <down-icon class="w-4 h-4 ml-1"></down-icon> 
                        <!-- Dropdown menu -->
                        <div :id="'catergory'+catergory.id" class="z-10 ml-2 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li v-for="brand in catergory.brands">
                                    <a :href="'/brand/'+brand.id" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ brand.name }}</a>
                                </li>
                            </ul>
                        </div>
                    </button>
                    <ul class="inline-flex justify-between w-full p-0 mt-0 border border-black rounded-lg bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 dark:border-gray-700">
                        <li class="text-yellow-200 dark:text-white">
                            <span data-popover-target="popover-default" class="text-lg p-2 text-center cursor-pointer">+{{ contact1 }}</span>
                            <div data-popover id="popover-default" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                                <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                    <h3 class="font-normal uppercase text-gray-900 dark:text-white underline">Contact Customer Support</h3>
                                </div>
                                <div class="px-3 py-2">
                                    <p>Click to Either Call / Whatsapp</p>
                                    <a :href="'tel:'+contact1" class="text-primary dark:text-blue-600 underline py-2 inline-flex">
                                        <phone-icon class="h-6 w-6 px-1"></phone-icon>
                                        Call: {{ contact1 }}
                                    </a><br>
                                    <a :href="'whatsapp://send?text=Hello Delight Electronics&phone='+contact1" class="text-primary dark:text-blue-600 underline py-2">
                                        <i class=" text-primary fab fa-whatsapp fa-1x mx-2"></i>
                                        Whatsapp: {{ contact1 }}
                                    </a>
                                </div>
                                <div data-popper-arrow></div>
                            </div>
                        </li>
                        <div class="divider my-1 px-1 text-yellow-200"></div>
                        <li class="text-yellow-200 dark:text-white">
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
                        </li>
                        <div class="divider my-1 px-1 text-yellow-200"></div>
                        <li class="flex items-center">
                            <a class="text-yellow-200 px-2 py-1 lg:py-2 flex items-center text-xs uppercase font-bold" href="https://www.facebook.com/profile.php?id=100089041675686&mibextid=ZbWKwL" target="_blank">
                                <i class="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg">
                                </i>
                            </a>
                        </li>
                        <div class="divider my-1 px-1 text-yellow-200"></div>
                        <li class="flex items-center">
                            <a class="text-yellow-200 px-2 py-1 lg:py-2 flex items-center text-xs uppercase font-bold"
                                href="https://www.tiktok.com/@delight_electronics"
                                target="_blank">
                                <i class="lg:text-blueGray-200 text-blueGray-400 fab fa-tiktok text-lg leading-lg"></i>
                            </a>
                        </li>
                        <div class="divider my-1 px-1 text-yellow-200"></div>
                        <li class="flex items-center">
                            <a class="text-yellow-200 px-2 py-1 lg:py-2 flex items-center text-xs uppercase font-bold"
                                href="https://instagram.com/delightelectronics?igshid=ZDdkNTZiNTM="
                                target="_blank"
                                ><i class="lg:text-blueGray-200 text-blueGray-400 fab fa-instagram text-lg leading-lg"></i>
                            </a>
                        </li>
                        <div class="divider my-1 px-1 text-yellow-200"></div>
                        <li class="flex items-center">
                            <a class="text-yellow-200 px-2 py-1 lg:py-2 flex items-center text-xs uppercase font-bold"
                                href="https://goo.gl/maps/3PNHLHn3e4LqRp8d6"
                                target="_blank"
                                ><i class="lg:text-blueGray-200 text-blueGray-400 fas fa-location-arrow text-lg leading-lg"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
            
    <nav class=" bg-white dark:bg-gray-900 border-b border-gray-700 nav-padding">
        <div class="max-w-screen-xl px-2 mx-auto">
            <div class="text-sm font-medium text-center text-gray-700  border-gray-700 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex flex-row -mb-px overflow-x-auto justify-center nav-xs-hidden " style="overflow: hidden; word-wrap: break-word;">
                    <!-- <li class="mr-1" v-if = "user.admin == '1'">
                        <button type="button" class="inline-flex whitespace-nowrap py-2 px-2 mb-1 text-sm font-medium text-yellow-200 focus:outline-none bg-white border border-gray-200 hover:bg-black hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase" @click="showModal">
                            New Catergory
                            <plus-icon class="h-6 w-6 px-1"></plus-icon>
                        </button>
                    </li> -->

                    <!-- show in large screens -->
                    <li class="mr-1 nav-xs-hidden" v-for="catergory in catergories">
                        <a :id="'btnCatergory_'+catergory.id" :data-dropdown-toggle="'catergory_'+catergory.id" class="whitespace-nowrap  relative inline-flex inline-block text-md mx-2 py-2 px-2 border-b-2 border-gray-700 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer uppercase">
                            {{ catergory.name }}
                            <div class="absolute inline-flex items-center justify-center w-5 h-5 text-sm  text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 mt-2 dark:border-gray-900">
                                {{ Number(catergory.brands.length).toLocaleString() }}
                            </div>
                            <down-icon class="h-6 w-6 px-1"></down-icon>
                        </a>

                        <div :id="'catergory_'+catergory.id" class="hidden w-44 z-10 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-gray-500">
                            <ul class="uppercase py-1 text-base text-yellow-200 hover:text-gray-700" style="text-align: initial;" aria-labelledby="dropdownDividerButton">
                                <li v-for="brand in catergory.brands">
                                    <a :href="'/brand/'+brand.id" class="inline-flex items-center justify-between w-full px-2 text-sm py-2 text-yellow-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer">
                                        {{ brand.name }}
                                        <button class="w-5 h-5 whitespace-nowrap mx-2 text-sm font-medium text-white bg-gray-800 border border-gray-800 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-800 uppercase rounded-full">
                                            {{ brand.in_stock_products.length }} 
                                        </button>
                                    </a>
                                    <hr class="width-hr mx-auto mb-1 border-b-1 border-blueGray-200" />
                                </li>
                            </ul>
                            <div class="py-1" v-if = "user.admin == '1'" style="text-align: initial;">
                                <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-yellow-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showBrandModal(catergory)">
                                    Add Brands
                                    <plus-icon class="h-6 w-6 px-1"></plus-icon>
                                </a>
                                <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-yellow-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showEditModal(catergory)">
                                    Edit Catergory
                                    <edit-icon class="h-6 w-6 px-1"></edit-icon>
                                </a>
                                <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-yellow-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="deleteCatergory(catergory)">
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
                                <button id="doubleDropdownButton" :data-dropdown-toggle="'catergoryDrop_'+catergory.id" data-dropdown-placement="left-end" type="button" class="relative inline-flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase">
                                    <left-icon class="h-6 w-6 px-1 hover:rotate-180"></left-icon>
                                    {{ catergory.name }}
                                </button>
                                <hr class="width-hr mx-auto mb-1 border-b-1 border-blueGray-200" />
                                <div :id="'catergoryDrop_'+catergory.id" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-35 dark:bg-gray-700 border border-gray-500">
                                    <ul class="py-1 text-sm text-gray-700  dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                        <li v-for="brand in catergory.brands">
                                            <a :href="'/brand/'+brand.id" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-yellow-200 uppercase hover:text-gray-700 hover:underline flex justify-between">  
                                                {{ brand.name }}
                                                <a class=" bg-black text-white text-sm p-1 mx-1 uppercase border border-black rounded">
                                                    {{ brand.in_stock_products.length }}
                                                </a>
                                            </a>
                                            <hr class="width-hr mx-auto mb-1 border-b-1 border-blueGray-200" />
                                        </li>
                                        <div class="py-1" v-if = "user.admin == '1'" style="text-align: initial;">
                                            <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-yellow-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showBrandModal(catergory)">
                                                Add Brands
                                                <plus-icon class="h-6 w-6 px-1"></plus-icon>
                                            </a>
                                            <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-yellow-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showEditModal(catergory)">
                                                Edit Catergory
                                                <edit-icon class="h-6 w-6 px-1"></edit-icon>
                                            </a>
                                            <a class="underline inline-flex items-center justify-between w-full px-2 text-sm py-2 text-yellow-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="deleteCatergory(catergory)">
                                                Delete Catergory
                                                <delete-icon class="h-6 w-6 px-1"></delete-icon>
                                            </a>
                                        </div>
                                    </ul>
                                </div>
                            </li>
                                            
                        </ul>
                    </div>

                    <!-- drawer -->
                    <div id="drawer" class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-gray-900 w-80 dark:bg-gray-800 thin-scrollbar border-r-2 border-yellow-200 shadow" tabindex="-1" aria-labelledby="drawer-label">
                        <a href="/" class="flex items-center">
                            <img src="/img/logos/delight-electronics-logo-bny.png" class="mr-2 hover:rotate-180" style="height: 45px;" alt="Delight Electronics Logo" />
                            <h5 id="drawer-label" class="text-4xl underline font-normal text-yellow-200 uppercase dark:text-white cursor-default">Delight Electronics</h5>
                        </a>
                        <div class="py-4 overflow-y-auto">
                            <ul class="space-y-2">
                                <li>
                                    <a href="/" class="flex items-center p-2 text-base font-normal text-yellow-200 rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-600 justify-start cursor-pointer">
                                        <home-icon class="h-6 w-6 mx-1"></home-icon>
                                        <span class="ml-3 uppercase text-xl ">Homepage</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="flex items-center p-2 text-base font-normal text-yellow-200 rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 justify-start cursor-pointer" @click="showSearch">
                                        <search-icon class="h-6 w-6 mx-1"></search-icon>
                                        <span class="ml-3 uppercase text-xl">Search</span>
                                    </a>
                                    <form @keyup.enter="enterClicked(fields.search)" >
                                        <div class="mb-4">
                                            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                            <div class="relative">
                                                <input type="search" name="search" id="search" v-model="fields.search" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-700 rounded border border-yellow-200 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="SEARCH PRODUCTS" required>
                                                <button type="button" class="absolute inline-flex items-center px-2 py-1 my-1 text-sm mt-2 font-medium text-yellow-200 bg-gray-600 border border-yellow-200 hover:border-yellow-200 rounded-lg right-2 bottom-0 hover:bg-black hover:text-white focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600">
                                                    <search-icon class="h-6 w-6"></search-icon>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                                <li v-if="logged == true">
                                    <a :href="'/shipping/admin/'+user.id" class="flex items-center p-2 text-base font-normal text-yellow-200 rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 justify-start cursor-pointer" v-if = "user.admin == '1'">
                                        <truck-icon class="h-6 w-6 mx-1"></truck-icon>
                                        <span class="ml-3 uppercase text-xl">Shipping Orders</span>
                                    </a>
                                    <a :href="'/shipping/'+user.id" class="flex items-center p-2 text-base font-normal text-yellow-200 rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 justify-start cursor-pointer" v-else>
                                        <truck-icon class="h-6 w-6 mx-1"></truck-icon>
                                        <span class="ml-3 uppercase text-xl">Shipping Orders</span>
                                    </a>
                                </li>
                                <li v-if="logged == true">
                                    <a :href="'/cart/'+user.id" class="flex items-center p-2 text-base font-normal text-yellow-200 rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 justify-start cursor-pointer">
                                        <shopping-icon class="h-6 w-6 mx-1"></shopping-icon>
                                        <span class="w-full ml-3 uppercase text-xl inline-flex justify-between">
                                            Cart
                                            <button class="w-6 h-6 whitespace-nowrap mx-2 text-sm font-normal text-yellow-200 bg-gray-600 border border-yellow-200 hover:bg-gray-700 hover:text-yellow-200 hover:border-yellow-200 uppercase rounded-full">
                                                {{ this.cartItems }}
                                            </button>
                                        </span>
                                    </a>
                                    
                                </li>
                                <li v-if = "user.admin == '1'">
                                    <a class="flex items-center p-2 text-base font-normal text-yellow-200 rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 justify-start cursor-pointer" @click="showModal">
                                        <plus-icon class="h-6 w-6 mx-1"></plus-icon>
                                        <span class="ml-3 uppercase text-xl">New Catergory</span>
                                    </a>
                                </li>
                                <li v-for="catergory in catergories">
                                    <button type="button" class="flex items-center w-full p-2 text-base font-normal text-yellow-200 transition duration-75 rounded-lg group hover:bg-gray-600 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" :data-collapse-toggle="'dropdown-' + catergory.id">
                                        <span class="flex-1 ml-3 text-left text-2xl whitespace-nowrap uppercase hover:underline">{{ catergory.name }}</span>
                                        <down-icon class="h-6 w-6 px-1 text-yellow-200"></down-icon>
                                    </button>
                                    <hr class="width-hr mx-auto mb-1 border-b border-black" />
                                    <ul :id="'dropdown-' + catergory.id" class="py-2 space-y-2 border border-black rounded shadow">
                                        <li v-for="brand in catergory.brands" class="bg-transparent hover:bg-gray-600">
                                            <a :href="'/brand/'+brand.id" class="w-full p-2 text-base font-normal text-yellow-200 transition duration-75 rounded-lg pl-11 group hover:bg-gray-600 dark:text-white dark:hover:bg-gray-700 uppercase inline-flex justify-between">
                                                {{ brand.name }}
                                                <button class="w-5 h-5 whitespace-nowrap mx-2 text-sm font-normal text-yellow-200 bg-white border border-black hover:bg-gray-100 hover:text-gray-800 hover:border-gray-800 uppercase rounded-full">
                                                    {{ brand.in_stock_products.length }} 
                                                </button>
                                            </a>
                                            <hr class="width-hr mx-auto border-b border-black" />
                                        </li>
                                        <div class="py-1" v-if = "user.admin == '1'" style="text-align: initial;">
                                            <a class="underline inline-flex items-center justify-between w-full px-2 text-base py-2 text-yellow-200 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showBrandModal(catergory)">
                                                Add Brands
                                                <plus-icon class="h-5 w-5 mx-1"></plus-icon>
                                            </a>
                                            <a class="underline inline-flex items-center justify-between w-full px-2 text-base py-2 text-yellow-200 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="showEditModal(catergory)">
                                                Edit Catergory
                                                <edit-icon class="h-5 w-5 mx-1"></edit-icon>
                                            </a>
                                            <a class="underline inline-flex items-center justify-between w-full px-2 text-base py-2 text-yellow-200 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white uppercase cursor-pointer" @click="deleteCatergory(catergory)">
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
                </ul>         
            </div>
        </div>

        <catergoryModal
            v-if            = "user.admin == '1'"
            v-show          = "openModal"
            @closemodal     = "showModal"
            @completed      = "update"
            ref 			= "catergoryRef" 
        ></catergoryModal>

        <catergoryEditModal
            v-if            = "user.admin == '1'"
            v-bind:catergory= "modalData"
            v-show          = "openEditModal"
            @closemodal     = "closeEditModal"
            @editted        = "update"
            ref 			= "catergoryEditRef" 
        ></catergoryEditModal>

        <!-- add product modal  -->
        <productModal
            v-if                = "user.admin == '1'"
            v-show              = "openProductModal"
            v-bind:catfiles     = "catfiles"
            @closemodal         = "showProduct"
            @reloadproduct      = "reload"
            ref 			    = "productRef" 
        ></productModal>

        <!-- add search modal  -->
        <searchModal
            v-show              = "openSearchModal"
            v-bind:catfiles     = "catfiles"
            @closemodal         = "closeSearch"
            @pageload           = "flash"
            ref 			    = "searchRef" 
        ></searchModal>
    </nav>
</template>  

<script>
    import flash 			        from '../AlertComponents/flash-simple.vue';
    import catergoryModal           from '../modalComponents/CatergoryModals/catergory-modal.vue';
    import catergoryEditModal       from '../modalComponents/CatergoryModals/catergory-edit-modal.vue';
    import productModal             from '../modalComponents/productModals/product-modal.vue';
    import searchModal              from '../modalComponents/searchModals/search-modal.vue';
    import moment                   from 'moment';

    export default {
        props: [
            'appname',
            // 'user',
            'contact1',
            'contact2',
            'catfiles',
            'nots'
        ],

        components : {
            catergoryModal,
            catergoryEditModal,
            flash,
            productModal,
            searchModal,
        },

        data() {
            return {
                // data 
                user: {},
                logged: '',
                admin: '',
                catergories: [],
                notifications: [],
                flashMessage : "",
                modalData: {},
                cartItems: '',
                fields: {},

                //show form
                showSearchForm: true,

                // catergory modals 
                openModal: false,
                openEditModal: false,
                openProductModal: false,
                openSearchModal: false
            }
        },

        mounted() {
            this.getCatergoriesLoad();
        },

        created() {
            this.getUser();
        },

        methods: {
            getUser() {
                axios.get('/getUser/')
                    .then(
                    	({data}) => {
                    		this.user   = data[0]
                            this.logged = data[1]
                            this.admin  = data[2]
                            this.getCartItems(data[0]);
                    });
            },

            getCartItems(user) {
                if (this.logged = true) {
                    axios.get('/api/getCartNav/'+ user.id)
                        .then(
                            ({data}) => {
                                this.cartItems = data;
                                this.getNotifications();
                        });
                }
            },

            fromDate(date) {
                  return moment(date).fromNow()
            },

			getNotifications() {
                axios.get('/api/allnotifications')
                    .then(({data}) => this.notifications = data);
                setTimeout(this.getNotifications2, 50000);   
			},

			getNotifications2() {
                axios.get('/api/allnotifications')
                    .then(({data}) => this.notifications = data);
                setTimeout(this.getNotifications, 50000);   
			},

			clearNotifications() {
				let not_no = this.notifications.length;
				axios.get('/notifications/'+this.user.id);
                this.getNotifications();
                this.flashMessage = 'All ' + not_no +' Notifications cleared!';
                this.$refs.childComponentRef.flash([this.flashMessage, 'bg-green-100']); 
			},

            getCatergoriesLoad() {
                return this.catergories = JSON.parse(JSON.stringify(this.catfiles));  
            },

            getCatergories() { 
                axios.get('/api/getCatergories')
                    .then(
                    	({data}) => {
                    		this.catergories = data;
                    });
            },

            update(message) {
                this.flashMessage = message;
                this.$refs.childComponentRef.flash([this.flashMessage, 'bg-green-100']);
                this.getCatergories();
            },

            showModal() {
                this.openModal = !this.openModal;
            },

            enterClicked(search) {
                console.log(search);
                window.location = `http://localhost:8000/search/`+search;
            },

            showProduct() {
                this.openProductModal = !this.openProductModal;
            },

            showSearch() {
                this.openSearchModal = !this.openSearchModal;
            },

            closeSearch() {
                this.openSearchModal = false;
            },

            showEditModal(catergory) {
                this.modalData = catergory;
                this.openEditModal = !this.openEditModal;
            },

            showBrandModal (catergory) {
                this.openModal = !this.openModal;
                this.$refs.catergoryRef.updateBrands(catergory);
            },

            closeEditModal() {
                this.modalData = {};
                this.openEditModal = !this.openEditModal;
            },

            reload() {
				this.$emit('reloadproduct');
                this.getCatergories();
			},
            
            deleteCatergory(catergory) {
                if(confirm('ARE YOU SURE YOU WANT TO DELETE: ' + catergory.name + ' TOGETHER WITH ALL ITS BRANDS AND PRODUCTS' + '?'))
			   	{
			   		let name = catergory.name;
	                axios.delete('/catergory/delete/'+catergory.id)
	                    .then(response => {
	                    	this.flashMessage = 'The catergory: ' + name + ' has been deleted!';
	                    	this.$refs.childComponentRef.flash([this.flashMessage, 'bg-red-100']);
                            this.getCatergories();
	                 	});
			   }
            },

            flash(message) {
                this.flashMessage = message;
                this.$refs.childComponentRef.flash([this.flashMessage, 'bg-green-100']);
            },
        }
    }
</script>