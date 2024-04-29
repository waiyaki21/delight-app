<template>
    <div class=" dark:border-gray-700 dark:bg-gray-700">
        <div id="postShipping" :key="formKey">
            <!-- product details panel -->
            <div class="p-1 bg-white dark:bg-gray-700">
                <form @submit.prevent="submit">
                    <div class="row">
                        <!-- shipping delivery_id -->
                        <div class="col-md-12 mt-2">
                            <label for="delivery_id" v-if="errors && errors.delivery_id" :class="[formInfo.labelErrorclass]">Select Delivery Location <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="delivery_id" v-else :class="[formInfo.labelclass]">Select Delivery Location <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <select id="delivery_id" name="delivery_id" v-model="fields.delivery_id" :class="[formInfo.inputclass, 'option-font']" required placeholder="Choose Delivery Location">
                                <option selected>Choose Delivery Location</option>
                                <option v-for="delivery in deliveries" :value="delivery.id">{{ delivery.city }}: {{ delivery.estate }}: {{ delivery.apartment }} - {{ delivery.phone_number }}</option>
                            </select>
                            <p id="helper-text-explanation" v-if="errors && errors.delivery_id" :class="[formInfo.infoText]">{{ errors.delivery_id[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>	
                        </div>

                        <!-- cart items information -->
                        <div class="col-md-12 mt-2">
                            <label v-if="errors && errors.delivery_id" :class="[formInfo.labelErrorclass]">View Cart Information <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label v-else :class="[formInfo.labelclass]">View Cart Information <i :class="[formInfo.iconreloadclass]"></i></label>
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xl text-gray-700 uppercase bg-transparent dark:bg-transparent dark:text-gray-400 font-normal">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 underline text-start">
                                            Product.
                                        </th>
                                        <th scope="col" class="px-6 py-3 underline text-start">
                                            Qty.
                                        </th>
                                        <th scope="col" class="px-6 py-3 underline text-start xs-hidden">
                                            Stock Left.
                                        </th>
                                        <th scope="col" class="px-6 py-3 underline text-start">
                                            Price.
                                        </th>
                                        <th scope="col" class="px-6 py-3 underline text-start xs-hidden">
                                            Remove.
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-transparent border-b dark:bg-transparent dark:border-gray-700" v-for="(item, index) in cartitems">
                                        <th scope="row" class="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <router-link :to="'/product_show/'+item.product_id" class="hover:shadow">
                                                <img class="w-10 h-10 rounded" :src="item.thumbnail_path" :alt="item.product_name">
                                            </router-link>
                                            <div class="pl-3">
                                                <div class="text-2xl uppercase underline font-normal">
                                                    <router-link :to="'/product_show/'+item.product_id">
                                                        {{ index + 1 }}. {{ item.product_name }}
                                                    </router-link>
                                                </div>
                                                <div class="font-normal text-gray-500 uppercase">ksh {{ Number(item.product_price).toLocaleString() }}</div>
                                            </div>  
                                        </th>
                                        <!-- quantity  -->
                                        <td scope="row" class="px-6 py-3 font-normal text-3xl text-black whitespace-nowrap dark:text-white uppercase">
                                            <div class="flex flex-col w-full space-y">
                                                <span class="underline text-center">{{ Number(item.product_quantity).toLocaleString() }} Items</span>
                                                <!-- counter  -->
                                                <div class="inline-flex rounded-md shadow-sm" role="group">
                                                    <button type="button" :class="[this.btnClass, this.minusBtnClass]" @click="minusQuantity(item)" v-if="quantity(item) >= 1">
                                                        <i class="fas fa-minus fa-xs px-1"></i>
                                                    </button>
                                                    <button type="button" :class="[this.centerBtn]">
                                                        {{ quantity(item) }}
                                                    </button>
                                                    <button type="button" :class="[this.btnClass, this.addBtnClass]" @click="addQuantity(item)" v-if="quantity(item) > 1 || quantity(item) < item.product_stock">
                                                        <i class="fas fa-plus fa-xs px-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <!-- product stock info  -->
                                        <td scope="row" class="px-6 py-3 font-normal text-2xl whitespace-nowrap dark:text-white text-red-700 uppercase underline" v-if="item.product == null">
                                            Item Deleted
                                        </td>
                                        <td scope="row" class="px-6 py-3 font-normal text-2xl text-cyan-700 uppercase underline whitespace-nowrap dark:text-white" v-if="item.product_stock == '0'">
                                            Stock Finished
                                        </td>
                                        <td scope="row" class="px-6 py-3 font-normal text-2xl text-orange-500 whitespace-nowrap dark:text-white uppercase underline xs-hidden" v-if="item.product_stock != '0'">
                                            {{ Number(item.product_stock).toLocaleString() - quantity(item) }} Left
                                        </td>
                                        <td class="p-1 uppercase font-normal text-2xl text-black">
                                            ksh {{ Number(item.product_total).toLocaleString() }}
                                        </td>
                                        <td class="p-1 uppercase font-normal text-2xl text-black xs-hidden">
                                            <button type="button" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-red-800 hover:text-white font-normal text-base py-2 px-4 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-between" @click="removeFromCart(item)">
                                                Delete Item(s)
                                                <delete-icon class="mx-2 h-5 w-5"></delete-icon>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="text-gray-900 dark:text-white">
                                        <th scope="row" class="px-2 py-3 text-3xl uppercase underline">
                                            Total
                                        </th>
                                        <td class="px-2 py-3 text-3xl uppercase text-black underline">
                                            {{ Number(this.cartitemsno).toLocaleString() }} Items
                                        </td>
                                        <td></td>
                                        <td class="px-2 py-3 text-3xl uppercase text-black underline">
                                            ksh {{ Number(this.carttotal).toLocaleString() }}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>	
                        </div>

                        <!-- buttons -->
                        <div class="col-md-12 mt-2">
                            <button type="submit" :class="[formInfo.bluebtnClass]" @click="submitShipping">
                                {{ formInfo.buttoninfo}}  
                                <i :class="[formInfo.buttoninfoIcon, 'fa-1x m-1']"></i>
                            </button>
                        </div>
                    </div>      
                </form>
            </div>          
        </div>
    </div>
</template>

<script>
    // export test 
    import utilities        from '../utilities.js';

	export default{
		props:[
			'deliveries',
            'user',
            'id',
            'cartitems',
            'carttotal',
            'cartitemsno'
		],

		data() {
			return {
				// tabs settings
                formKey: true,
				
					// form settings
				//classes
                formInfo: [],

				//form
				fields: {},
                errors: {},

                // form submission
                formsuccess: false,
                flashMessage: "Shipping Order Successfully Created",

                //modal
                addModal: false,

                // class
                btnClass: "mx-1 inline-flex items-center px-1 py-1 text-xs font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 h-8 justify-center",
                centerBtn: 'inline-flex items-center px-2 py-2 text-base font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 cursor-auto h-8 justify-center',
                addBtnClass: "",
                minusBtnClass: "",
			}
		},

		created() {
            this.formFields();
		},

        mounted() {
            this.formInfo = utilities.loaded(this);
        },

		methods: {
            // submit Shipping
            submitShipping() {
                // submit the fields first
                this.errors = {};
                this.formInfo = utilities.loading(this);
                axios.post('/shipping/add', this.fields)
                    .then(response => {
                        this.$emit('shipping', response.data[2], response.data[3])
                        this.fields = {};
                        this.formFields();
                        this.formInfo = utilities.success(this);
                        setTimeout(this.reload, 10000);
                        this.formKey += 1;
                })
                    .catch(error => {
                    if (error.response.status === 422) {
                        this.formInfo = utilities.failed(this);
                        this.errors = error.response.data.errors || {};
                        this.$emit('failed');
                    }
                });
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
                    this.$emit('flash', [this.flashMessage,'bg-red-100 dark:bg-red-900']);
                } else {
                    let no = Number(item.product_quantity);
                    let num = no + 1;
                    this.fields.product_quantity = num;
                    // console.log(num);
                    this.flashMessage = 'Cart Items Added!';
                    let type = 'bg-green-100 dark:bg-green-900';
                    this.editQty([item.id, this.flashMessage, type]);
                }
            },

            minusQuantity(item){
                if (item.product_quantity == 1 ) {
                    this.flashMessage = 'Minimum No. Reached!';
                    this.$emit('flash', [this.flashMessage,'bg-red-100 dark:bg-red-900']);
                } else {
                    let no = item.product_quantity;
                    let num = no - 1;
                    this.fields.product_quantity = num;
                    // console.log(num);
                    this.flashMessage = item.product_name + ' removed from the cart!';
                    let type = 'bg-red-100 dark:bg-red-900';
                    this.editQty([item.id, this.flashMessage, type]);
                }
            },

            editQty(id, message, type) {
                axios.put('/cart/edit/'+id, this.fields)
                    .then(response => {
                        this.$emit('flash', [message, type]);
                })
            },

            removeFromCart(item) {
                if(confirm('ARE YOU SURE YOU WANT TO REMOVE: ' + item.product_name + ' FROM THE CART?'))
			   	{
                    axios.get('/cart/remove/'+item.product_id)
                        .then(response => {
                            this.flashMessage = 'Item removed from cart!';
                            this.$emit('flash', [this.flashMessage, 'bg-red-100 dark:bg-red-900']);
                        })
                }
            },

            // get form fields
            formFields() {
                this.fields.delivery_id      = "";
                this.errors                  = {};
            },

            reload() {
                this.formInfo = utilities.loaded(this);
            },
		}
	}
</script>