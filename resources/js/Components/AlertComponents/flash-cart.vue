<template>
    <div id="addCart-alert" :class="[this.alertClass, this.classType]" role="alert" v-show="show">
      <div class="">
        <div class="w-full inline-flex items-center justify-between">  
            <div class="mt-2 mb-4 text-sm text-black">
                <h4 class="text-2xl mb-0 font-medium underline dark:text-white uppercase">
                    {{ body }}
                </h4>
            </div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 text-gray-900 hover:text-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-gray-400 p-1.5 inline-flex h-8 w-8 dark:bg-gray-700 dark:text-gray-300  dark:hover:text-white mb-2" @click="hide">
                <times-icon class="h-8 w-8 text-black"></times-icon>
            </button>
        </div>
        <div class="row row-no-space">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-sm text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 underline text-start">
                            Product.
                        </th>
                        <th scope="col" class="px-6 py-3 underline text-start">
                            Qty.
                        </th>
                        <th scope="col" class="px-6 py-3 underline text-start">
                            Total Price.
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-transparent border-b dark:bg-transparent dark:border-gray-700" v-for="(item, index) in cartItems">
                        <th scope="row" class="p-2 font-normal text-lg text-gray-900 whitespace-nowrap dark:text-white inline-flex">
                            <router-link :to="'/product_show/'+item.product_id"><img class="w-6 h-6 rounded" :src="item.thumbnail_path" :alt="item.product_name"></router-link>
                            <div class="pl-2">
                                <div class="text-lg uppercase underline">
                                    {{ index + 1 }}. 
                                    <router-link :to="'/product_show/'+item.product_id">
                                        {{ item.product_name }}
                                    </router-link>
                                </div>
                                <div class="font-normal text-gray-500 uppercase">ksh {{ Number(item.product_price).toLocaleString() }}</div>
                            </div> 
                        </th>
                        <th scope="row" class="p-2 font-normal text-lg text-gray-900 whitespace-nowrap dark:text-white text-center">
                            {{ Number(item.product_quantity).toLocaleString() }} 
                        </th>
                        <td class="p-1 uppercase font-medium text-lg text-center">
                            ksh {{ Number(item.product_total).toLocaleString() }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="font-medium text-gray-900 dark:text-white">
                        <th scope="row" class="px-6 py-3 text-xl uppercase underline">
                            Total
                        </th>
                        <td class="px-6 py-3 text-xl uppercase text-black underline">
                            {{ Number(this.cartItemsNo).toLocaleString() }} Items
                        </td>
                        <td class="px-6 py-3 text-xl uppercase text-black underline">
                            ksh {{ Number(this.cartTotal).toLocaleString() }}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="row row-no-space">
            <div class="col-md-6">
                <router-link :to="'/checkout/'+user.id" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium shadow text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer uppercase block text-center w-full">
                    Go To Checkout
                    <i class="fas fa-arrow-right pl-1"></i>
                </router-link>
            </div>
            <div class="col-md-6">
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium shadow text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer block uppercase text-center w-full" @click="hide">
                    Continue Shopping
                </button>
            </div>
        </div>
      </div>
    </div>
</template>
   
<script>
    export default {
        props: [
            'user'
        ],

        data() {
            return {
                show        : false,
                body        : '',
                classType   : 'bg-teal-200 dark:bg-teal-900 border border-emerald-700',
                product     : {},
                cartItems   : {},
                cartTotal   : "",
                cartItemsNo : "",
                alertClass  : 'spacing card-shadow2 flex p-4 alert my-4'
            }
        },

        created() {
            this.getcart();
        },

        methods: {
            flash(message) {
                this.body       = message[0]
                this.product    = message[1]
                this.classType  = message[2]
                this.show       = true

                this.getcart();

                setTimeout(() => {
                    this.hide();
                },20000)
            },

            hide() {
                this.show = false;
            },

            getcart() {
                axios.get('/api/getCart/'+ this.user.id)
                    .then(
                        ({data}) => {
                            this.cartItems      = data[0];
                            this.cartTotal      = data[1];
                            this.cartItemsNo    = data[2];
                    });
            }
        }
    }
</script>