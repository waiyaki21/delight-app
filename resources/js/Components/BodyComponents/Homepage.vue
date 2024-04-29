<template>
    <div class="relative bg-white dark:bg-gray-900 md:pt-2 pb-2 pt-2" style="padding-top: 2rem;">
        <flash 
            ref="childComponentRef"
        ></flash>
        <!-- loader  -->
        <loading-body
            v-if="isloading == true"
        ></loading-body>
        <!-- body  -->
        <div v-else>
            <!-- if no products  -->
            <section v-if="this.products.length == 0">
                <h2 class="text-[3rem] text-cyan-800 underline decoration-cyan-900 uppercase text-center pt-[10rem] pb-3 font-bold">
                    NO PRODUCTS ON SALE NOW, PLEASE COME BACK LATER!
                </h2>

                <hr class="width-hr mx-auto mb-4 border-b-2 border-blueGray-200" />

                <!-- catergory images    -->
                <carousel
                    v-if           = "this.catergories.length > 0"
                    v-bind:banners = "this.banners"
                    v-bind:admin   = "this.admin"
                    @edit          = "editCatergory"
                    @banner        = "editBanner"
                    @delete        = "deleteCatergory"
                ></carousel>   
                <!-- end catergory images    -->
            </section>
            <!--end if no products  -->

            <!-- if there are products get product sliders -->
            <section v-else>
                <!-- latest arrivals  -->
                <div> 
                    <div class="flex flex-col justify-center">
                        <p class="text-center text-black underline uppercase">Latest Arrivals.</p><br>
                        <a href="/latest" class="text-center text-muted underline uppercase text-sm cursor-pointer">see all.</a>
                    </div>
                    <!-- latest arrivals cards  -->
                    <cardSlider
                        :items = "this.products"
                        :cards = "this.mySwiperCards"
                        :class = "this.mySwiperClass"
                    ></cardSlider>

                </div>
                <!-- latest arrivals  -->
                <hr class="width-hr mx-auto mb-4 border-b-2 border-blueGray-200" />

                <!-- catergory images    -->
                <carousel
                    v-bind:banners = "this.banners"
                    v-bind:admin   = "this.admin"
                    @edit          = "editCatergory"
                    @banner        = "editBanner"
                    @delete        = "deleteCatergory"
                ></carousel>    
                <!-- end catergory images    -->

                <hr class="width-hr mx-auto mb-4 border-b-2 border-blueGray-200" />

                <!-- tv catergories and products  -->
                <div v-for="catergory in catergoriesTV">
                    <div v-if="catergory.in_stock_products.length > 3">
                        <div class="flex flex-col justify-center">
                            <p class="text-center text-black underline uppercase">{{ catergory.name }}</p><br>
                            <a :href="'/catergory/'+catergory.id" class="text-center text-muted underline uppercase text-sm cursor-pointer">see all.</a>
                        </div>
                        <div class="mx-auto row">
                            <swiper
                                :key="latestKey"
                                :loop="true"
                                :spaceBetween="10"
                                :autoplay="true"
                                :slidesPerView="[this.mySwiperCardsTV]"
                                :slidesPerColumn="5"
                                :navigation="true"
                                :scrollbar="{
                                    hide: true,
                                }"
                                @swiper="onSwiper"
                                @slideChange="onSlideChange"
                                :modules="modules"
                                :class="[this.mySwiperClass]"
                            >
                                <swiper-slide v-for="product in catergory.in_stock_products">
                                    <a class="max-w-xs m-1 my-4 bg-white rounded-lg dark:bg-gray-800 cursor-pointer" :href="'/product_show/'+product.id">
                                        <a>
                                            <img class="py-4 my-2 rounded" :src="product.thumbnail_path" :alt="product.name + ' image for sale on Delight Electronics'" style="height: 200px;width: 275px;"/>
                                        </a>
                                        <div class="px-1 pb-4">
                                            <div class="row text-center">
                                                <div class="col-md-12">
                                                    <p class="text-xl font-normal text-gray-500 hover:text-gray-900 dark:text-white underline uppercase" style="height: 10px;max-height: 50px;">
                                                        {{ product.name }}.
                                                        <br>
                                                        <div style="padding: 12px;">
                                                            <a :href="'/catergory/'+product.catergory_id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                                                {{ catergory.name }}
                                                            </a>
                                                            <a :href="'/brand/'+product.brand.id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                                                {{ product.brand.name }}
                                                            </a>
                                                        </div>
                                                    </p>
                                                    <div class="px-1 mx-2">
                                                        <span class="text-2xl font-bold uppercase text-gray-900 dark:text-white">ksh {{ Number(product.price).toLocaleString() }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 my-4">
                                                    <a class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium text-lg sm:text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex items-center px-auto">
                                                        Add to cart
                                                        <shopping-icon class="h-6 w-6 sm:h-4 sm:w-4 mx-2"></shopping-icon>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <hr class="width-hr mx-auto mb-4 border-b-2 border-blueGray-200" />
                    </div>
                </div>
                <!--end tv catergories and products  -->

                <!-- catergories and products  -->
                <!-- <fullSlider
                    :cats  = catergories
                    :cards = "this.mySwiperCards"
                    :class = "this.mySwiperClass"
                ></fullSlider> -->
                <div v-for="catergory in catergories">
                    <div v-if="catergory.in_stock_products.length > 3"> 
                        <div class="flex flex-col justify-center">
                            <p class="text-center text-black underline uppercase">{{ catergory.name }}</p><br>
                            <a :href="'/catergory/'+catergory.id" class="text-center text-muted underline uppercase text-sm cursor-pointer">see all.</a>
                        </div>
                        <!-- catergory products slider -->
                        <div class="mx-auto row">
                            <swiper
                                :key="latestKey"
                                :loop="true"
                                :spaceBetween="10"
                                :autoplay="true"
                                :slidesPerView="[this.mySwiperCards]"
                                :slidesPerColumn="5"
                                :navigation="true"
                                :scrollbar="{
                                    hide: true,
                                }"
                                @swiper="onSwiper"
                                @slideChange="onSlideChange"
                                :modules="modules"
                                :class="[this.mySwiperClass]"
                            >
                                <swiper-slide v-for="product in catergory.in_stock_products">
                                    <a class="max-w-xs m-1 my-4 bg-white rounded-lg dark:bg-gray-800 cursor-pointer" :href="'/product_show/'+product.id">
                                        <a>
                                            <img class="p-1 rounded-t-lg" :src="product.thumbnail_path" :alt="product.name + 'image for sale on Delight Electronics'" style="height: 221.333; width:256.767;"/>
                                        </a>
                                        <div class="px-1 pb-4">
                                            <div class="row text-center">
                                                <div class="col-md-12">
                                                    <p class="text-xl font-normal text-gray-500 hover:text-gray-900 dark:text-white underline uppercase" style="height: 10px;max-height: 50px;">
                                                        {{ product.name }}.
                                                        <br>
                                                        <div style="padding: 12px;">
                                                            <a :href="'/catergory/'+product.catergory_id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                                            {{ product.brand.catergory.name }}
                                                            </a>
                                                            <a :href="'/brand/'+product.brand.id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                                                {{ product.brand.name }}
                                                            </a>
                                                        </div>
                                                    </p>
                                                    <div class="px-1 mx-2">
                                                        <span class="text-2xl font-bold uppercase text-gray-900 dark:text-white">ksh {{ Number(product.price).toLocaleString() }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 my-4">
                                                    <a class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium text-lg sm:text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex items-center px-auto">
                                                        Add to cart
                                                        <shopping-icon class="h-6 w-6 sm:h-4 sm:w-4 mx-2"></shopping-icon>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <hr class="width-hr mx-auto mb-4 border-b-2 border-blueGray-200" />
                    </div>
                </div>
                <!--end catergories and products  -->

                <!-- random  -->
                <div> 
                    <div class="flex flex-col justify-center">
                        <p class="text-center text-black underline uppercase">Check out more stuff.</p>
                    </div>
                    <!-- Carousel wrapper -->
                    <cardSlider
                        :items = "this.stuff"
                        :cards = "this.mySwiperCards"
                        :class = "this.mySwiperClass"
                    ></cardSlider>
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
    // import fullSlider                                               from './carousels/FullSliderCarousel.vue';

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
            cardSlider
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
                        this.mySwiperCards = 6;
                        this.mySwiperCardsTV = 5;
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
                    		this.products       = data[0];
                            this.stuff          = data[1];
                            // this.loaded();
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

            mainReload() {
                this.isloading = true;
                this.getProducts();
                this.getCatergories();
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