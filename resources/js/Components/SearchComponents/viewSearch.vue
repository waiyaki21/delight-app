<template>
    <div>
        <loading-body v-if="isloading == true"></loading-body>
        <div class="mx-auto bg-gray-50 dark:bg-gray-900 max-h-full mt-24 pt-2 w-[90%]" v-else>
            <h2 class="text-black uppercase text-4xl mt-4 mb-1 flex justify-between border-b border-gray-600 w-full">
                Search Products
                <div class="flex">
                    <filter-icon :class="['mx-2 h-6 w-6 cursor-pointer']" title="Filter Products in Lists"
                        v-show="showBtn" @click="filterShow"></filter-icon>
                    <list-icon :class="[this.toggleBtn]" title="Arrange Products in Lists"
                        @click="orderList" v-show="!this.showList"></list-icon>
                    <cards-icon :class="[this.toggleBtn]" title="Arrange Products in Cards"
                        @click="orderCard" v-show="this.showList"></cards-icon>
                </div>
            </h2>
            <h2 class="text-black uppercase text-base mb-1 flex justify-between">
                <p>( {{ Number(products.length).toLocaleString() }} Products)</p>
            </h2>
            <!-- products grid/card view  -->
            <productsView :products="products" :show-list="this.showList" :show-btn="this.showBtn"
                :grid-class="this.gridClass" :logged="logged" @favorites="reloadInfo" :is-loading="this.isLoading"/>
        </div>
    </div>

    <!-- footer  -->
    <footer-body></footer-body>
    <!-- end footer  -->
</template>

<script>
    import productsView           from '../../Utilities/Products/ProductsView.vue';
    import searchfilter           from './search-filter.vue';

    export default {
        props: [
            'user',
            'logged',
            'admin'
        ],

        data() {
            return {
                // load 
                isloading: true,
                products: [],
                maxprice: '',
                minprice: '',

                //page info
                showList: true,
                // showCard: false,
                showFilter: false,
                showBtn: false,
                gridClass: '',
                btnClass: '',

                //search parameters
                searchParam: '',

                toggleBtn: 'mx-2 h-6 w-6 text-black hover:text-cyan-600 cursor-pointer',
            }
        },

        components: {
            searchfilter,
            productsView
        },

        beforeMount() {
            this.isloading = true;
            this.getInfo();
        },

        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);
                //Init
                this.getWindowWidth()
            })
        },

        methods: {
            getWindowWidth() {
                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < 767) {
                    this.updateLayout('grid grid-cols-1 gap-1', 'top-48', true, this.orderList);
                } else if (this.windowWidth < 900) {
                    this.updateLayout('grid grid-cols-2 gap-2', 'top-48', true, this.orderList);
                } else if (this.windowWidth < 1200) {
                    this.updateLayout('grid grid-cols-3 gap-2', '', false, this.orderCard);
                } else if (this.windowWidth < 2400) {
                    this.updateLayout('grid grid-cols-4 gap-2', '', false, this.orderCard);
                }
            },

            updateLayout(gridClass, btnClass, showBtn, action) {
                this.gridClass = gridClass;
                this.btnClass = btnClass;
                this.showBtn = showBtn;
                action.call(this);
            },

            loaded() {
                this.isloading = false;
            },

            getInfo() {
                let search = this.$route.params.id;
                this.searchParam = this.$route.params.id;
                axios.get('/api/search/'+ search)
                    .then(
                    	({data}) => {
                    		this.products    = this.updatedProducts(data[0])
                            this.maxprice    = data[1]
                            this.minprice    = data[2]
                            this.getWindowWidth();
                            this.loaded();
                    });
            },

            reloadInfo(message) {
                this.flashShow(message);
                let search          = this.$route.params.id;
                this.searchParam    = this.$route.params.id;
                axios.get('/api/search/'+ search)
                    .then(
                    	({data}) => {
                    		this.products    = this.updatedProducts(data[0])
                            this.maxprice    = data[1]
                            this.minprice    = data[2]
                            this.getWindowWidth();
                            this.loaded();
                    });
            },

            // Add is_favorited to each product
            updatedProducts(infos) {
                if (!this.user) {
                    return infos; // If user is not available, return items without modification
                }
                // console.log(this.user.id);
                return infos.map(product => {
                    // Ensure user.id and favorite.user_id are both strings (or both numbers)
                    const isFavorited = Array.isArray(product.favorites) &&
                        product.favorites.some(favorite => String(favorite.user_id) === String(this.user.id));

                    return {
                        ...product,
                        is_favorited: isFavorited
                    };
                });
            },

            filterShow() {
                this.showFilter = !this.showFilter;
            },

            btnShow(state) {
                this.showBtn = state;
            },

            orderList() {
                this.showList = true;
            },

            orderCard() {
                this.showList = false;  
            },

            reloadprice(newProds) {
                this.products   = newProds;
                let message     = 'Products Reloaded';
                this.$emit('flash', message);
            },

            flashShow(message) {
                this.$emit('flash', message);
            }
        }
    }
</script>