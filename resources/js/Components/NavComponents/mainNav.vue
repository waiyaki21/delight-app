<template>
    <nav 
        class="fixed w-full bg-white border-b-2 border-black px-2 sm:px-4 pt-2 dark:bg-gray-900 shadow z-40"
        :style="{ opacity: navbarOpacity, transtion: 'opacity 0.1s ease' }">
        <div class="flex flex-wrap items-center justify-between mx-auto">
            <!-- Main Logo  -->
            <a href="/" class="flex items-center">
                <img src="/img/logos/delight-electronics-logo-bny.png" class="mr-2 mb-2 logo xs-max:h-6 xs-max:w-6" alt="Delight Electronics Logo" />
                <span class="self-center logotext uppercase underline font-semibold whitespace-nowrap text-black xs-max:text-3xl"> 
                    {{ appname }}. 
                </span>
            </a>

            <!-- ALL ICONS LIST  -->
            <div class="flex items-center md:order-2">
                <!-- menu  -->
                <button type="button" class="inline-flex nav-xs-hidden items-center p-2 ml-1 text-sm text-black  hover:bg-transparent hover:text-black dark:text-gray-400 dark:hover:bg-gray-700 " data-drawer-target="drawer" data-drawer-show="drawer" data-drawer-body-scrolling="false" aria-controls="drawer">
                    <span class="sr-only">Open main menu</span>
                    <bars-icon class="h-6 w-6 xs-max:h-4 xs-max:w-4"></bars-icon>
                </button>
                <div class="divider px-1 text-black xs-hidden"></div>

                <!-- shopping cart -->
                <a href="/login" type="button" class="relative items-center text-center text-black dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1 xs-hidden" v-if="logged == false">
                    <shopping-icon class="h-6 w-6 xs-max:h-4 xs-max:w-4"></shopping-icon>
                    <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-sm text-black bg-gray-200 rounded-full border-2 border-black dark:border-gray-900">
                        0
                    </div>
                </a>
                <!-- end shopping cart -->

                <!-- favorites items -->
                <router-link :to="'/favorites/'+user.id" type="button" class="relative items-center text-center text-black dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1" v-if="logged">
                    <favorite-icon class="h-6 w-6 xs-max:h-4 xs-max:w-4"></favorite-icon>
                    <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-sm text-black bg-gray-200 rounded-full border-2 border-black dark:border-gray-900">
                        {{ this.favorites }}
                    </div>
                </router-link>
                <div class="divider px-1 text-black xs-hidden"></div>
                <!-- end favorites items-->

                <!-- cart items -->
                <router-link :to="'/checkout/'+user.id" type="button" class="relative items-center text-center text-black dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1" v-if="logged">
                    <shopping-icon class="h-6 w-6 xs-max:h-4 xs-max:w-4"></shopping-icon>
                    <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-sm text-black bg-gray-200 rounded-full border-2 border-black dark:border-gray-900">
                        {{ this.cartItems }}
                    </div>
                </router-link>
                <div class="divider px-1 text-black xs-hidden"></div>
                <!-- end cart items-->

                <!-- search -->
                <button type="button" class="inline-flex relative items-center text-center text-black dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1" @click="showSearch">
                    <search-icon class="h-6 w-6 xs-max:h-4 xs-max:w-4"></search-icon>
                </button>
                <div class="divider px-1 text-black xs-hidden"></div>
                <!-- end notification -->

                <!-- notification -->
                <button type="button" class="relative items-center text-center text-black dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1" v-if="logged == true" @click="showNotification">
                    <bell-icon class="h-6 w-6 xs-max:h-4 xs-max:w-4"></bell-icon>
                    <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-sm text-black bg-gray-200 rounded-full border-2 border-black dark:border-gray-900">
                        {{ this.notifications.length }}
                    </div>
                </button>
                <!-- notification Dropdown menu -->
                <div :class="[this.notificationClass]" @mouseleave="showNotification">
                    <ul class="py-1" aria-labelledby="nofity-button">
                        <li v-for="notification in notifications">
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-white text-black px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" :href="'/notification/'+notification.id" v-if = "user.admin == '1'">
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
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-white text-black px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" :href="'/notification/'+notification.id" v-else>
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
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-white text-black px-4 duration-300 hover:bg-green-200 hover:text-slate-700 lg:transition-colors" v-if="this.notifications.length == 0">
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
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-white text-black px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" @click="clearNotifications" v-else>
                                <div class="flex py-1">
                                    <div class="flex flex-col justify-center">
                                        <h6 class="mb-1 font-normal leading-normal text-sm underline uppercase"><span class="font-normal text-gray-700">Mark All Notifications As Read <i class="mr-1 fa fa-check mx-2"></i></span></h6>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </ul>
                </div>
                <div class="divider px-1 text-black xs-hidden" v-if="logged == true"></div>
                <!-- end notification -->

                <!-- user -->
                <button type="button" class="mr-1 text-base xs-max:text-sm bg-transparent text-black uppercase md:mr-0 focus:ring-0 focus:ring-gray-300 dark:focus:ring-gray-600" @click="showUser" v-if="logged == true">
                    <user-icon class="w-6 h-6"/> 
                </button>
                <button type="button" class="mr-1 text-base xs-max:text-sm bg-transparent text-black uppercase md:mr-0 focus:ring-0 focus:ring-gray-300 dark:focus:ring-gray-600" @click="showUser" v-else>
                    Sign in/up
                </button>
                <!-- User Menu Options -->
                <div :class="[this.userClass]" @mouseleave="showUser">
                    <div class="px-4 py-3" v-if="logged == true">
                        <span class="block text-sm text-black dark:text-white uppercase"> {{ user.name }} </span>
                        <span class="block text-sm font-medium text-black truncate dark:text-gray-400 uppercase"> {{ user.email }} </span>
                    </div>
                    <ul class="py-1" aria-labelledby="user-menu-button" v-if="logged == true">
                        <li>
                            <a :href="'/'" class="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase">Dashboard</a>
                        </li>
                        <li v-if = "admin == '1'">
                            <a class="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase cursor-not-allowed" title="Feature not yet ready!">Settings</a>
                        </li>
                        <li>
                            <router-link :to="'/shipping/admin/'+user.id" class="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase" v-if = "admin == '1'">Orders Admin</router-link>
                            <router-link :to="'/shipping/'+user.id" class="bblock px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase" v-else>Shipping Orders</router-link>
                        </li>                      
                        <li>
                            <a :href="'/logout'" class="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase">Sign out</a>
                        </li>
                    </ul>
                    <ul class="py-1" aria-labelledby="user-menu-button" v-else>
                        <li>
                            <a href="/login" class="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase">Login</a>
                        </li>
                        <li>
                            <a href="/register" class="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white uppercase">Register</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- scrollable mobile menu  -->
            <catMobile
                :catergories     = "this.catergories"
                :contact1        = "this.contact1"
                :admin           = "this.user.admin"
                @show            = "this.showModal"
                @showedit        = "this.showEditModal"
                @editbrand       = "this.editBrand"
                @deletebrand     = "this.deleteBrand"
                @showbrand       = "this.showBrandModal"
                @deletecatergory = "this.deleteCatergory"
            ></catMobile>
            <!-- end scrollable mobile menu  -->
        </div>

        <!-- Catergory List  -->
        <div class="flex flex-wrap items-center justify-between mx-auto">
            <!-- scrollable mobile menu  -->
            <catFull
                :catergories     = "this.catergories"
                :contact1        = "this.contact1"
                :admin           = "this.user.admin"
                @show            = "this.showModal"
                @showedit        = "this.showEditModal"
                @editbrand       = "this.editBrand"
                @deletebrand     = "this.deleteBrand"
                @showbrand       = "this.showBrandModal"
                @deletecatergory = "this.deleteCatergory"
            ></catFull>
            <!-- end scrollable mobile menu  -->
        </div>
    </nav>
         
    <!-- sidebar  -->
    <sidebar
        :catergories     = "this.catergories"
        :logged          = "this.logged"
        :user            = "this.user"
        :cartitems       = "this.cartItems"
        @search          = "this.showSearch"
        @show            = "this.showModal"
        @showedit        = "this.showEditModal"
        @editbrand       = "this.editBrand"
        @deletebrand     = "this.deleteBrand"
        @showbrand       = "this.showBrandModal"
        @deletecatergory = "this.deleteCatergory"
    ></sidebar>
    <!-- end sidebar  -->

    <!-- navigation modals -->
    <!-- add catergory modal  -->
    <catergoryModal
        v-if            = "user.admin == '1'"
        @closemodal     = "showModal"
        @completed      = "update"
        ref 			= "catergoryRef" 
    ></catergoryModal>

    <!-- edit catergory modal  -->
    <catergoryEditModal
        v-if            = "user.admin == '1'"
        v-bind:catergory= "modalData"
        v-bind:banner   = "bannerShow"
        v-show          = "openEditModal"
        @closemodal     = "closeEditModal"
        @editted        = "update"
        ref 			= "catergoryEditRef" 
    ></catergoryEditModal>

    <!-- edit brand modal  -->
    <brandEditModal
        v-if            = "user.admin == '1'"
        v-bind:brand    = "modalData"
        v-show          = "openBrandEditModal"
        @closemodal     = "closeEditBrand"
        @editted        = "update"
        ref 			= "brandEditRef" 
    ></brandEditModal>

    <!-- add product modal  -->
    <productModal
        v-if                = "user.admin == '1'"
        v-show              = "openProductModal"
        v-bind:catfiles     = "catfiles"
        @closemodal         = "showProduct"
        @reloadproduct      = "reload"
        ref 			    = "productRef" 
        @add                = "showNewBrandModal"
    ></productModal>

    <!-- search modal  -->
    <searchModal
        v-show              = "openSearchModal"
        v-bind:catfiles     = "catfiles"
        v-bind:url          = "url"
        @closemodal         = "closeSearch"
        @pageload           = "flash"
        ref 			    = "searchRef" 
    ></searchModal>
    <!-- end navigation modals -->
