<template>
    <div class="row mx-2 bg-blueGray-50 dark:bg-gray-900 max-h-full">
        <shippingTabs
        ></shippingTabs>
    </div>

    <!-- footer  -->
    <footer-body></footer-body>
    <!-- end footer  -->
</template>

<script>
    import shippingTabs     from './tabs/shippingTabs.vue';

    export default {
        props: [

        ],

        data() {
            return {
                // auth datasets 
                user:           {},
                logged:         '',
                admin:          '',

                // shipping datasets 
                allShippings:       [],
                shippings:          [],
                delivered:          [],
            }
        },

        components: {
            shippingTabs
        },

        beforeMount() {

        },

        // created() {
        //     this.getUser();
        //     this.getShippings();
        // },

        methods: {

        }
    }
</script>