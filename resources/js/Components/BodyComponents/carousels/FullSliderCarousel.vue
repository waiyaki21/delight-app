<template>
    <div v-for="catergory in cats">
        <div v-if="catergory.in_stock_products.length > 3"> 
            <div class="flex flex-col justify-center">
                <p class="text-center text-black underline uppercase">{{ catergory.name }}</p><br>
                <a :href="'/catergory/' + catergory.id" class="text-center text-muted underline uppercase text-sm cursor-pointer">see all.</a>
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
                        <a class="max-w-xs m-1 my-4 bg-white rounded-lg dark:bg-gray-800 cursor-pointer" :href="'/product_show/' + product.id">
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
                                                <a :href="'/catergory/' + product.catergory_id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                                {{ product.brand.catergory.name }}
                                                </a>
                                                <a :href="'/brand/' + product.brand.id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
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
            'cats',
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
                    Scrollbar,
                    Autoplay
                ],
            };
        },
    }
</script>