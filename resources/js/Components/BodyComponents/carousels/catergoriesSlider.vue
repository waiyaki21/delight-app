<template>
    <div class="mx-auto">
        <productSlider :key="latestKey" :latestKey="latestKey" :products="catergory.in_stock_products" :state="true"
            :slidesPerView="[mySwiperCards]" :class="[mySwiperClass]" />
    </div>
</template>

<script>

    import productSlider from "./productSlider.vue";

    export default {
        props: [
            'catergory',
            'latestKey',
            'mySwiperCards',
            'mySwiperClass',
        ],
        components: {
            productSlider
        }
    };
</script>
