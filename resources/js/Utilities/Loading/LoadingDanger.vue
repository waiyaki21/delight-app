<template>
    <div role="status" class="flex flex-col w-full mx-auto p-2 gap-2 md:gap-4 divide-y dark:divide-rose-500 rounded-md divide-rose-500 my-2">
        <div :class="this.bodyClass" v-if="info1">
            <div :class="this.bigClass"></div>
            <div :class="this.smallClass"></div>
            <div :class="this.smallClass"></div>
            <div :class="this.smallClass"></div>
        </div>
        <div :class="this.bodyClass" v-if="info2">
            <div :class="this.bigClass"></div>
            <div :class="this.smallClass"></div>
            <div :class="this.smallClass"></div>
            <div :class="this.smallClass"></div>
        </div>
        <div :class="this.bodyClass" v-if="info3">
            <div :class="this.bigClass"></div>
            <div :class="this.smallClass"></div>
            <div :class="this.smallClass"></div>
            <div :class="this.smallClass"></div>
        </div>
    </div>
    <p class="text-lg text-center text-rose-600 dark:text-rose-600 animate-pulse my-2 uppercase boldened">Loading...</p>
</template>

<script>
    import { nextTick }         from 'vue';

    export default {
        data() {
            return {
                info3: false,
                info2: false,
                info1: true,

                bodyClass   : 'items-center justify-between animate__animated animate__fadeInDown grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-2 py-2',
                smallClass : 'h-2.5 bg-rose-300 rounded-full dark:bg-rose-700 col-span-1 md:col-span-2',
                bigClass    : 'h-2.5 bg-rose-300 rounded-full dark:bg-rose-600 w-full md:mb-2.5 animate-pulse col-span-2 md:col-span-4'
            }
        },

        mounted() {
            nextTick(() => {
                this.cycle1();
            })
        },

        methods: {
            cycle(step) {
                // Reset all states to false
                this.info1 = false;
                this.info2 = false;
                this.info3 = false;

                // Update states based on the current step
                if (step >= 1) this.info1 = true;
                if (step >= 2) this.info2 = true;
                if (step >= 3) this.info3 = true;

                // Define timing and next step
                let timeout = 1000;
                if (step === 2) timeout = 1500;
                if (step === 3) timeout = 2000;

                // Schedule the next cycle
                setTimeout(() => this.cycle((step % 3) + 1), timeout);
            },

            // Start the cycle with step 1
            cycle1() {
                this.cycle(1);
            }
        } 
    }
</script>