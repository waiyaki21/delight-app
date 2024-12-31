<template>
    <!-- Carousel wrapper -->
    <div class="mx-auto">
        <productSlider :key="latestKey" :latestKey="latestKey" :products="items" :state="false"
            :slidesPerView="[this.cards]" :class="[this.class]" :user = "this.user" :logged = "this.logged" :admin = "this.admin" @favorites="reload"/>
    </div>
</template>

<script>
    import productSlider from "./productSlider.vue";

    export default {
        props: [
            'latestKey',
            'items',
            'class',
            'cards',
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
    }
</script>