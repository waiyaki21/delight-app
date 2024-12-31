<template>
    <div class="mx-auto">
        <productSlider :key="latestKey" :latestKey="latestKey" :products="catergory.in_stock_products" :state="true"
            :slidesPerView="[mySwiperCards]" :class="[mySwiperClass]" :user = "this.user" :logged = "this.logged" :admin = "this.admin" @favorites="reload"/>
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
            'user',
            'logged',
            'admin'
        ],
        components: {
            productSlider
        },
        methods: {
            reload(message) {
                this.$emit('reload', message);
            }
        }
    };
</script>
