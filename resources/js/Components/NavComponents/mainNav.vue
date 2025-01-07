<template>
    <nav ref="navbar" class="fixed w-full bg-white border-b-2 border-black px-2 sm:px-4 pt-2 dark:bg-gray-900 shadow z-40" :style="{ opacity: navbarOpacity, transtion: 'opacity 0.1s ease' }">
        <div class="flex flex-wrap items-center justify-between mx-auto">
            <!-- Main Logo  -->
            <a href="/" class="flex items-center">
                <img src="/img/logos/delight-electronics-logo-bny.png" class="mr-2 mb-2 logo xs-max:h-6 xs-max:w-6" alt="Delight Electronics Logo" />
                <span class="self-center logotext uppercase underline font-semibold whitespace-nowrap text-black xs-max:text-3xl"> 
                    {{ appname }}. 
                </span>
            </a>

            <!-- ALL ICONS LIST  -->
            <div class="md:flex md:items-center inline-flex items-center md:order-2 xs-max:w-full justify-end xs-max:space-x-2">
                <!-- menu bar -->
                <button type="button" :class="this.linkClass" data-drawer-target="drawer" data-drawer-show="drawer" data-drawer-body-scrolling="false" aria-controls="drawer">
                    <span class="sr-only">Open main menu</span>
                    <bars-icon :class="this.iconClass"></bars-icon>
                </button>
                <div class="divider px-1 text-black"></div>

                <!-- shopping cart -->
                <a href="/login" type="button" class="relative items-center text-center text-black dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1 xs-hidden" v-if="!logged">
                    <shopping-icon :class="this.iconClass"></shopping-icon>
                    <div :class="this.badgeClass">
                        0
                    </div>
                </a>
                <!-- end shopping cart -->

                <!-- favorites items -->
                <router-link :to="'/favorites/'+user.id" type="button" :class="this.linkClass" v-if="logged">
                    <favorite-icon :class="this.iconClass"></favorite-icon>
                    <div :class="this.badgeClass">
                        {{ this.favorites }}
                    </div>
                </router-link>
                <div class="divider px-1 text-black"></div>
                <!-- end favorites items-->

                <!-- cart items -->
                <router-link :to="'/checkout/'+user.id" type="button" :class="this.linkClass" v-if="logged">
                    <shopping-icon :class="this.iconClass"></shopping-icon>
                    <div :class="this.badgeClass">
                        {{ this.cartItems }}
                    </div>
                </router-link>
                <div class="divider px-1 text-black"></div>
                <!-- end cart items-->

                <!-- search -->
                <button type="button" class="inline-flex relative items-center text-center text-black dark:text-gray-400 rounded-lg text-sm py-1 pr-1 mr-1" @click="showSearch">
                    <search-icon :class="this.iconClass"></search-icon>
                </button>
                <div class="divider px-1 text-black"></div>
                <!-- end notification -->

                <!-- notification -->
                <button type="button" :class="this.linkClass" v-if="logged" @click="showNotification">
                    <bell-icon :class="this.iconClass"></bell-icon>
                    <div :class="this.badgeClass">
                        {{ this.notifications.length }}
                    </div>
                </button>
                <!-- notification Dropdown menu -->
                <div :class="[this.notificationClass]" @mouseleave="showNotification">
                    <ul class="py-1" aria-labelledby="nofity-button">
                        <li v-for="notification in notifications">
                            <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap bg-white text-black px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors" :href="'/notification/'+notification.id" v-if = "admin">
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
                                <hr class="width-hr mx-auto mb-1 border-b border-gray-500" />
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
                                <hr class="width-hr mx-auto mb-1 border-b border-gray-500" />
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
                <div class="divider px-1 text-black" v-if="logged"></div>
                <!-- end notification -->

                <!-- user -->
                <button type="button" :class="this.linkClass" @click="showUser">
                    <user-icon :class="this.iconClass" v-if="logged"/> 
                    <span v-else>Sign in/up</span>
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
        v-if            = "admin"
        @closemodal     = "showModal"
        @completed      = "update"
        ref 			= "catergoryRef" 
    ></catergoryModal>

    <!-- edit catergory modal  -->
    <catergoryEditModal
        v-if            = "admin"
        v-bind:catergory= "modalData"
        v-bind:banner   = "bannerShow"
        v-show          = "openEditModal"
        @closemodal     = "closeEditModal"
        @editted        = "update"
        ref 			= "catergoryEditRef" 
    ></catergoryEditModal>

    <!-- edit brand modal  -->
    <brandEditModal
        v-if            = "admin"
        v-bind:brand    = "modalData"
        v-show          = "openBrandEditModal"
        @closemodal     = "closeEditBrand"
        @editted        = "update"
        ref 			= "brandEditRef" 
    ></brandEditModal>

    <!-- add product modal  -->
    <productModal 
        v-if                = "admin"
        v-show              = "openProductModal"
        v-bind:catfiles     = "catfiles"
        @closemodal         = "showProduct"
        @reloadproduct      = "reload"
        ref 			    = "productRef" 
        @add                = "showNewBrandModal"
        @flash              = "flashShow"
        @hide               = "flashHide"
        @timed              = "flashTimed"
        @click              = "flashClickShow"
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
                linkClass: 'group relative items-center text-center rounded-lg text-lg p-1 mx-auto',
                iconClass: 'h-6 w-6 text-black group-hover:text-cyan-700',
                badgeClass: 'inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-lg text-black bg-gray-200 rounded-full border-2 border-black xs-max:-top-1 xs-max:-right-1 xs-max:w-4 xs-max:h-4 xs-max:border group-hover:bg-gray-800 group-hover:border-cyan-300 group-hover:shadow-md group-hover:text-white',

                lastScrollPosition: 0,
                isScrollingDown: false,
                navbarOpacity: 1,
                isHovered: false,
                previousOpacity: 1
            }
        },

        beforeMount() {
            this.getUser();
        },

        mounted() {
            this.getCatergoriesLoad();
            window.addEventListener('scroll', this.handleScroll);
            this.$refs.navbar.addEventListener('mouseenter', this.handleMouseEnter);
            this.$refs.navbar.addEventListener('mouseleave', this.handleMouseLeave);
        },

        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
            this.$refs.navbar.removeEventListener('mouseenter', this.handleMouseEnter);
            this.$refs.navbar.removeEventListener('mouseleave', this.handleMouseLeave);
        },

        methods: {
            handleScroll() {
                const currentScrollPosition = window.scrollY;

                // If mouse is hovered, override scroll opacity behavior and set to 1
                if (this.isHovered) {
                    this.navbarOpacity = 1;
                } else {
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
                }

                this.lastScrollPosition = currentScrollPosition;
            },

            handleMouseEnter() {
                // Store the current opacity value before changing it
                this.previousOpacity = this.navbarOpacity;
                this.isHovered = true; // Set hover state to true
                this.navbarOpacity = 1; // Set opacity to 1 on hover
            },

            handleMouseLeave() {
                this.isHovered = false; // Set hover state to false
                // Restore the previous opacity value when the mouse leaves
                this.navbarOpacity = this.previousOpacity;
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
                this.flashShow(this.flashMessage, 'success'); 
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
                this.flashShow(this.flashMessage, 'success');
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
            
            async deleteCatergory(category) {
                let productsNo = '';
                let brandsNo = '';
                let products = [];
                let brands = [];
                let message = '';

                try {
                    // Loading message
                    this.flashShow(`Loading Please Wait...`, 'loading');

                    // Fetch category info
                    const { data } = await axios.get('/api/catergory/info/' + category.id);
                    productsNo = data[1];
                    brandsNo = data[2];
                    products = data[3];
                    brands = data[4];
                    message = `ARE YOU SURE YOU WANT TO DELETE: ${category.name} TOGETHER WITH ALL ITS ${brandsNo} BRANDS AND ${productsNo} PRODUCTS?`;
                    
                    this.flashShow(message.toUpperCase(), 'warning');

                    // Confirm deletion
                    if (confirm(message)) {
                        // Notify user of ongoing deletion
                        this.flashHide(0);
                        this.flashShow(`Deleting Category ${category.name}: Please Wait...`.toUpperCase(), 'loading');

                        // Delete category assets sequentially
                        await this.deleteBanner(category.id);
                        await this.deleteProducts(products, category.id);
                        await this.deleteFinal(category.id);
                    } else {
                        this.flashHide(0);
                        this.flashShow(`Delete Cancelled`.toUpperCase(), 'danger');
                    }
                } catch (error) {
                    // Handle errors and show appropriate flash message
                    this.flashHide(0);
                    this.flashShow(`An error occurred: ${error.message}`.toUpperCase(), 'danger');
                }
            },

            async deleteBanner(id) {
                try {
                    this.flashShow(`Deleting Media: Please Wait...`.toUpperCase(), 'loading');

                    const { data } = await axios.delete('/catergory/media/delete/' + id);

                    this.flashHide(0);
                    this.flashShow(data[0], data[1]);
                } catch (error) {
                    this.flashHide(0);
                    this.flashShow(`Failed to delete banner: ${error.message}`.toUpperCase(), 'danger');
                }
            },

            async deleteProducts(products, id) {
                this.flashTimed('Deleting Category Products, please wait...', 'loading', 60000);

                try {
                    for (let [index, product] of products.entries()) {
                        const remainingProducts = products.length - index - 1;
                        let productData = `${product.name}`;

                        try {
                            await axios.delete('/product/delete/' + product.id);

                            this.flashTimed(`${productData} Deleted. (${remainingProducts} products left)`, 'info', 2500);
                        } catch (error) {
                            this.flashTimed(`${productData} failed. (${remainingProducts} products left)`, 'danger', 60000);
                        }
                    }

                    // Notify user once all products are deleted
                    this.flashHide(0);
                    this.flashTimed(`All Products Deleted Successfully.`, 'success', 5000);
                } catch (error) {
                    this.flashHide(0);
                    this.flashShow(`Failed to delete products: ${error.message}`.toUpperCase(), 'danger');
                }
            },

            async deleteFinal(id) {
                try {
                    this.flashShow(`Deleting Category Please Wait...`.toUpperCase(), 'loading');

                    await axios.delete('/catergory/delete/' + id);

                    this.flashHide(0);
                    this.flashShow(`Category Deleted Successfully!`.toUpperCase(), 'success');
                    this.$emit('reload')
                } catch (error) {
                    this.flashHide(0);
                    this.flashShow(`Failed to delete category: ${error.message}`.toUpperCase(), 'danger');
                }
            },

            deleteBrand(brand) {
                if (confirm('ARE YOU SURE YOU WANT TO DELETE: ' + brand.name + ' TOGETHER WITH ALL ITS PRODUCTS' + '?')) {
                    let name = brand.name;
                    axios.delete('/brand/delete/' + brand.id)
                        .then(response => {
                            this.flashMessage = 'The brand: ' + name + ' has been deleted!';
                            this.flashShow(this.flashMessage, 'danger');
                            this.getCatergories();
                        });
                }
            },

            flashShow(message, body) {
                this.$emit('flash', message, body);
            },

            flashTimed(message, body, duration) {
                this.$emit('timed', message, body, duration);
            },

            flashHide(duration) {
                this.$emit('hide', duration);
            },

            flashClickShow(message, body, header, url, button, duration) {
                this.$emit('click', message, body, header, url, button, duration);
            },
        }
    }
</script>