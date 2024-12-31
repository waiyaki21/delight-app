<template>
    <div style="padding-top: 20px;">
        <flash 
            ref             ="childComponentRef"
        ></flash>
        <loading-body
            v-if="isloading == true"
        ></loading-body>
        <div class="mx-auto bg-blueGray-100 dark:bg-gray-900 max-h-full mt-24 w-[90%]" v-else>
            <h2 class="text-black uppercase text-4xl mt-4 mb-1 flex justify-between border-b border-gray-600 w-full">
                Search Products
                <div class="flex">
                    <filter-icon :class="['mx-2 h-6 w-6 cursor-pointer']" title="Filter Products in Lists" v-show = "showBtn" @click="filterShow"></filter-icon>
                    <list-icon :class="['mx-2 h-6 w-6', this.listActive]" title="Arrange Products in Lists" @click="orderList" v-show="!this.showList"></list-icon>
                    <cards-icon :class="['mx-2 h-6 w-6', this.cardActive]" title="Arrange Products in Cards" @click="orderCard" v-show="this.showList"></cards-icon>
                </div>
            </h2>
            <h2 class="text-black uppercase text-base mb-1 flex justify-between">
                <p>( {{ Number(products.length).toLocaleString() }} Products)</p>
            </h2>
            <div class="w-full mx-auto">
                <!-- found products  -->
                <div class="col pr-0">
                    <!-- rows  -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2" v-if="showList">
                        <div class="group col-span-1 w-full mx-auto my-2 bg-white overflow-hidden border border-gray-200 rounded-lg shadow hover:shadow-md" v-for="product in products">
                            <div class="grid grid-cols-4 gap-2">
                                <div class="col-span-2 md:shrink-0">
                                    <a :href="'/product_show/'+product.id">  
                                        <img class="" :src="product.thumbnail_path" :alt="'Delight Electronics ' +product.name" style="width: 240px;height: 180px;" v-if="product.catergory.name == 'TVs'">
                                        <img class="object-cover" :src="product.thumbnail_path" :alt="'Delight Electronics ' +product.name" style="width: 220px;height: 220px;" v-else>
                                    </a>
                                </div>
                                <div class="col-span-2 px-2 md:p-4">
                                    <div class="w-full inline-flex justify-end space-x-4">
                                        <a :href="'/catergory/'+product.catergory_id" :class="[this.infoBtn]">
                                            {{ product.catergory.name }}
                                        </a>
                                        <a :href="'/brand/'+product.brand_id" :class="[this.infoBtn]">
                                            {{ product.brand.name }}
                                        </a>
                                    </div>
                                    <a :href="'/product_show/'+product.id" class="w-full inline-flex justify-end text-2xl font-normal hover:text-gray-700 text-black dark:text-white hover:underline uppercase">
                                        {{ product.name }}
                                    </a>
                                    <p class="w-full inline-flex justify-end">
                                        <span class="text-2xl font-bold uppercase text-gray-900 dark:text-white">ksh {{ Number(product.price).toLocaleString() }}</span>
                                    </p>
                                    <a :href="'/product_show/'+product.id" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none group-hover:bg-gray-900 group-hover:text-white focus:ring-1 focus:ring-gray-200 font-normal text-lg sm:text-sm p-2 mb-0.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:group-hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow-sm group-hover:shadow-md rounded-lg inline-flex items-center px-auto w-full justify-center">
                                        Add To cart
                                        <shopping-icon class="h-6 w-6 mx-2"></shopping-icon>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- cards  -->
                    <div :class="[this.gridClass]" v-else>
                        <div class="group m-1 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 item-card rounded-lg shadow hover:shadow-xl" v-for="product in products">
                            <a :href="'/product_show/'+product.id" class="flex justify-center">
                                <img class="rounded-t-lg" :src="product.thumbnail_path" :alt="'Delight Electronics ' +product.name" style="height: 200px; width: 100% !important;" v-if="product.catergory.name == 'TVs'"/>
                                <img class="rounded-t-lg" :src="product.thumbnail_path" :alt="'Delight Electronics ' +product.name" v-else/>
                            </a>
                            <hr class="width-hr mx-auto mb-1 border-b border-blueGray-200" />
                            <div class="p-2">
                                <a :href="'/product_show/'+product.id">
                                    <h5 class="font-normal hover:text-gray-700 text-black dark:text-white uppercase">
                                        <span class="hover:underline text-2xl">{{ product.name }}</span>
                                        <br>
                                        <div class="flex">
                                            <a :href="'/catergory/'+product.catergory_id" :class="[this.infoBtn]">
                                                {{ product.catergory.name }}
                                            </a>
                                            <a :href="'/brand/'+product.brand_id" :class="[this.infoBtn]">
                                                {{ product.brand.name }}
                                            </a>
                                        </div>
                                    </h5>
                                </a>
                                <p class="text-xl font-bold uppercase text-gray-900 dark:text-white">
                                    ksh {{ Number(product.price).toLocaleString() }}
                                </p>
                                <a :href="'/product_show/'+product.id" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none group-hover:bg-gray-900 group-hover:text-white focus:ring-1 focus:ring-gray-200 font-normal text-lg sm:text-sm p-2 mb-0.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:group-hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow-sm group-hover:shadow-md rounded-lg inline-flex items-center px-auto w-full justify-center">
                                    Add To cart
                                    <shopping-icon class="h-6 w-6 mx-1" v-show = "!showBtn"></shopping-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div> 
                
                <!-- search -->
                <searchfilter
                    v-show          = "showFilter"
                    v-bind:products = "products"
                    v-bind:maxprice = "maxprice"
                    v-bind:minprice = "minprice"
                    v-bind:search   = "searchParam"
                    @btnstate       = "btnShow"
                    @reloadprice    = "reloadprice"
                    @close          = "filterShow"
                ></searchfilter>
                <!-- search btn  -->
                <button type="button" :class="['flex justify-between z-10 items-center text-lg p-2 h-10 rounded-full shadow text-black hover:text-white bg-teal-700 hover:bg-black border-2 border-black hover:border-gray-600 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 dark:bg-gray-700 uppercase dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 fixed right-2', this.btnClass]" v-show = "showBtn" @click="filterShow">
                    Search Filter
                    <search-icon class="w-6 h-6"/>
                </button>
            </div>  
        </div>
    </div>

    <!-- footer  -->
        <!-- <footer-body></footer-body> -->
        <!-- end footer  -->
