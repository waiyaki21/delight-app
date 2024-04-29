<template>
    <div>
        <flash 
            ref             ="childComponentRef"
        ></flash>
        <loading-body
            v-if="isloading == true"
        ></loading-body>
        <div class="container bg-blueGray-50 dark:bg-gray-900 max-h-full" v-else>

        </div>
    </div>
</template>

<script>
    import flash                  from '../AlertComponents/flash-simple.vue';
    export default {
        props: [

        ],

        data() {
            return {
                // load 
                isloading: true,
            }
        },

        components: {
            flash
        },

        beforeMount() {
            this.isloading = true;
        },

        methods: {
            loaded() {
                this.isloading = false;
            },
        }
    }
</script>