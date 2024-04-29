<template>
    <!-- Carousel wrapper -->
    <div class="mx-auto row">
        <swiper
            :key                = "latestKey"
            :loop               = "true"
            :spaceBetween       = "10"
            :centeredSlides     = "true"
            :autoplay           = "{
                delay: 4500,
                disableOnInteraction: true,
            }"
            :slidesPerView      = "[this.cards]"
            :slidesPerColumn    = "5"
            :navigation         = "true"
            @swiper             = "onSwiper"
            @slideChange        = "onSlideChange"
            :modules            = "modules"
            :class              = "[this.class]"
        >
            <swiper-slide v-for="product in items" class="hover:border-b-2 hover:border-cyan-800 py-2">
                <a class="max-w-xs m-1 my-4 bg-white rounded-lg dark:bg-gray-800 cursor-pointer" :href="'/product_show/' + product.id">
                    <a>
                        <img class="py-4 my-2 rounded" :src="product.thumbnail_path" :alt="product.name + ' image for sale on Delight Electronics'" style="height: 200px;width: 275px;" v-if="product.catergory.name == 'TVs'"/>
                        <img class="p-1 rounded-lg" :src="product.thumbnail_path" :alt="product.name + ' image for sale on Delight Electronics'" style="height: 221.333; width:256.767;" v-else/>
                    </a>
                    <div class="p-1">
                        <div class="text-center flex flex-col row">
                            <div class="flex justify-center">
                                <p class="text-xl font-normal text-gray-500 hover:text-gray-900 dark:text-white underline uppercase overflow-x-scroll overflow-ellipsis whitespace-pre-wrap">
                                    {{ product.name }}.
                                </p>
                            </div>
                            <div class="flex flex-col justify-center row">
                                <div class="flex justify-center my-2 h-4 overflow-y-hidden">
                                    <a :href="'/catergory/' + product.catergory_id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                        {{ product.catergory.name }}
                                    </a>
                                    <a :href="'/brand/' + product.brand.id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                        {{ product.brand.name }}
                                    </a>
                                </div>
                                <div class="flex justify-center px-1 mx-2 my-1 h-4 row">
                                    <span class="text-2xl font-bold uppercase text-gray-900 dark:text-white">ksh {{ Number(product.price).toLocaleString() }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative flex justify-center mt-4">
                        <a class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium text-lg sm:text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex items-center px-auto">
                            Add to cart
                            <shopping-icon class="h-6 w-6 sm:h-4 sm:w-4 mx-2"></shopping-icon>
                        </a>
                    </div>
                </a>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    // Import Swiper components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { EffectFade, Navigation, Controller, Pagination, Autoplay } from "swiper";

    // Import Swiper styles
    import "swiper/css/effect-fade";
    import "swiper/css/controller";
    import "swiper/css/scrollbar";
    import "swiper/css/pagination";
    import 'swiper/css';
    // import './css/swipe.css';

    export default {
        props: [
            'items',
            'class',
            'cards'
        ],

        data() {
            return {

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
                    Autoplay
                ],
            };
        },
    }
</script>