<template>
    <div>
        <flash 
            ref             ="childComponentRef"
        ></flash>
        <loading-body
            v-if="isloading == true"
        ></loading-body>
        <div class="container bg-blueGray-50 dark:bg-gray-900 max-h-full" v-else>
            <h2 class="text-black uppercase text-4xl mt-4 mb-1 flex justify-between border-b border-gray-600 w-full">
                {{ catergory.name }} Products.
                <div class="flex">
                    <list-icon :class="['mx-2 h-6 w-6', this.listActive]" title="Arrange Products in Lists" @click="orderList"></list-icon>
                    <cards-icon :class="['mx-2 h-6 w-6', this.cardActive]" title="Arrange Products in Cards" @click="orderCard"></cards-icon>
                </div>
            </h2>
            <h2 class="text-black uppercase text-base mb-1 flex">
                ( {{ Number(catergory.in_stock_products.length).toLocaleString() }} Products)
            </h2>
            <!-- catergory products  -->
            <!-- rows  -->
            <div class="max-w-md mx-auto my-2 bg-white hover:shadow overflow-hidden md:max-w-2xl border border-gray-200" v-for="product in catergory.in_stock_products" v-if="showList">
                <div class="flex">
                    <div class="md:shrink-0 py-2">
                        <a :href="'/product_show/'+product.id">  
                            <img class="" :src="product.thumbnail_path" :alt="'Delight Electronics ' +product.name" style="width: 240px;height: 180px;" v-if="catergory.name == 'TVs'">
                            <img class="object-cover" :src="product.thumbnail_path" :alt="'Delight Electronics ' +product.name" style="width: 220px;height: 220px;" v-else>
                        </a>
                    </div>
                    <div class="p-4">
                        <div class="flex">
                            <a :href="'/catergory/'+product.catergory_id" class="bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white hover:underline">
                                {{ catergory.name }}
                            </a>
                            <a :href="'/brand/'+product.brand_id" class=" bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white hover:underline">
                                {{ product.brand.name }}
                            </a>
                        </div>
                        <a :href="'/product_show/'+product.id" class="text-xl font-normal text-gray-700 hover:text-black dark:text-white hover:underline uppercase">
                            {{ product.name }}
                        </a>
                        <p class="">
                            <span class="text-2xl font-bold uppercase text-gray-900 dark:text-white">ksh {{ Number(product.price).toLocaleString() }}</span>
                        </p>
                        <a :href="'/product_show/'+product.id" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-1 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex items-center px-auto justify-between w-full">
                            Add To cart
                            <shopping-icon class="h-6 w-6 mx-2"></shopping-icon>
                        </a>
                    </div>
                </div>
            </div>

            <!-- cards  -->
            <div class="row justify-center" v-if="showCard">
                <div class="col-sm-6 m-2 bg-white border border-gray-200 hover:shadow dark:bg-gray-800 dark:border-gray-700 item-card" v-for="product in catergory.in_stock_products">
                    <a :href="'/product_show/'+product.id" class="flex justify-center">
                        <img class="py-2" :src="product.thumbnail_path" :alt="'Delight Electronics ' +product.name" />
                    </a>
                    <hr class="width-hr mx-auto mb-1 border-b border-blueGray-200" />
                    <div class="p-5">
                        <a :href="'/product_show/'+product.id">
                            <h5 class="text-2xl font-normal text-gray-500 hover:text-black dark:text-white hover:underline uppercase">
                                {{ product.name }}
                                <br>
                                <div class="flex">
                                    <a :href="'/catergory/'+product.catergory_id" class="bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white hover:underline">
                                        {{ catergory.name }}
                                    </a>
                                    <a :href="'/brand/'+product.brand_id" class=" bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white hover:underline">
                                        {{ product.brand.name }}
                                    </a>
                                </div>
                            </h5>
                        </a>
                        <p class="mb-2">
                            <span class="text-2xl font-bold uppercase text-gray-900 dark:text-white">ksh {{ Number(product.price).toLocaleString() }}</span>
                        </p>
                        <a :href="'/product_show/'+product.id" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-1 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex items-center px-auto justify-between w-full">
                            Add To cart
                            <shopping-icon class="h-6 w-6 mx-2"></shopping-icon>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- footer  -->
    <footer-body></footer-body>
    <!-- end footer  -->
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

                //page info
                showList: true,
                showCard: false,
                cardActive: '',
                listActive: '',

                // dataset 
                catergory: {}
            }
        },

        components: {
            flash,
        },

        beforeMount() {
            this.isloading = true;
            this.getCatergory();
        },

        methods: {
            loaded() {
                this.isloading = false;
            },

            getCatergory() {
                let catergory_id = this.$route.params.id;
                axios.get('/api/getCatergory/'+ catergory_id)
                    .then(
                    	({data}) => {
                            this.catergory     = data;
                            this.orderList();
                            this.loaded();

                    });
            },

            orderList() {
                this.showCard = false;
                this.showList = true;
                this.cardActive = 'text-gray-500 cursor-pointer';
                this.listActive = 'text-black cursor-not-allowed';  
            },

            orderCard() {
                this.showCard = true;
                this.showList = false; 
                this.cardActive = 'text-black cursor-not-allowed';
                this.listActive = 'text-gray-500 cursor-pointer';  
            },
        }
    }
</script>