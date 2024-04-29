<template>
    <!-- body  -->
    <div class="relative overflow-x-auto m-1 bg-gray-50 border border-gray-100 rounded p-1" :id="index" v-show="showInfo" :aria-labelledby="index">
        <section class="w-full flex-col">
            <!-- info  -->
            <div class="inline-flex justify-end w-full" role="group" v-if = "this.admin == '1'">
                <button type="button" class="inline-flex items-center px-4 py-2 text-lg uppercase font-medium text-black bg-white hover:bg-black border border-black hover:text-white hover:shadow focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 rounded-md mx-2" @click="deliverOrder(shipping)" v-if="shipping.shipping_delivered == 0">
                    <i class="fas fa-check mx-2"></i>
                    Mark as Delivered
                </button>
                <button type="button" class="inline-flex items-center px-4 py-2 text-lg uppercase font-medium text-black bg-white hover:bg-black border border-black hover:text-white hover:shadow focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 cursor-not-allowed rounded-md mx-2" v-else>
                    <i class="fas fa-check mx-2"></i>
                    Delivered
                </button>
                <button type="button" class="inline-flex items-center px-4 py-2 text-lg uppercase font-medium text-black bg-white  hover:bg-black hover:text-white border border-t border-b border-black focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white hover:shadow dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 rounded-md mx-2">
                    <i class="fas fa-save mx-2"></i>
                    Save As PDF
                </button>
            </div>
            <!-- shipping status  -->
            <h2 class="text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col">
                <p class="text-black uppercase text-xl inline-flex justify-between w-full">Shipping Status:  
                    <span class="text-warning uppercase underline" v-if="shipping.shipping_delivered == 0"> In Transit <i class="fas fa-truck px-2"></i></span>
                    <span class="text-success uppercase underline" v-else> Delivered <i class="fas fa-thumbs-up px-2"></i></span>
                </p>
                <p class="text-black uppercase text-xl inline-flex justify-between w-full">Shipping Delivery:  
                    <span class="text-primary uppercase underline"> {{ shipping.shipping_location }}.</span>
                </p>
                <p class="text-black uppercase text-xl inline-flex justify-between w-full" v-if="shipping.shipping_delivered == 0">Deliver by:  
                    <span class="text-danger uppercase underline">{{ formatDate(shipping.delivery_date) }}: {{ fromDate(shipping.delivery_date) }}.</span>
                </p>
                <p class="text-black uppercase text-xl" v-else>Delivered On:  
                    <span class="text-success uppercase underline">{{ formatDate(shipping.delivered_on) }}: {{ fromDate(shipping.delivered_on) }}.</span>
                </p>
            </h2>
        </section>

        <hr class="border-b-2 border-gray-700 rounded-md my-2 w-4/5 mx-auto">

        <table class="w-full text-base text-left text-gray-500 dark:text-gray-400 nav-xs-hidden">
            <thead class="text-xl text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 font-medium underline text-start">
                        Product.
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium underline text-start xs-hidden">
                        Price.
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium underline text-start xs-hidden">
                        Quantity.
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium underline text-start">
                        Total.
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium underline text-start">
                        Delivered.
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-transparent border-b dark:bg-transparent dark:border-gray-700" v-for="(item, index) in products">
                    <th scope="row" class="row px-4 py-3 font-normal text-xl text-gray-900 whitespace-nowrap dark:text-white">
                        <div class="">
                            <router-link :to="'/product_show/' + item.product_id"><img class="max-w-full h-16 w-16 mx-2 rounded-md hover:shadow-md" :src="item.thumbnail_path" :alt="item.name"></router-link>
                        </div>
                        <div class="uppercase underline text-xl">
                            <router-link :to="'/product_show/'+item.product_id">{{ item.name }}</router-link> 
                        </div>
                    </th>
                    <td class="p-1 uppercase font-normal text-lg text-gray-900 xs-hidden">
                        ksh {{ Number(item.price).toLocaleString() }} 
                    </td>
                    <th scope="row" class="px-4 py-3 font-normal text-lg text-gray-900 whitespace-nowrap dark:text-white xs-hidden">
                        {{ item.quantity }} Items
                    </th>
                    <td class="p-1 uppercase font-normal text-lg text-gray-900 xs-hidden">
                        ksh {{  Number(item.total_price).toLocaleString() }}
                    </td>
                    <td class="p-1 uppercase font-normal text-lg text-gray-900 nav-xs-show">
                        {{ item.quantity }} @ ksh {{ Number(item.price).toLocaleString() }} = ksh {{ Number(item.total_price).toLocaleString() }}
                    </td>
                    <td class="p-1 uppercase font-normal text-xl text-gray-900 xs-hidden">
                        <span class="text-success uppercase underline mx-4" v-if="item.delivered == 1">
                            <i class="fas fa-check"></i>
                        </span>
                        <span class="text-danger uppercase underline mx-4" v-else>
                            <i class="fas fa-times"></i>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="w-full text-base text-left text-gray-500 dark:text-gray-400 nav-xs-show">
            <thead class="text-lg text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400" style="width: 100% !important;display: inline-table;">
                <tr>
                    <th scope="col" class="px-6 py-3 underline text-center font-medium">
                        Product.
                    </th>
                    <th scope="col" class="px-6 py-3 underline text-center font-medium">
                        Total.
                    </th>
                    <th scope="col" class="px-6 py-3 underline text-center font-medium">
                        Delivered.
                    </th>
                </tr>
            </thead>
            <tbody style="width: 100% !important;display: inline-table;">
                <tr class="bg-transparent border-b dark:bg-transparent dark:border-gray-700" v-for="(item, index) in products">
                    <th scope="row" class="row px-4 py-3 font-normal text-xl text-gray-900 whitespace-nowrap dark:text-white">
                        <div class="">
                            <router-link :to="'/product_show/' + item.product_id"><img class="max-w-full h-8 w-8 rounded-md m-2" :src="item.thumbnail_path" :alt="item.name"></router-link>
                        </div>
                        <div class="uppercase underline text-xl xs:text-base">
                            <router-link :to="'/product_show/'+item.product_id">
                                {{ item.name }}
                            </router-link> 
                        </div>
                    </th>
                    <td class="p-1 uppercase font-normal text-lg text-gray-900">
                        <div class="flex-col">
                            {{ item.quantity }} @ ksh {{ Number(item.price).toLocaleString() }}
                            <br>
                            <span>= ksh {{ Number(item.total_price).toLocaleString() }}</span>
                        </div>
                    </td>
                    <td scope="row" class="row px-4 py-3 font-normal text-xl text-gray-900 whitespace-nowrap dark:text-white">
                        <div class="uppercase underline text-xl xs:text-base">
                            <span class="text-success text-xl uppercase underline mx-1" v-if="item.delivered == 1" title="Item Delivered">
                                <i class="fas fa-check"></i>
                            </span>
                            <span class="text-danger text-xl uppercase underline mx-1" v-else title="Item Not Yet Delivered">
                                <i class="fas fa-times"></i>
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import moment from 'moment';
    
    export default {
        props: [
            'products',
            'index',
            'shipping',
            'admin'
        ],

        data() {
            return {
                // load 
                isloading: true,
                showInfo: false,
            }
        },

        beforeMount() {
            this.isloading = true;
        },

        methods: {
            loaded() {
                this.isloading = false;
            },

            show() {
                this.showInfo = !this.showInfo;
            },

            deliverOrder(shipping) {
                axios.get('/shipping/deliver/'+shipping.id)
                    .then(
                    	({data}) => {
                            let message = "Order Successfully Delivered!"
                    		this.$emit('flashreload', [message, 'bg-green-100']);
                            this.$emit('delivered');
                    });
            },

            // get diff for humans time
            fromDate(date) {
                return moment(date).fromNow()
            },
            
            // get formatted time
            formatDate(date) {
                return moment(date).format("ddd, Do MMM YYYY")
            },
        }
    }
</script>