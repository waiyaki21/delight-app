<template>
    <div id="root" style="padding-top: 30px;">
        <flash 
            ref             ="childComponentRef"
        ></flash>
        <loading-body
            v-if="isloading == true"
        ></loading-body>
        <div class="container bg-blueGray-50 dark:bg-gray-900 max-h-full" v-else>
            <h2 class="text-black underline uppercase text-5xl my-4">View cart ({{ Number(this.cartItemsNo).toLocaleString() }} Items. )</h2>
            <hr>

            <div class="relative overflow-x-auto">
                <table class="w-full text-base text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-base text-gray-700 uppercase bg-transparent">
                        <tr>
                            <th scope="col" class="px-4 py-3 rounded-l-lg uppercase underline">
                                Product name.
                            </th>
                            <th scope="col" class="px-4 py-3 uppercase underline">
                                Qty.
                            </th>
                            <th scope="col" class="px-4 py-3 rounded-r-lg uppercase underline">
                                Price.
                            </th>
                            <th scope="col" class="px-4 py-3 rounded-r-lg uppercase underline">
                                Options.
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white dark:bg-gray-800" v-for="(item, index) in cartItems">
                            <th scope="row" class="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <router-link :to="'/product_show/'+item.product_id">
                                    <img class="w-10 h-10 rounded hover:shadow" :src="item.thumbnail_path" :alt="item.product_name">
                                </router-link>
                                <div class="pl-3">
                                    <div class="text-2xl font-normal uppercase underline">
                                        <router-link :to="'/product_show/'+item.product_id">
                                            {{ index + 1 }}. {{ item.product_name }}
                                        </router-link>
                                    </div>
                                    <div class="font-normal text-gray-500 uppercase">ksh {{ Number(item.product_price).toLocaleString() }}</div>
                                </div>  
                            </th>
                            <td class="px-2 py-4">
                                <!-- counter  -->
                                <div class="inline-flex rounded-md shadow-sm" role="group">
                                    <button type="button" :class="[this.btnClass, this.minusBtnClass]" @click="minusQuantity(item)" v-if="quantity(item) >= 1">
                                        <i class="fas fa-minus fa-xs px-1"></i>
                                    </button>
                                    <button type="button" class="inline-flex items-center px-2 py-2 text-base font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 cursor-auto">
                                        {{ quantity(item) }}
                                    </button>
                                    <button type="button" :class="[this.btnClass, this.addBtnClass]" @click="addQuantity(item)" v-if="quantity(item) > 1 || quantity(item) < item.product_stock">
                                        <i class="fas fa-plus fa-xs px-1"></i>
                                    </button>
                                </div>
                            </td>
                            <td class="px-2 py-4 text-black">
                                ksh {{ productTotal(item) }}
                            </td>
                            <td class="px-2 py-4 text-black">
                                <a class="text-center uppercase text-red-600 font-normal text-base p-1 cursor-pointer" @click="removeFromCart(item)">
                                    Remove
                                    <i class="fas fa-times px-1"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="font-normal uppercase underline text-2xl text-gray-900 dark:text-white">
                            <th scope="row" class="px-2 py-3">Total.</th>
                            <td class="px-2 py-3">{{ Number(this.cartItemsNo).toLocaleString() }} Items.</td>
                            <td class="px-2 py-3">ksh {{ Number(this.cartTotal).toLocaleString() }}.</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="relative">
                <router-link :to="'/checkout/'+user.id" class="w-full block text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow">
                    Checkout
                </router-link>
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
                // loading 
                isloading: true,

                // datasets
                user: {},
                cartItems: [],
                cartTotal: "",
                cartItemsNo: "",

                // field data 
                fields: {},

                // class
                btnClass: "mx-1 inline-flex items-center px-1 py-1 text-xs font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700",
                addBtnClass: "",
                minusBtnClass: "",
            }
        },

        components: {
            flash
        },

        beforeMount() {
            this.isloading = true;
            this.getUser();
            this.getCartItems();
        },

        methods: {
            loaded() {
                this.isloading = false;
                setTimeout(this.scrollTo, 600);
            },

            scrollTo() {
                window.scrollTo(0, 1);
                window.scrollTo(0, 0);
            },

            getUser() {
                axios.get('/getUser/')
                    .then(
                    	({data}) => {
                    		this.user   = data[0]
                    });
            },

            getCartItems() {
                let id = this.$route.params.id;
                axios.get('/api/getCartIndex/'+ id)
                    .then(
                        ({data}) => {
                            this.cartItems      = data[0];
                            this.cartTotal      = data[1];
                            this.cartItemsNo    = data[2];
                            this.loaded();
                    });
            },  
            
            productTotal(item) {
                let prod = item.product_quantity * item.product_price;
                let number = Number(prod).toLocaleString();
                return number;
            },

            quantity(item) {
                let qty = item.product_quantity;
                if (item.product_quantity == item.product_stock ) {
                    this.addBtnClass = "cursor-not-allowed";
                } else {
                    this.addBtnClass = "cursor-pointer";
                }
                if (item.product_quantity <= 1 ) {
                    this.minusBtnClass = "cursor-not-allowed";
                } else {
                    this.minusBtnClass = "cursor-pointer";
                }
                return qty;
            },

            addQuantity(item){
                if (item.product_quantity == item.product_stock ) {
                    this.flashMessage = 'Maximum No of Stock Reached!';
                    this.$refs.childComponentRef.flash([this.flashMessage,'bg-red-100 dark:bg-red-900']);
                } else {
                    let no = Number(item.product_quantity);
                    let num = no + 1;
                    this.fields.product_quantity = num;
                    // console.log(num);
                    this.editQty(item.id);
                }
            },

            minusQuantity(item){
                if (item.product_quantity == 1 ) {
                    this.flashMessage = 'Minimum No. Reached!';
                    this.$refs.childComponentRef.flash([this.flashMessage,'bg-red-100 dark:bg-red-900']);
                } else {
                    let no = item.product_quantity;
                    let num = no - 1;
                    this.fields.product_quantity = num;
                    // console.log(num);
                    this.editQty(item.id);
                }
            },

            editQty(id) {
                axios.put('/cart/edit/'+id, this.fields)
                    .then(response => {
                        this.getCartItems();
                        this.flashMessage = 'Quantity Edit Success!';
                        this.$refs.childComponentRef.flash([this.flashMessage,'bg-green-100 dark:bg-green-900']);
                })
            },

            removeFromCart(item) {
                if(confirm('ARE YOU SURE YOU WANT TO REMOVE: ' + item.product_name + ' FROM THE CART?'))
			   	{
                    axios.get('/cart/remove/'+item.product_id)
                        .then(response => {
                            this.getCartItems();
                            let message = 'Item removed from cart!';
                            this.$emit('cartinfo', this.user);
                            this.$refs.childComponentRef.flash([message, 'bg-red-100 dark:bg-red-900']);
                        })
                }
            },
        }
    }
</script>