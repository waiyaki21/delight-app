<template>
    <div class="relative bg-white dark:bg-gray-900 md:pt-2 pb-2 pt-2" style="padding-top: 2rem;">
        <flash ref="childComponentRef"></flash>
        <!-- loader  -->
        <loading-body v-if="isloading == true"></loading-body>
        <!-- body  -->
        <div v-else>
            <!-- if no products  -->
            <section v-if="this.products.length == 0">
                <h2
                    class="text-[3rem] text-cyan-800 underline decoration-cyan-900 uppercase text-center pt-[10rem] pb-3 font-bold">
                    NO PRODUCTS ON SALE NOW, PLEASE COME BACK LATER!
                </h2>

                <hr class="width-hr mx-auto mb-4 border-b-2 border-blueGray-200" />

                <!-- catergory images    -->
                <carousel v-if="this.catergories.length > 0" :banners="this.banners" :admin="this.admin"
                    @edit="editCatergory" @banner="editBanner" @delete="deleteCatergory"></carousel>
                <!-- end catergory images    -->
            </section>
            <!--end if no products  -->

            <!-- if there are products get product sliders -->
            <section v-else>
                <!-- latest arrivals  -->
                <div>
                    <div class="flex flex-col justify-center">
                        <p class="text-center text-black underline uppercase">Latest Arrivals.</p>
                        <a href="/latest"
                            class="text-center text-muted underline uppercase text-sm hover:cursor-pointer">see all.</a>
                    </div>
                    <!-- latest arrivals cards  -->
                    <cardSlider :latestKey="latestKey" :items="this.products" :cards="this.mySwiperCards"
                        :class="this.mySwiperClass" :user = "this.user" :logged = "this.logged" :admin = "this.admin" @reload="mainReload">
                    </cardSlider>

                </div>
                <!-- latest arrivals  -->

                <hr class="width-hr mx-auto mb-2 border-b-2 border-blueGray-200" />

                <!-- catergory images    -->
                <carousel :banners="this.banners" :admin="this.admin" @edit="editCatergory"
                    @banner="editBanner" @delete="deleteCatergory"></carousel>
                <!-- end catergory images    -->

                <hr class="width-hr mx-auto mb-2 border-b-2 border-blueGray-200" />

                <!-- catergories and products  -->
                <div v-for="catergory in catergories">
                    <div v-if="catergory.in_stock_products.length != 0">
                        <div class="flex flex-col justify-center">
                            <p class="text-center inline-flex justify-center space-x-1">
                                <span class="text-center text-black underline uppercase">{{ catergory.name }}</span>
                                <span class="text-center text-black underline">( {{ catergory.in_stock_products.length
                                    }} )</span>
                            </p>
                            <a :href="'/catergory/'+catergory.id"
                                class="text-center text-muted underline uppercase text-sm hover:cursor-pointer">see
                                all.</a>
                        </div>
                        <!-- catergory products slider -->
                        <categoriesSlider :catergory="catergory" :products="updatedProducts(catergory.in_stock_products)" :latestKey="latestKey" :mySwiperCards="this.mySwiperCards" :mySwiperClass="this.mySwiperClass" :user = "this.user" :logged = "this.logged" :admin = "this.admin" @reload="mainReload"/>
                        <hr class="width-hr mx-auto mb-2 border-b-2 border-blueGray-200" />
                    </div>
                </div>
                <!--end catergories and products  -->

                <!-- random  -->
                <div>
                    <div class="flex flex-col justify-center">
                        <p class="text-center text-black underline uppercase">Check out more stuff.</p>
                    </div>
                    <!-- Carousel wrapper -->
                    <cardSlider :latestKey="latestKey" :items="this.stuff" :cards="this.mySwiperCards"
                        :class="this.mySwiperClass" :user = "this.user" :logged = "this.logged" :admin = "this.admin" @reload="mainReload">
                    </cardSlider>
                </div>
                <!--end random  -->
            </section>
            <!--end products sliders -->
        </div>
    </div>

    <!-- footer  -->
    <footer-body></footer-body>
    <!-- end footer  -->
</template>

