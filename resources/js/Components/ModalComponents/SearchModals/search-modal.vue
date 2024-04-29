<template>
    <div id="search-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center items-center flex bg-white h-full">
        <div class="relative w-full h-full max-w-7xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white dark:bg-gray-700">
                <button type="button" class="absolute top-3 right-5 text-gray-900 bg-transparent hover:bg-black hover:text-white text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white z-10" @click="closeModal">
                    <times-icon class="w-10 h-10" @click="closeModal"/>
                </button>
                <div class="px-2 py-6 lg:px-8">
                    <form @keyup.enter="enterClicked(fields.search)">
                        <div class="flex">
                            <div class="relative w-full">
                                <input type="search" name="search" v-model="fields.search" id="search-dropdown" class="flex uppercase p-5 w-full z-20 text-5xl text-gray-600 bg-transparent border-0 border-b-2 focus:ring-0 border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" style="border-bottom-width: 5px;margin-top: 60px; border-top-width: 0px; border-left-width: 0px; border-right-width: 0px;" placeholder="Search" required>

                                <a :href="'/search/'+fields.search" class="absolute top-2 right-0 p-2 text-2xl font-medium bg-teal-700 text-white rounded shadow border border-black inline-flex justify-between" style="margin-top: 85px;">
                                    SEARCH
                                </a>
                            </div>
                        </div>
                    </form>
                    <!-- <hr/>
                    <div class="bg-blueGray-50 dark:bg-gray-900 max-h-full">
                        <TailwindPagination
                            :data="allproducts"
                            @pagination-change-page="getProductsPage"
                        />
                        <div class="relative overflow-x-auto">
                            <h3 class="text-lg text-center text-danger my-4 uppercase underline" v-if="filteredProducts.length == 0">No Such Product</h3>
                            <table class="w-full text-base text-left text-gray-500 dark:text-gray-400" v-if="filteredProducts.length > 0">
                                <thead class="text-base text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-1 py-3 underline text-start">
                                            Item.
                                        </th>
                                        <th scope="col" class="px-1 py-3 underline text-start">
                                            Price.
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-transparent border-b dark:bg-transparent dark:border-gray-700 hover:bg-gray-300" v-for="(product, index) in filteredProducts">
                                        <th scope="row" class="inline-flex px-1 py-3 font-normal text-base text-gray-900 whitespace-nowrap dark:text-white">
                                            <div class="mx-2">
                                                <a :href="'/product_show/'+product.id">   
                                                <img class="h-auto max-w-full" :src="product.thumbnail.path" :alt="product.name" style="height: 60px;width: 60px;"></a>
                                            </div>
                                            <div class="uppercase underline text-lg">
                                                <router-link :to="'/product_show/'+product.id">{{ product.name }}</router-link> 
                                                <br>
                                                <div style="padding: 4px;">
                                                    <a :href="'/catergory/'+product.catergory_id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                                    {{ product.catergory.name }}
                                                    </a>
                                                    <a :href="'/brand/'+product.brand_id" class=" bg-white text-black text-sm px-1 mx-1 underline uppercase">
                                                        {{ product.brand.name }}
                                                    </a>
                                                </div>
                                            </div>
                                        </th>
                                        <td class="p-1 uppercase font-normal text-lg text-gray-900" @click="viewProduct(product.id)">
                                            ksh {{ Number(product.price).toLocaleString() }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>         -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import { TailwindPagination }       from 'laravel-vue-pagination';
    export default {
        props: [
            'catfiles'
        ],

        data() {
            return {
                products: [],
                allproducts: [],
                search: '',
                refreshKey: false,
                fields: {}
            }
        },

        components: {
            // TailwindPagination
        },

		mounted() {
			// if (localStorage.productInfo) {
				// let searchproducts = localStorage.getItem('productsInfo');
				// console.log('"I find your lack of faith disturbing" - Darth Vader, A new hope, 1977');
        		// this.products = JSON.parse(searchproducts);
			// } else {
				// console.log('Good! Use your aggressive feelings, boy. Let the hate flow through you! — Emperor Palpatine / Darth Sidious, Return of the Jedi, 1983');
				// this.getInitialProductsData();
				// this.dataStorageFirst();
			// }
		},

        created() {
            // this.getProducts();
            // if (localStorage.productsInfo) {
				// this.presetData();
			// } else {
				// console.log('"Hello There!" — "Obi Wan Kenobi, Revenge of the Sith" 2002');
				// this.getInitialPupilsData();
			// } 
        },

        computed: {
        	// filteredProducts: function() {
        	// 	this.refreshKey;
        	// 	return this.products.filter((product) => {
        	// 		return product.name.match(this.search);
        	// 	});
        	// }
        },

        methods: {
            closeModal() {
				this.$emit('closemodal');
			},

            enterClicked(search) {
                // console.log(search);
                // window.location = `http://localhost:8000/search/`+search;
                window.location = `https://www.delightelectronics.co.ke/search/` + search;
            },

            searchTest() {
                axios.get('/searchTest/'+ this.fields.search)
                    .then(
                    	({data}) => {
                    		this.products       = data;
                    });
            },

            getProducts() {
                axios.get('/api/search/getProducts/')
                    .then(
                    	({data}) => {
                    		this.products       = data.data;
                            this.allproducts    = data;
                    });
            },

            getProductsPage(page) {
		    	if (typeof page === 'undefined') {
                    page = 1;
                }
		    	axios.get('/api/search/getProducts/products?page='  + page)
                     .then(
                        ({data}) => {
                            this.products       = data.data;
                            this.allproducts    = data;
                        });
		    	let message = 'PAGE ' + page + ' LOADED SUCCESSFULLY!';
		    	this.$emit('pageload', message);
		    },

            getCatergory(id) {
                console.log('pkaaaaaaaaaaah'+id);
            },

            viewProduct(id) {
                console.log(id);
                this.$router.push({ path: '/' })
            },

        			// IF DATA IS PRELOADED
        	// first
        	getInitialProductsData() {
        		console.log('“No, I am your father.” — Darth Vader The Empire Strikes Back," 1980');
        		// this.pupils = [];
        		this.refreshKey = !this.refreshKey;
        		axios.get('/api/search/getProducts/')
		    		.then(
                        ({data}) => {
                            this.products = data.data;
                            this.allproducts    = data;
                        });
        	},

        	// second
        	dataStorageFirst() {
                axios.get('/api/search/getProducts/')
                	.then(({data}) => {
                		let info = data.data
                		localStorage['productsInfo'] = JSON.stringify(info)
                	})
                	this.presetData();
        	},

                    			// IF DATA IS ALREADY PRELOADED
        	// first
        	presetData() {
        		console.log('“Fear is the path to the dark side … fear leads to anger … anger leads to hate … hate leads to suffering.” — "Master Yoda The Phantom Menace," 1999');
        		//  let searchproducts = localStorage.getItem('productsInfo');
        		 setTimeout(this.resetPresetData, 20000);
        	},

            // reset saved data
        	resetPresetData() {
        		console.log('“No! Try not. Do. Or do not. There is no try.” — "Master Yoda The Empire Strikes Back," 1980');
        		localStorage.removeItem('productsInfo');
                this.getInitialProductsData();
				this.dataStorageSecond();
        	},

            // second
        	dataStorageSecond() {
                axios.get('/api/search/getProducts/')
                	.then(({data}) => {
                		let info = data.data
                		localStorage['productsInfo'] = JSON.stringify(info)
                	})
                // let searchproducts = localStorage.getItem('productsInfo');
        	},
        }
    }
</script>