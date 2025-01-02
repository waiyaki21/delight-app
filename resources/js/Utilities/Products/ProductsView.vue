<template>
    <div class="w-full mx-auto">
        <!-- found products  -->
        <div class="col pr-0">
            <!-- lists  -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2" v-if="showList">
                <div class="group col-span-1 w-full mx-auto my-2 bg-white overflow-hidden border border-gray-200 rounded-lg shadow hover:shadow-md"
                    v-for="product in products">
                    <div class="grid grid-cols-4 gap-2">
                        <div class="col-span-2 md:shrink-0">
                            <a :href="'/product_show/' + product.id">
                                <img class="" :src="product.thumbnail_path" :alt="'Delight Electronics ' + product.name"
                                    style="width: 240px;height: 180px;" v-if="product.catergory.name == 'TVs'">
                                <img class="object-cover" :src="product.thumbnail_path"
                                    :alt="'Delight Electronics ' + product.name" style="width: 220px;height: 220px;"
                                    v-else>
                            </a>
                        </div>
                        <div class="col-span-2 px-2 md:p-4">
                            <div class="w-full inline-flex justify-end space-x-4">
                                <a :href="'/catergory/' + product.catergory_id" :class="[this.infoBtn]">
                                    {{ product.catergory.name }}
                                </a>
                                <a :href="'/brand/' + product.brand_id" :class="[this.infoBtn]">
                                    {{ product.brand.name }}
                                </a>
                            </div>
                            <a :href="'/product_show/' + product.id" :class="this.nameClassGrid">
                                {{ product.name }}
                            </a>
                            <p class="w-full inline-flex justify-end">
                                <span :class="this.priceClass">ksh {{
                                    Number(product.price).toLocaleString() }}</span>
                            </p>
                            <div class="flex items-center justify-between space-x-2">
                                <a :class="this.favBtn" @click="handleChildClick($event, product.id)"
                                    v-if="this.logged">
                                    <favSolid-icon :class="['h-6 w-6 sm:h-4 sm:w-4 text-pink-900']"
                                        v-if="product.is_favorited"></favSolid-icon>
                                    <favorite-icon :class="['h-6 w-6 sm:h-4 sm:w-4 text-pink-900']"
                                        v-else></favorite-icon>
                                </a>
                                <a :href="'/product_show/' + product.id" :class="this.cartBtn">
                                    Add To cart
                                    <shopping-icon class="h-6 w-6 mx-1" v-show="!showBtn"></shopping-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- cards  -->
            <div :class="[gridClass]" v-else>
                <div class="group m-1 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 item-card rounded-lg shadow hover:shadow-xl"
                    v-for="product in products">
                    <a :href="'/product_show/' + product.id" class="flex justify-center">
                        <img class="rounded-t-lg" :src="product.thumbnail_path"
                            :alt="'Delight Electronics ' + product.name" style="height: 200px; width: 100% !important;"
                            v-if="product.catergory.name == 'TVs'" />
                        <img class="rounded-t-lg" :src="product.thumbnail_path"
                            :alt="'Delight Electronics ' + product.name" v-else />
                    </a>
                    <hr class="width-hr mx-auto mb-1 border-b border-blueGray-200" />
                    <div class="p-2">
                        <a :href="'/product_show/' + product.id">
                            <h5 class="font-normal hover:text-gray-700 text-black dark:text-white uppercase">
                                <span :class="this.nameClassCard">{{ product.name }}</span>
                                <br>
                                <div class="flex">
                                    <a :href="'/catergory/' + product.catergory_id" :class="[this.infoBtn]">
                                        {{ product.catergory.name }}
                                    </a>
                                    <a :href="'/brand/' + product.brand_id" :class="[this.infoBtn]">
                                        {{ product.brand.name }}
                                    </a>
                                </div>
                            </h5>
                        </a>
                        <p :class="this.priceClass">
                            ksh {{ Number(product.price).toLocaleString() }}
                        </p>
                        <div class="flex items-center justify-between space-x-2">
                            <a :class="this.favBtn" @click="handleChildClick($event, product.id)" v-if="this.logged">
                                <favSolid-icon :class="['h-6 w-6 sm:h-4 sm:w-4 text-pink-900']"
                                    v-if="product.is_favorited"></favSolid-icon>
                                <favorite-icon :class="['h-6 w-6 sm:h-4 sm:w-4 text-pink-900']" v-else></favorite-icon>
                            </a>
                            <a :href="'/product_show/' + product.id" :class="this.cartBtn">
                                Add To cart
                                <shopping-icon class="h-6 w-6 mx-1" v-show="!showBtn"></shopping-icon>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            showList: Boolean, 
            showBtn: Boolean,
            products: Object,
            gridClass: String,
            logged: Boolean
        },

        data() {
            return {
                // load 
                isloading: true,

                infoBtn: 'bg-white text-black text-sm p-1 mx-1 uppercase border border-gray-300 hover:bg-black hover:text-white rounded-md hover:shadow-md', 
                cartBtn: 'text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none group-hover:bg-gray-900 group-hover:text-white focus:ring-1 focus:ring-gray-200 font-normal text-lg sm:text-sm p-2 mb-0.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:group-hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow-sm group-hover:shadow-md rounded-lg inline-flex items-center px-auto w-full justify-center',
                favBtn: 'text-center uppercase cursor-pointer rounded-full inline-flex items-center px-auto w-fit justify-center focus:outline-none font-normal text-lg sm:text-sm p-2 mb-0.5 focus:ring-1 bg-transparent',

                nameClassGrid: 'w-full inline-flex justify-end text-2xl font-normal hover:text-gray-700 text-black dark:text-white hover:underline uppercase',
                nameClassCard: 'hover:underline text-2xl',

                priceClass: 'text-2xl font-semibold uppercase text-gray-900 dark:text-white'
            }
        },

        methods: {
            handleChildClick(event, productId) {
                // console.log('pkaaaaaaaah');

                event.stopPropagation(); // Prevent bubbling to parent <a> tag
                event.preventDefault();  // Prevent the browser's default navigation
                this.productFavorite(productId); // Execute the desired logic
            },

            productFavorite(id) {
                // console.log('pkaaaaaaaah2');
                // if (this.logged) {
                //     axios.get('/favorites/' + id)
                //     .then(
                //         ({ data }) => {
                //             this.message = data[0];
                //             this.body    = data[1];
                //             this.$emit('flash', this.message, this.type);
                //             // console.log('pkaaaaaaaah2', this.message);
                //         });
                // } else {
                //     this.message = 'Create an account first!'
                //     this.$emit('flash', this.message, 'danger');
                // }
                axios.get('/favorites/switch/' + id)
                    .then(
                        ({ data }) => {
                            this.message = data[0];
                            this.body    = data[2];
                            this.$emit('favorites', this.message, this.body);
                            // console.log('pkaaaaaaaah2', this.message, this.body);
                        });
            }
        }
    };
</script>
