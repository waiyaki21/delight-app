<template>
    <div>
        <!-- list images large screens -->
        <div class="list-img">
            <div class="mx-auto inline-flex">
                <bannerSlider v-for="banner in banners" :key="banner.id" :banner="banner" :isAdmin="admin == '1'"
                    :editCatergory="editCatergory" :editBanner="editBanner" :deleteCatergory="deleteCatergory" />
            </div>
        </div>
        <!-- carousel images  small screens-->
        <swiper 
            :loop="banners.length == 1 ? false : true" 
            :spaceBetween="8" 
            :centeredSlides="true" 
            :autoplay="{
                delay: 7500,
                disableOnInteraction: true,
            }" 
            :pagination="{
                clickable: true,
            }" 
            @swiper="onSwiper" 
            @slideChange="onSlideChange" 
            :modules="modules" 
            :slidesPerView="1"
            class="carousel-img mx-auto">
            <swiper-slide v-for="banner in banners" style="height: auto !important;">
                <figure
                    class="relative max-w-sm transition-all duration-300 cursor-pointer rounded-lg border-2 border-teal-500 hover:border-teal-800 bg-white mx-auto" style="height: 100%;">
                    <a :href="'/catergory/' + banner.catergory_id" style="height: 100%;">
                        <img class="h-full"
                            :src="banner.path" :alt="banner.name" style="height: 100%;">
                    </a>
                    <bannerActions
                        :banner="banner"
                        :isAdmin="admin == '1'"
                        :editCatergory="editCatergory"
                        :editBanner="editBanner"
                        :deleteCatergory="deleteCatergory"
                    />
                </figure>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import bannerSlider     from "./bannerSlider.vue";
    import bannerActions    from "./bannerActions.vue";

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
            bannerSlider,
            bannerActions
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