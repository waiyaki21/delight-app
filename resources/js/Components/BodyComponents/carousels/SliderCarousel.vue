<template>
    <!-- Carousel wrapper -->
    <div class="mx-auto">
        <productSlider :key="latestKey" :latestKey="latestKey" :products="items" :state="false"
            :slidesPerView="[this.cards]" :class="[this.class]" />
    </div>
</template>

<script>
    import productSlider from "./productSlider.vue";

    export default {
        props: [
            'latestKey',
            'items',
            'class',
            'cards'
        ],

        components: {
            productSlider
        },
    }
</script>