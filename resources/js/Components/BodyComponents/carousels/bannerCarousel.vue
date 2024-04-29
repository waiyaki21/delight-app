<template>
    <div>
        <!-- list images large screens -->
        <div class="list-img container">
            <div class="mx-auto inline-flex">
                <figure class="relative max-w-sm transition-all duration-300 cursor-pointer img-shadow img-box m-2" v-for="banner in this.banners">
                    <a :href="'/catergory/' + banner.catergory_id">
                        <img class="rounded-lg border-2 border-gray-500 hover:border-2 hover:border-gray-800 hover:shadow-md" :src="banner.path" :alt="banner.name">
                    </a>
                    <figcaption class="absolute px-4 bottom-6 inline-flex justify-between w-full">
                        <a class="text-white bg-gradient-to-br from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-base px-5 py-2.5 text-center mr-2 mb-2 uppercase inline-flex justify-between border-2 border-blue-900 hover:border-green-900" :href="'/catergory/' + banner.catergory_id">
                            {{ banner.catergory.name }}
                            <bag-icon class="h-6 w-6 mx-2"></bag-icon>
                        </a>
                        <div class="inline-flex justify-end shadow-sm bg-white border-2 border-gray-300 p-1 mr-1 mb-1 hover:shadow-md rounded-lg" role="group" v-if = "admin == '1'">
                            <a class="inline-flex items-center justify-between w-full p-1 text-base text-purple-700 hover:text-purple-900 dark:hover:text-purple-800 dark:text-purple-800 uppercase cursor-pointer" data-tooltip-target="edit-tooltip" @click="editCatergory(banner.catergory)">
                                <edit-icon class="h-6 w-6 sm:h-4 sm:w-4 hover:h-7 hover:w-7 hover:sm:h-5 hover:sm:w-5"></edit-icon>
                            </a>
                            <div id="edit-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 uppercase">
                                Edit {{ banner.catergory.name }}
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <a class="inline-flex items-center justify-between w-full p-1 text-base text-teal-700 hover:text-teal-900 dark:hover:text-teal-800 dark:text-teal-800 uppercase cursor-pointer" data-tooltip-target="banner-tooltip" @click="editBanner(banner.catergory)">
                                <photo-icon class="h-6 w-6 sm:h-4 sm:w-4 hover:h-7 hover:w-7 hover:sm:h-5 hover:sm:w-5"></photo-icon>
                            </a>
                            <div id="banner-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 uppercase">
                                Edit Banner {{ banner.catergory.name }}
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <a class="inline-flex items-center justify-between w-full p-1 text-base text-rose-700 hover:text-rose-900 dark:hover:text-rose-800 dark:text-rose-800 uppercase cursor-pointer" data-tooltip-target="delete-tooltip" @click="deleteCatergory(banner.catergory)">
                                <delete-icon class="h-6 w-6 sm:h-4 sm:w-4 hover:h-7 hover:w-7 hover:sm:h-5 hover:sm:w-5"></delete-icon>
                            </a>
                            <div id="delete-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 uppercase">
                                Delete {{ banner.catergory.name }}
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </div>
        <!-- carousel images  small screens-->
        <swiper
            :loop="true"
            :spaceBetween="0"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }"
            :pagination="{
                clickable: true,
            }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :modules="modules"
            class="carousel-img" 
        >
        
            <swiper-slide style="padding-bottom: 19px; min-height: 430px;" v-for="banner in banners">
                <figure class="relative max-w-sm transition-all duration-300 cursor-pointer img-shadow img-box m-2">
                    <a :href="'/catergory/' + banner.catergory_id">
                        <img class="rounded-lg border-2 border-teal-500 hover:border-2 hover:border-teal-800" :src="banner.path" :alt="banner.name">
                    </a>
                    <figcaption class="absolute px-4 bottom-6 inline-flex justify-between w-full">
                        <!-- <a class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-200 font-medium text-lg sm:text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex items-center rounded-md hover:shadow-md" :href="'/catergory/' + banner.catergory_id">
                            {{ banner.catergory.name }}
                            <bag-icon class="h-6 w-6 sm:h-4 sm:w-4 hover:h-7 hover:w-7 hover:sm:h-5 hover:sm:w-5 mx-2"></bag-icon>
                        </a> -->
                        <a class="text-black bg-gradient-to-br from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-base px-5 py-2.5 text-center mr-2 mb-2 uppercase inline-flex justify-between border-2 border-blue-900 hover:border-green-900" :href="'/catergory/' + banner.catergory_id">
                            {{ banner.catergory.name }}
                            <bag-icon class="h-6 w-6 sm:h-4 sm:w-4 hover:h-7 hover:w-7 hover:sm:h-5 hover:sm:w-5 mx-2"></bag-icon>
                        </a>
                        <div class="inline-flex justify-end shadow-sm bg-white border-2 border-gray-300 p-1 mr-1 mb-1 hover:shadow-md rounded-lg" role="group" v-if = "admin == '1'">
                            <a class="inline-flex items-center justify-between w-full p-1 text-base text-purple-700 hover:text-purple-900 dark:hover:text-purple-800 dark:text-purple-800 uppercase cursor-pointer" data-tooltip-target="editsm-tooltip" @click="editCatergory(banner.catergory)">
                                <edit-icon class="h-6 w-6 sm:h-4 sm:w-4 hover:h-7 hover:w-7 hover:sm:h-5 hover:sm:w-5"></edit-icon>
                            </a>
                            <div id="editsm-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 uppercase">
                                Edit {{ banner.catergory.name }}
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <a class="inline-flex items-center justify-between w-full p-1 text-base text-teal-700 hover:text-teal-900 dark:hover:text-teal-800 dark:text-teal-800 uppercase cursor-pointer" data-tooltip-target="bannersm-tooltip" @click="editBanner(banner.catergory)">
                                <photo-icon class="h-6 w-6 sm:h-4 sm:w-4 hover:h-7 hover:w-7 hover:sm:h-5 hover:sm:w-5"></photo-icon>
                            </a>
                            <div id="bannersm-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 uppercase">
                                Edit Banner {{ banner.catergory.name }}
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <a class="inline-flex items-center justify-between w-full p-1 text-base text-rose-700 hover:text-rose-900 dark:hover:text-rose-800 dark:text-rose-800 uppercase cursor-pointer" data-tooltip-target="deletesm-tooltip" @click="deleteCatergory(banner.catergory)">
                                <delete-icon class="h-6 w-6 sm:h-4 sm:w-4 hover:h-7 hover:w-7 hover:sm:h-5 hover:sm:w-5"></delete-icon>
                            </a>
                            <div id="deletesm-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 uppercase">
                                Delete {{ banner.catergory.name }}
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    </figcaption>
                </figure> 
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    // Import Swiper components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { EffectFade, Navigation, Controller, Scrollbar, Pagination, Autoplay } from "swiper";

    // Import Swiper styles
    import "swiper/css/effect-fade";
    import "swiper/css/controller";
    import "swiper/css/scrollbar";
    import "swiper/css/pagination";
    import 'swiper/css';
    // import './css/swipe.css';

    export default {
        props: [
            'banners',
            'admin'
        ],

        data() {
            return {
                windowWidth: '',
                mySwiperClass: '',
                mySwiperCards: 0,
                mySwiperCardsTV: 0,
            }
        },

        components: {
            Swiper,
            SwiperSlide,
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

        mounted() {
            this.$nextTick(function () {
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
                        this.mySwiperClass = 'swiper-xs-show w-full';
                        this.mySwiperCards = 2;
                        this.mySwiperCardsTV = 2;
                        break;
                    case (x < 1024):
                        this.mySwiperClass = 'swiper-mid-show w-full';
                        this.mySwiperCards = 4;
                        this.mySwiperCardsTV = 4;
                        break;
                    case (x < 2400):
                        this.mySwiperClass = 'swiper-xl-show w-full';
                        this.mySwiperCards = 6;
                        this.mySwiperCardsTV = 5;
                        break;
                }
            },

            loaded() {
                this.isloading = false;
            },

            getCatergories() {
                axios.get('/api/getCatergoriesMain/')
                    .then(
                        ({ data }) => {
                            this.catergories = data[0];
                            this.catergoriesTV = data[1];
                            this.banners = data[2];
                            this.loaded();
                        });
            },

            reload() {
                axios.get('/api/getProducts/')
                    .then(
                        ({ data }) => {
                            this.products = data[0];
                            this.stuff = data[1];
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