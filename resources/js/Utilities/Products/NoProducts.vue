<template>
    <div class="w-full flex-col space-y-2">
        <section v-if="user.admin">
            <h2 class="text-[2.5rem] text-blue-800 underline decoration-blue-900 uppercase text-center py-4 font-semibold">
                NO PRODUCTS IN STOCK NOW, PLEASE ADD MORE!
            </h2>
        </section>
        <section>
            <h2 class="text-[4rem] text-red-800 underline decoration-red-900 underline-offset-8 uppercase text-center py-4 font-semibold">
                OOPS! SORRY😞
            </h2>
            <h2 class="text-[2.5rem] text-red-800 underline decoration-red-900 uppercase text-center py-4 font-semibold">
                NO PRODUCTS ON SALE NOW, PLEASE COME BACK LATER!
            </h2>
        </section>

        <hr class="width-hr mx-auto mb-4 border-b-2 border-red-500" />
    </div>
</template>

<script>
    export default {
        props: [
            'user'
        ]
    }
</script>