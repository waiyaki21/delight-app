<template>
    <div id="addCart-alert" :class="[this.alertClass, this.classType]" role="alert" v-show="show">
      <div class="">
        <div class="w-full inline-flex items-center justify-between">  
            <div class="w-4/5">
                <div class="mt-2 mb-4 text-sm text-black">
                    <h4 class="text-2xl mb-0 font-medium underline dark:text-white uppercase">
                        {{ body }}
                    </h4>
                </div>
            </div>
            <div class="w-1/5">
                <button type="button" class="ml-auto -mx-1.5 -my-1.5 text-gray-900 hover:text-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-gray-400 p-1.5 inline-flex h-8 w-8 dark:bg-gray-700 dark:text-gray-300  dark:hover:text-white mb-2" @click="hide">
                    <times-icon class="h-8 w-8 text-black"></times-icon>
                </button>
            </div>
        </div>
        <div class="row row-no-space">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 underline text-start">
                            Product.
                        </th>
                        <th scope="col" class="px-6 py-3 underline text-start">
                            Qty.
                        </th>
                        <th scope="col" class="px-6 py-3 underline text-start">
                            Price.
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-transparent border-b dark:bg-transparent dark:border-gray-700" v-for="(item, index) in products">
                        <th scope="row" class="uppercase px-6 py-3 font-normal text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            {{ index + 1}}. <span class="underline text-xl">{{ item.name }}</span> 
                        </th>
                        <th scope="row" class="px-6 py-3 font-normal text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            {{ Number(item.quantity).toLocaleString() }} 
                        </th>
                        <td class="p-1 uppercase font-normal text-lg">
                            ksh {{ Number(item.total_price).toLocaleString() }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="font-medium text-gray-900 dark:text-white">
                        <th scope="row" class="px-6 py-3 text-xl uppercase underline">
                            Total
                        </th>
                        <td class="px-6 py-3 text-xl uppercase text-black underline">
                            {{ Number(this.shipping.shipping_items).toLocaleString() }} Items
                        </td>
                        <td class="px-6 py-3 text-xl uppercase text-black underline">
                            ksh {{ Number(this.shipping.shipping_total).toLocaleString() }}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="row row-no-space">
            <div class="col-md-6">
                <router-link :to="this.link" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium shadow text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer uppercase block text-center">
                    Shipping Info.
                    <i class="fas fa-arrow-right pl-1"></i>
                </router-link>
            </div>
            <div class="col-md-6">
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium shadow text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer block uppercase text-center w-full" @click="hide">
                    Close
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
                shipping    : {},
                products    : [],
                shippingT   : {},
                productsT   : [],
                link        : '',
                alertClass  : 'spacing card-shadow2 flex p-4 alert my-4'
            }
        },

        mounted() {
            
        },

        methods: {
            flash(message) {
                this.body       = message[0]
                this.classType  = message[1]
                this.shipping   = message[2]
                this.products   = message[3]
                this.link       = message[4]
                this.show       = true
            },

            hide() {
                this.show = false;
            }
        }
    }
</script>