<template>
    <div class="col-span-1 md:col-span-5 p-2 px-0">
        <div id="productImage-carousel" class="relative border-[1.5px] border-gray-400 shadow hover:shadow-lg m-2 rounded-md bg-white">
            <!-- Viewer wrapper -->
            <div v-viewer>
                <!-- Carousel wrapper -->
                <swiper
                    :loop="true"
                    :spaceBetween="30"
                    :effect="'fade'"
                    :navigation="true"
                    :autoplay="{
                        delay: 4500,
                        disableOnInteraction: true,
                    }"
                    :pagination="{
                        clickable: true,
                    }"
                    :modules="modules"
                    class="mySwiper"
                >
                    <swiper-slide v-for="image in images" :key="image.name">
                    <!-- delete image & tooltip -->
                    <button
                        v-if="admin"
                        type="button"
                        :class="this.deleteBtn"
                        @click="$emit('delete-image', image)"
                        :title="'Delete ' + image.name + ' ?'"
                    >
                        DELETE IMAGE
                        <delete-icon class="h-4 w-4 ml-2"></delete-icon>
                    </button>
                    <img
                        :src="`${image.path}`"
                        :alt="image.name + ' Delight Electronics'"
                        class="img-swipe bg-white cursor-pointer rounded-md" title="click to view"
                    />
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- component -->
        <viewer class="w-full grid grid-cols-6 gap-0.5 max-h-36 overflow-y-scroll no-scrollbar">
            <img v-for="(image, index) in images" :key="index" :src="image.path" :alt="image.name"  class="col-span-1 cursor-pointer w-[75px] shadow hover:shadow-md rounded-md border border-gray-400" title="click to view"/>
        </viewer>
    </div>
</template>

<script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';

    import "swiper/css/effect-fade";
    import "swiper/css/controller";
    
    import { EffectFade, Navigation, Controller, Pagination, Autoplay } from "swiper";

    // Import Swiper styles
    import 'swiper/css';
    import '../../BodyComponents/css/swipe.css';

    export default {
        props: {
            images: {
                type: Array,
                required: true,
            },
            modules: {
                type: Array,
                required: true,
            },
            admin: {
                type: String,
                default: '0',
            },
        },

        components: {
            Swiper,
            SwiperSlide,
        },

        setup() {
            const onSwiper = (swiper) => {
                console.log(swiper);
            };
            const onSlideChange = () => {
                console.log('slide change');
            };

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

        data() {
            return {
                deleteBtn: 'fixed inline-flex items-center p-1 text-base border border-red-800 hover:border-red-800 font-normal text-center bg-red-800 hover:bg-red-800 rounded dark:bg-transparent dark:hover:bg-transparent ml-4 top-4 left-6 cursor-pointer text-white hover:text-white z-20 shadow px-2 py-1'
            }
        }
    };
</script>
