<template>
    <swiper :key="latestKey" :loop="products.length == 1 ? false : true" :spaceBetween="10" :centeredSlides="products.length < mySwiperCards ? false : true"
        :autoplay="{
            delay: 5000,
            disableOnInteraction: true,
        }" :slidesPerView="[products.length < mySwiperCards ? products.length : mySwiperCards]" :slidesPerColumn="products.length == 1 ? 1 : 4" :navigation="true"
        @swiper="onSwiper" @slideChange="onSlideChange" :modules="modules" :class="[mySwiperClass]">
        <swiper-slide v-for="product in products" class="hover:border-b-2 hover:border-cyan-800 pb-2">
            <a class="group w-full max-w-sm bg-white" :href="'/product_show/' + product.id">
                <img class="my-1 rounded-lg border group-hover:border-gray-500 group-hover:shadow-md"
                    :src="product.thumbnail_path" :alt="`${product.name} image for sale on Delight Electronics`"
                    v-if="state" />
                <img :class="['my-1 rounded-lg border group-hover:border-gray-500 group-hover:shadow-md']"
                    :src="product.thumbnail_path" :alt="`${product.name} image for sale on Delight Electronics`"
                    v-else />
                <div class="px-2 pb-4 text-center">
                    <a :href="'/product_show/' + product.id">
                        <h5
                            class="text-xl md:text-2xl font-medium text-gray-900 group-hover:text-cyan-900 dark:text-white underline uppercase w-full justify-center overflow-x-scroll overflow-ellipsis whitespace-nowrap no-scrollbar">
                            {{ product.name }}
                        </h5>
                    </a>
                    <div class="flex items-center my-0.5">
                        <div class="inline-flex w-full justify-center space-x-1 p-1 underline uppercase">
                            <a :href="'/catergory/' + product.catergory_id"
                                class="bg-white text-black text-xs px-1 mx-1 hover:cursor-pointer group-hover:underline">
                                {{ state ? product.brand.catergory.name : product.catergory?.name }}
                            </a>
                            <a :href="'/brand/' + product.brand.id"
                                class="bg-white text-black text-xs px-1 mx-1 hover:cursor-pointer group-hover:underline">
                                {{ product.brand?.name }}
                            </a>
                        </div>
                    </div>
                    <div class="flex items-center my-1.5">
                        <span
                            class="inline-flex w-full justify-center text-xl md:text-2xl text-gray-900 dark:text-white group-hover:text-cyan-900">
                            KSH {{ Number(product.price).toLocaleString() }}
                        </span>
                    </div>

                    <div class="flex items-center justify-between space-x-2">
                        <a
                            class="text-center uppercase text-pink-900 bg-white border border-pink-300 focus:outline-none hover:bg-pink-900 hover:text-white focus:ring-1 focus:ring-pink-200 font-normal text-lg sm:text-sm p-2 mb-0.5 dark:bg-pink-800 dark:text-white dark:border-pink-600 dark:hover:bg-pink-700 dark:hover:border-pink-600 dark:focus:ring-pink-700 cursor-pointer shadow-sm hover:shadow-md rounded-full inline-flex items-center px-auto w-fit justify-center">
                            <favorite-icon class="h-6 w-6 sm:h-4 sm:w-4"></favorite-icon>
                        </a>
                        <a
                            class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none group-hover:bg-gray-900 group-hover:text-white focus:ring-1 focus:ring-gray-200 font-normal text-lg sm:text-sm p-2 mb-0.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:group-hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow-sm group-hover:shadow-md rounded-lg inline-flex items-center px-auto w-full justify-center">
                            Add to cart
                            <shopping-icon class="h-6 w-6 sm:h-4 sm:w-4 mx-1"></shopping-icon>
                        </a>
                    </div>
                </div>
            </a>
        </swiper-slide>
    </swiper>
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
            'latestKey',
            'products',
            'state',
            'mySwiperCards',
            'mySwiperClass',
        ],
        components: {
            Swiper,
            SwiperSlide
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
    };
</script>