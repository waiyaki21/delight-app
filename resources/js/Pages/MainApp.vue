<template>
    <div id="root">
        <div class="relative bg-gray-100 dark:bg-gray-900 max-h-full">
            <!-- toast -->
            <toast ref="toastNotificationRef"></toast>
            <!-- navigation menus -->
            <main-nav
                :appname              = "appname"
                :url                  = "url"
                :contact1             = "contact1"
                :catfiles             = "catfiles"
                ref                   = "mainNavRef"
                @flash                = "reloadflashShow"
                @timed                = "flashTimed"
                @hide                 = "flashHide"
                @click                = "flashClickShow"
                @reload               = "reloadMain"
                @reloadproduct        = "getProducts"
                @userinfo             = "setUser"
            ></main-nav>
            <!-- end navigation menus -->

            <!-- body content --> 
            <section class="mt-[7rem]"> 
                <router-view
                    class               = "mainview fullscreen"
                    :key                = "componentKey"
                    ref                 = "view"
                    :url                = "url"
                    :user               = "user"
                    :logged             = "logged"
                    :admin              = "admin"
                    @alert              = "reloadflashShow"
                    @cartinfo           = "updateCart"
                    @reloaduser         = "reloadMain"
                    @loaded             = "loaded"  
                    @edit               = "editCatergory" 
                    @banner             = "editCatergoryBanner"  
                    @delete             = "deleteCatergory"
                    @flash              = "reloadflashShow"
                    @timed              = "flashTimed"
                    @hide               = "flashHide"
                    @click              = "flashClickShow"
                ></router-view>
            </section>
            <!--end body content -->

            <!-- plugins -->
            <main-plugin
                :user                   = "user"
                :logged                 = "logged"
                :contact1               = "contact1"
                ref                     = "pluginRef"
                @opencatergory          = "getCatergoryModal"
                @reloadproduct          = "getProducts"
                @openproduct            = "showProduct"
                @flash                  = "flashShow"
                @click                  = "flashClickShow"
                @timed                  = "flashTimed"
                @hide                   = "flashHide"
            ></main-plugin>
            <!-- end plugins -->
        </div>
    </div>
</template>

<script>
    import toast 			        from '../Components/AlertComponents/new-flashSimple.vue';
    export default {
        props: [
            'catfiles',
        ],

        data() {
            return {
                // Reference to the toast component
                toastNotificationRef: null,

                // datasets 
                user:   {},
                logged: '',
                admin:  '',
                url:    '',

                appname:  process.env.MIX_APP_NAME,
                contact1: process.env.MIX_CONTACT1,
                // contact2: process.env.MIX_CONTACT2,
                dev_url:  process.env.MIX_URL_DEV,
                prod_url: process.env.MIX_URL_PROD,
                env:      process.env.MIX_APP_ENV,

                // load 
                componentKey: 0,
            }
        },

        components : {
            toast,
        },

        beforeMount() {
            this.getInfo();
        },

        computed: {
            isProduction() {
                return process.env.NODE_ENV === 'production';
            },
        },

        methods: {
            getInfo() {
                if (this.isProduction) {
                    this.url = this.prod_url;
                } else {
                    this.url = this.dev_url;
                }
            },

            setUser([l, u, a]) {
                this.logged     = l;
                this.user       = u;
                this.admin      = a;
            },

            getCatergoryModal() {
                this.$refs.mainNavRef.showModal();
            },

            getProducts() {
                this.componentKey += 1;
                this.getInfo();
            },

            updateCart(userinfo) {
                this.$refs.mainNavRef.getCartItems(userinfo);
            },

            showProduct() {
                this.$refs.mainNavRef.showProduct();
            },

            reloadMain() {
                this.$refs.mainNavRef.getUser();
                // this.componentKey += 1;
            },

            showCart() {
                this.$refs.mainNavRef.showCartDrawer();
            },

            editCatergory(catergory) {
                this.$refs.mainNavRef.showEditModal(catergory);
            },

            editCatergoryBanner(catergory) {
                this.$refs.mainNavRef.showEditBannerModal(catergory);
            },

            deleteCatergory(catergory) {
                this.$refs.mainNavRef.deleteCatergory(catergory);
            },

            reloadflashShow(message, body) {
                this.flashShow(message, body);
                // console.log('main-flash-pkaaaaaah', message, body);
                // this.reloadMain();
            },

            // Method to handle the flash message
            flashShow(message, body) {
                if (message) {
                    this.$nextTick(() => {
                        if (this.$refs.toastNotificationRef) {
                            this.flashLoadHide();
                            this.$refs.toastNotificationRef.toastOn([message, body]);
                        }
                    });
                }
            },

            // flashClickShow method
            flashClickShow(message, body, header, url, button, duration) {
                if (message) {
                    this.$nextTick(() => {
                        if (this.$refs.toastNotificationRef) {
                            this.$refs.toastNotificationRef.toastClick([message, body, header, url, button, duration]);
                        }
                    });
                }
            },

            // flashTimed method
            flashTimed(info, type, time) {
                if (this.$refs.toastNotificationRef) {
                    this.$refs.toastNotificationRef.toastOnTime([info, type, time]);
                }
            },

            // flashHide method
            flashHide(x) {
                setTimeout(() => {
                    if (this.$refs.toastNotificationRef) {
                        this.$refs.toastNotificationRef.allHide();
                    }
                }, x);
            },

            // flash Load Hide method
            flashLoadHide() {
                if (this.$refs.toastNotificationRef) {
                    this.$refs.toastNotificationRef.loadHide();
                }
            }
        }
    }
</script>