</template>

<script>
    import flash                  from '../AlertComponents/flash-simple.vue';
    import searchfilter           from './search-filter.vue';
    export default {
        props: [

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

                infoBtn: 'bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white rounded-md hover:shadow-md',
                cardActive:'text-black hover:text-cyan-600 cursor-pointer',
                listActive:'text-black hover:text-cyan-600 cursor-pointer' 
            }
        },

        components: {
            flash,
            searchfilter,
        },

        beforeMount() {
            this.isloading = true;
            this.getSearch();
        },

        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);
                //Init
                this.getWindowWidth()
            })
        },

        methods: {
            getWindowWidth(event) {
                this.windowWidth = document.documentElement.clientWidth;
                const x = this.windowWidth;
                switch (true) {
                    case (x < 767):
                        this.gridClass = 'grid grid-cols-1 gap-1';
                        this.btnClass = 'top-48';
                        this.showBtn = true;
                        this.orderList();
                        break;
                    case (x < 900):
                        this.gridClass = 'grid grid-cols-2 gap-2';
                        this.btnClass = 'top-48';
                        this.showBtn = true;
                        this.orderList();
                        break;
                    case (x < 1200):
                        this.gridClass = 'grid grid-cols-3 gap-2';
                        this.showBtn = false;
                        this.orderCard();
                        break;
                    case (x < 2400):
                        this.gridClass = 'grid grid-cols-4 gap-2';
                        this.showBtn = false;
                        this.orderCard();
                        break;
                }
            },

            loaded() {
                this.isloading = false;
            },

            getSearch() {
                let search = this.$route.params.id;
                this.searchParam = this.$route.params.id;
                axios.get('/api/search/'+ search)
                    .then(
                    	({data}) => {
                    		this.products    = data[0]
                            this.maxprice    = data[1]
                            this.minprice    = data[2]
                            this.getWindowWidth();
                            this.loaded();
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
                this.products = newProds;
                let message = 'Products Reloaded';
                this.$refs.childComponentRef.flash([message, 'bg-green-100 dark:bg-green-900',]);
            }
        }
    }
</script>