<script>
    import flash                                                    from '../AlertComponents/flash-simple.vue';
    import carousel                                                 from './carousels/bannerCarousel.vue';
    import cardSlider                                               from './carousels/SliderCarousel.vue';
    import categoriesSlider                                         from './carousels/catergoriesSlider.vue';

    // Import Swiper components
    import { Swiper, SwiperSlide }                                  from 'swiper/vue';
    import { EffectFade,Navigation,Controller,Scrollbar,Pagination,Autoplay} from "swiper";

    // Import Swiper styles
    import "swiper/css/effect-fade";
    import "swiper/css/controller";
    import "swiper/css/scrollbar";
    import "swiper/css/pagination";
    import 'swiper/css';
    // import './css/swipe.css';

    export default {
        props: [
            'user',
            'logged',
            'admin'
        ],

        data() {
            return {
                // load 
                isloading: true,
                latestKey: false,

                // auth datasets 
                // user:           {},
                // logged:         '',
                // admin:          '',

                // datasets 
                newarrivals:        [],
                catergories:        [],
                catergoriesTV:      [],
                stuff:              [],
                products:           [],
                cartItems:          [],
                banners:            [],
                selectedproduct:    {},
                fields:             {},
                quantity:           '',

                windowWidth:        '',
                mySwiperClass:      '',
                mySwiperCards:      0,
                mySwiperCardsTV:    0,
            }
        },

        components: {
            // authModal,
            carousel,
            flash,
            Swiper,
            SwiperSlide,
            cardSlider,
            categoriesSlider
        },

        setup() {
            return {
                modules: [
                    EffectFade, 
                    Navigation, 
                    Pagination, 
                    Controller, 
                    Scrollbar,
                    Autoplay
                ],
            };
        },

        beforeMount() {
            this.isloading = true;
            // this.getUser();
            this.getProducts();
            this.getCatergories();
        },

        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);
                //Init
                this.getWindowWidth()
            })
        },

        methods: {
            // Add is_favorited to each product
            updatedProducts(infos) {
                if (!this.user) {
                    return infos; // If user is not available, return items without modification
                }
                console.log(this.user.id);
                return infos.map(product => {
                    // Ensure user.id and favorite.user_id are both strings (or both numbers)
                    const isFavorited = Array.isArray(product.favorites) && 
                        product.favorites.some(favorite => String(favorite.user_id) === String(this.user.id));

                    return {
                        ...product,
                        is_favorited: isFavorited
                    };
                });
            },

            getWindowWidth(event) {
                this.windowWidth = document.documentElement.clientWidth;
                const x = this.windowWidth;
                switch (true) {
                    case (x < 767):
                        // console.log("less than five");
                        this.mySwiperClass = 'swiper-xs-show w-full';
                        this.mySwiperCards = 2;
                        this.mySwiperCardsTV = 2;
                        this.latestKey += 1;
                        break;
                    case (x < 1024):
                        // console.log("between 5 and 8");
                        this.mySwiperClass = 'swiper-mid-show w-full';
                        this.mySwiperCards = 4;
                        this.mySwiperCardsTV = 4;
                        this.latestKey += 1;
                        break;
                    case (x < 2400):
                        // console.log("between 9 and 11");
                        this.mySwiperClass = 'swiper-xl-show w-full';
                        this.mySwiperCards = 4;
                        this.mySwiperCardsTV = 4;
                        this.latestKey += 1;
                        break;
                }
            },

            loaded() {
                this.isloading = false;
            },

            getProducts() {
                axios.get('/api/getProducts/')
                    .then(
                    	({data}) => {
                    		this.products       = this.updatedProducts(data[0]);
                            this.stuff          = this.updatedProducts(data[1]);
                    });
            },

            getCatergories() {
                axios.get('/api/getCatergoriesMain/')
                    .then(
                    	({data}) => {
                    		this.catergories       = data[0];
                            this.catergoriesTV     = data[1];
                            this.banners           = data[2];
                            this.loaded();
                    });
            },

            reload() {
                axios.get('/api/getProducts/')
                    .then(
                    	({data}) => {
                    		this.products       = data[0];
                            this.stuff          = data[1];
                            this.loaded();
                    });
                    console.log('reloaded');
            },

            mainReload(message) {
                // this.isloading = true;
                this.getProducts();
                this.getCatergories();
                this.$emit('flash', message);
            },

            editCatergory(catergory) {
                this.$emit('edit', catergory);
            },

            editBanner(catergory) {
                this.$emit('banner', catergory);
            },

            deleteCatergory(catergory) {
                this.$emit('delete', catergory);
            }
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>