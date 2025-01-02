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
                <div class="px-2 pb-4 text-left">
                    <a :href="'/product_show/'+product.id">
                        <h5 class="font-normal hover:text-gray-700 text-black dark:text-white uppercase">
                            <span class="font-medium text-gray-900 group-hover:text-cyan-900 dark:text-white underline uppercase w-full justify-start overflow-x-scroll overflow-ellipsis whitespace-nowrap no-scrollbar hover:underline text-2xl">{{ product.name }}</span>
                            <br>
                            <div class="flex justify-start">
                                <a :href="'/catergory/'+product.catergory_id" :class="[this.infoBtn]">
                                    {{ state ? product.brand.catergory.name : product.catergory?.name }}
                                </a>
                                <a :href="'/brand/'+product.brand_id" :class="[this.infoBtn]">
                                    {{ product.brand.name }}
                                </a>
                            </div>
                        </h5>
                    </a>
                    <div class="flex items-start my-1.5">
                        <span
                            class="inline-flex w-full justify-start text-xl md:text-2xl text-gray-900 dark:text-white group-hover:text-cyan-900">
                            KSH {{ Number(product.price).toLocaleString() }}
                        </span>
                    </div>

                    <div class="flex items-center justify-between space-x-2">
                        <a
                            :class="['text-center uppercase cursor-pointer rounded-full inline-flex items-center px-auto w-fit justify-center focus:outline-none font-normal text-lg sm:text-sm p-2 mb-0.5 focus:ring-1 bg-transparent']" @click="handleChildClick($event, product.id)" v-if="this.logged">
                            
                            <favSolid-icon :class="['h-6 w-6 sm:h-4 sm:w-4 text-pink-900']" v-if="product.is_favorited"></favSolid-icon>
                            <favorite-icon :class="['h-6 w-6 sm:h-4 sm:w-4 text-pink-900']" v-else></favorite-icon>
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
            'user',
            'logged',
            'admin'
        ],

        components: {
            Swiper,
            SwiperSlide
        },

        data() {
            return {
                infoBtn: 'bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white rounded-md hover:shadow-md'
            }
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

        methods: {
            handleChildClick(event, productId) {
                // console.log('pkaaaaaaaah');
                
                event.stopPropagation(); // Prevent bubbling to parent <a> tag
                event.preventDefault();  // Prevent the browser's default navigation
                this.productFavorite(productId); // Execute the desired logic
            },

            productFavorite(id) {
                // console.log('pkaaaaaaaah2');
                // if (this.logged) {
                //     axios.get('/favorites/' + id)
                //     .then(
                //         ({ data }) => {
                //             this.message = data[0];
                //             this.body    = data[1];
                //             this.$emit('flash', this.message, this.type);
                //             // console.log('pkaaaaaaaah2', this.message);
                //         });
                // } else {
                //     this.message = 'Create an account first!'
                //     this.$emit('flash', this.message, 'danger');
                // }
                axios.get('/favorites/switch/' + id)
                    .then(
                        ({ data }) => {
                            this.message = data[0];
                            this.body    = data[2];
                            this.$emit('favorites', this.message, this.body);
                            // console.log('pkaaaaaaaah2', this.message, this.body);
                        });
            }
        }
    };
</script>