</template>  

<script>
    import catergoryModal           from '../modalComponents/CatergoryModals/catergory-modal.vue';
    import catergoryEditModal       from '../modalComponents/CatergoryModals/catergory-edit-modal.vue';
    import brandEditModal           from '../modalComponents/BrandModals/brand-edit-modal.vue';
    import productModal             from '../modalComponents/productModals/product-modal.vue';
    import searchModal              from '../modalComponents/searchModals/search-modal.vue';
    import catMobile                from './partials/catergories-mobile.vue';
    import catFull                  from './partials/catergories-full.vue';
    import sidebar                  from './partials/nav-sidebar.vue';
    import moment                   from 'moment';

    export default {
        props: [
            'url',
            'appname',
            'contact1',
            // 'contact2',
            'catfiles',
        ],

        components : {
            catergoryModal,
            catergoryEditModal,
            brandEditModal,
            productModal,
            searchModal,
            catMobile,
            catFull,
            sidebar
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
                favorites: '',
                fields: {},

                //show form
                showSearchForm: true,

                // catergory modals 
                openModal: false,
                openEditModal: false,
                openBrandEditModal: false,
                openProductModal: false,
                openSearchModal: false,

                // dropdown 
                userShow: false,
                notificationShow: false,
                bannerShow: false,

                // dropdown classess
                userClass: 'z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-black inset-menu',
                notificationClass: 'z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-black inset-menu',

                lastScrollPosition: 0,
                isScrollingDown: false,
                navbarOpacity: 1,
            }
        },

        mounted() {
            this.getCatergoriesLoad();
            window.addEventListener("scroll", this.handleScroll);
        },

        beforeMount() {
            this.getUser();
        },

        beforeUnmount() {
            window.removeEventListener("scroll", this.handleScroll);
        },

        methods: {
            handleScroll() {
                const currentScrollPosition = window.scrollY;

                if (currentScrollPosition === 0) {
                    // At the top of the page, set opacity to 1
                    this.navbarOpacity = 1;
                } else if (currentScrollPosition > this.lastScrollPosition) {
                    // Scrolling Down
                    this.isScrollingDown = true;
                    this.navbarOpacity = Math.max(0, this.navbarOpacity - 0.1); // Gradual fade out
                } else {
                    // Scrolling Up
                    this.isScrollingDown = false;
                    this.navbarOpacity = Math.min(1, this.navbarOpacity + 0.1); // Gradual fade in
                }

                this.lastScrollPosition = currentScrollPosition;
            },
            
            getUser() {
                axios.get('/getUser/')
                    .then(
                    	({data}) => {
                            this.logged = data[1]
                            if (this.logged) {
                                this.user       = data[0]
                                this.admin      = data[2]
                                this.favorites  = data[3];
                                this.cartItems  = data[4];
                                this.getNotifications();
                            } else {
                                this.user = [
                                    {'name' :'none','admin':'0'}
                                ];
                                this.admin          = 0;
                                this.favorites      = 0;
                                this.cartItems      = 0;
                                this.notifications  = 0;
                            }
                            this.$emit('userinfo', [this.logged, this.user, this.admin]);
                    });
            },

            showUser() {
                this.userShow = !this.userShow;
                if (this.userShow == true) {
                    this.userClass = 'z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-black inset-menu';
                } else {
                    this.userClass = 'z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-black inset-menu';
                }
            },

            showNotification() {
                this.notificationShow = !this.notificationShow;
                if (this.notificationShow == true) {
                    this.notificationClass = 'z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-black inset-menu';
                } else {
                    this.notificationClass = 'z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 border border-black inset-menu';
                }
            },

            getCartItems(user) {
                if (this.logged = true) {
                    // console.log('maneno sawa');
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
                    .then(({data}) => this.notifications = data)
                    .finally(() => setTimeout(this.getNotifications, 600000)); // Recursively call the same function after 10 minutes
            },

			clearNotifications() {
				let not_no = this.notifications.length;
				axios.get('/notifications/'+this.user.id);
                this.getNotifications();
                this.flashMessage = 'All ' + not_no +' Notifications cleared!';
                this.$emit('flash', this.flashMessage, 'success'); 
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
                this.$emit('flash', this.flashMessage, 'success');
                this.reload();
                // this.getCatergories();
            },

            showModal() {
                // this.openModal = !this.openModal;
                this.$refs.catergoryRef.show();
            },

            enterClicked(search) {
                console.log(search);
                window.location = url+`/search/`+search;
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

            showEditBannerModal(catergory) {
                this.bannerShow = true;
                this.modalData  = catergory;
                this.openEditModal = !this.openEditModal;
            },

            showBrandModal (catergory) {
                this.$refs.catergoryRef.showBrands(catergory);
            },

            showNewBrandModal(catergory) {
                this.showProduct();
                this.$refs.catergoryRef.showBrands(catergory);
            },

            closeEditModal() {
                this.modalData = {};
                this.openEditModal = !this.openEditModal;
            },

            editBrand(brand) {
                this.modalData = {};
                this.modalData = brand;
                this.openBrandEditModal = !this.openBrandEditModal;
            },

            closeEditBrand() {
                this.modalData = {};
                this.openBrandEditModal = !this.openBrandEditModal;
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
	                    	this.$emit('flash', this.flashMessage, 'danger');
                            this.getCatergories();
	                 	});
			   }
            },

            deleteBrand(brand) {
                if (confirm('ARE YOU SURE YOU WANT TO DELETE: ' + brand.name + ' TOGETHER WITH ALL ITS PRODUCTS' + '?')) {
                    let name = brand.name;
                    axios.delete('/brand/delete/' + brand.id)
                        .then(response => {
                            this.flashMessage = 'The brand: ' + name + ' has been deleted!';
                            this.$emit('flash', this.flashMessage, 'danger');
                            this.getCatergories();
                        });
                }
            }
        }
    }
</script>