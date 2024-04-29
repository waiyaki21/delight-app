<template>
    <div id="root">
        <div class="relative bg-white dark:bg-gray-900 max-h-full">
            <!-- navigation menus -->
            <main-nav
                v-bind:appname        = "appname"
                v-bind:url            = "url"
                v-bind:contact1       = "contact1"
                v-bind:contact2       = "contact2"
                v-bind:catfiles       = "catfiles"
                ref                   = "mainNavRef"
                @reloadproduct        = "getProducts"
            ></main-nav>
            <!-- end navigation menus -->

            <!-- body content -->
            <router-view
                class               = "mainview"
                :key                = "componentKey"
                ref                 = "view"
                @cartinfo           = "updateCart"
                @loaded             = "loaded"    
            ></router-view>
            <!--end body content -->

            <!-- plugins -->
            <main-plugin
                v-bind:user             = "user"
                v-bind:logged           = "logged"
                ref                     = "pluginRef"
                @opencatergory          = "getCatergoryModal"
                @reloadproduct          = "getProducts"
                @openproduct            = "showProduct"
            ></main-plugin>
            <!-- end plugins -->

            <!-- footer -->
            <footer-body
            ></footer-body>
            <!-- end footer -->
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'catfiles'
        ],

        data() {
            return {
                // datasets 
                user:   {},
                logged: '',
                admin:  '',
                url:    '',

                appname:  process.env.MIX_APP_NAME,
                contact1: process.env.MIX_CONTACT1,
                contact2: process.env.MIX_CONTACT2,
                dev_url:  process.env.MIX_URL_DEV,
                prod_url: process.env.MIX_URL_PROD,
                env:      process.env.MIX_APP_ENV,

                // load 
                componentKey: 0,
            }
        },

        beforeMount() {
            this.getInfo();
            this.getUser();
        },

        methods: {
            getInfo() {
                // console.log(this.appname);
                if (this.env == 'production') {
                    this.url = this.prod_url;
                } else {
                    this.url = this.dev_url;
                }
            },

            getUser() {
                axios.get('/getUser/')
                    .then(
                    	({data}) => {
                    		// this.user   = data[0]
                            this.logged = data[1]
                            // this.admin  = data[2]
                            if (this.logged == true) {
                                this.user   = data[0]
                                this.admin  = data[2]
                            } else {
                                this.user = [
                                    {
                                        'id'   :'0',
                                        'name' :'Sign In'
                                    }
                                ];
                                this.admin = 0;
                            }
                    });
            },

            getCatergoryModal() {
                this.$refs.mainNavRef.showModal();
            },

            getProducts() {
                this.componentKey += 1;
            },

            updateCart(userinfo) {
                this.$refs.mainNavRef.getCartItems(userinfo);
            },

            showProduct() {
                this.$refs.mainNavRef.showProduct();
            }
        }
    }
</script>