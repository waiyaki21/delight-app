<template>
    <div>
        <loading-body v-if="isloading"></loading-body>
        <div class="mx-auto bg-gray-100 dark:bg-gray-900 max-h-full mt-24 pt-2 w-[90%]" v-else>
            <h2 class="text-black uppercase text-4xl mt-4 mb-1 flex justify-between border-b border-gray-600 w-full">
                {{ info }}.
                <div class="flex">
                    <list-icon :class="[this.toggleBtn]" title="Arrange Products in Lists" @click="orderList"
                        v-show="!this.showList"></list-icon>
                    <cards-icon :class="[this.toggleBtn]" title="Arrange Products in Cards" @click="orderCard"
                        v-show="this.showList"></cards-icon>
                </div>
            </h2>
            <h2 class="text-black uppercase text-base mb-1 flex">
                ( {{ Number(products.length).toLocaleString() }} Products)
            </h2>
            <!-- products grid/card view  -->
            <no-products v-if="!products" :user="user"></no-products>
            <productsView :products="products" :show-list="this.showList" :show-btn="this.showBtn" :grid-class="this.gridClass" :logged="logged" @favorites="reloadWithMessage" :is-loading="this.isLoading" v-else/>
        </div>
    </div>

    <!-- footer  -->
    <footer-body></footer-body>
    <!-- end footer  -->
</template>

<script>
import { computed }     from 'vue';
import { useRoute }     from 'vue-router';
import useProductView   from '../../Composables/useProductView';
import productsView     from '../../Utilities/Products/ProductsView.vue';

export default {
    props: ['user', 'logged'],
    components: { productsView },
    setup(props, { emit }) {
        const route = useRoute();
        // Extract the last word from route.name and lowercase it
        const routeName = route.name ? route.name.split(' ').pop().toLowerCase() : '';
        let apiEndpoint = `/api/getProducts/${routeName}`;;  // Default endpoint

        // Conditionally set routeId based on route name
        const routeId   = route.name === 'View Latest' ? 0 : route.params.id;

        const {
            isLoading,
            info,
            products,
            gridClass,
            btnClass,
            showList,
            showBtn,
            toggleBtn,
            orderList,
            orderCard,
            fetchProducts,
            updatedProducts,
            reloadProducts,
            getWindowWidth,
        } = useProductView(apiEndpoint);

        // Fetch initial products
        fetchProducts(routeId);

        // Add event listener for window resize
        window.addEventListener('resize', () => {
            getWindowWidth();
        });

        // Modify products with updatedProducts
        const processedProducts = computed(() => updatedProducts(products.value, props.user));

        // Method to reload products and show a message
        const reloadWithMessage = (message, body) => {
            reloadProducts(message, routeId);
            flashShow(message, body);
        };

        // Define the flashShow method to emit a flash message
        const flashShow = (message, body) => {
            emit('flash', message, body);
        };

        return {
            isLoading,
            info,
            products: processedProducts, // Use processedProducts in your template
            gridClass,
            btnClass,
            showList,
            showBtn,
            reloadWithMessage,
            toggleBtn,
            orderList,
            orderCard
        };
    }
};
</script>