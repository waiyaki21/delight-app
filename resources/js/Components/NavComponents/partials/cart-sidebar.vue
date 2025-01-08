<template>
    <!-- drawer component -->
    <div :class="[this.drawerClass, { 'animate__animated animate__fadeInRight': !this.isHiding,'animate__animated animate__fadeOutRight': this.isHiding }]" v-if="this.show" @animationend="handleAnimationEnd">
        <div class="flex justify-between items-start p-2 rounded-t">
            <h5 id="drawer-cart-label" class="underline text-xl md:text-2xl font-semibold text-gray-900 uppercase dark:text-gray-400">Your Cart ( {{ this.cartItemsNo }} )</h5>
            <button type="button" class="group text-gray-900 bg-transparent hover:text-red-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" @click="close">
                <times-icon class="w-6 h-6"></times-icon>
            </button>
        </div>
        <div class="py-2 overflow-y-auto" v-if="!isLoading">
            <ul class="space-y-2">
                <TransitionGroup name="list" tag="div">
                    <li v-for="item in this.cartItems">  
                        <a class="group flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-50">
                            <img class="object-cover w-full rounded-t-lg h-24 w-16 md:rounded-none md:rounded-s-lg mx-4" :src="item.thumbnail_path" :alt="item.product_name">
                            <div class="w-full flex flex-col justify-end px-1 leading-normal uppercase">
                                <div class="inline-flex justify-between mb-0.5">
                                    <h5 class="w-full inline-flex justify-start text-base md:text-lg font-normal tracking-tight text-gray-900 group-hover:text-blue-900">{{ item.product_name }}</h5>
                                    <button type="button" class="text-gray-900 bg-transparent group-hover:text-red-600 rounded-lg text-sm p-0.5 ml-auto inline-flex items-center" @click="deleteItem(item)">
                                        <delete-icon class="w-4 h-4 mb-1"></delete-icon>
                                    </button>
                                </div>
                                <div class="flex justify-between p-0.5">
                                    <h5 class="text-xs font-normal text-gray-900 uppercase dark:text-gray-400">Options: </h5>
                                    <h5 class="underline text-xs font-semibold text-gray-900 uppercase dark:text-gray-400">{{ item.model_name }}</h5>
                                </div>
                                <hr-line></hr-line>
                                <counter :initialValue="item.product_quantity" :id ="item.id" :stock="item.product.stock" @flash="flashShow" @remove="deleteItem" @update:value="updateCounter" />
                                <p class="w-full inline-flex justify-end font-normal text-gray-900 group-hover:text-blue-900">ksh {{ Number(item.product_total).toLocaleString() }}.00</p>
                            </div>
                        </a>
                    </li>
                </TransitionGroup>
            </ul>
        </div>

        <div class="absolute bottom-0 left-0 m-1 p-2 w-full flex-col space-y">
            <div class="flex justify-between p-0.5 my-1">
                <h5 class="text-lg font-normal text-green-700 uppercase dark:text-gray-400">Total: </h5>
                <h5 class="underline text-lg font-semibold text-green-700 uppercase dark:text-gray-400">ksh {{ Number(this.cartTotal).toLocaleString() }}.00</h5>
            </div>
            <router-link :to="'/checkout/'+user.id" type="button" :class="this.checkBtn" v-tooltip="$tooltip('Checkout Items', 'top')">
                Checkout
                <shopping-icon class="w-6 h-6"></shopping-icon>
            </router-link>
        </div>
    </div>
</template>

<script>
    import counter from '../../../Utilities/Buttons/counter.vue';
	export default {
		props: [
			// 'cartitems',
			'user'
		],

        components : {
            counter
        },

        data() {
            return {
                show: false,
                checkBtn: 'text-black hover:text-white bg-white hover:bg-black border border-black hover:border-white font-medium rounded-md text-xl px-4 py-2 text-center items-center w-full inline-flex justify-between uppercase hover:shadow-md',
                drawerClass: 'fixed top-0 right-0 z-40 w-[20rem] max-w-md h-screen p-2 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none border-l-2 border-gray-500 no-scrollbar shadow-md',
                isHiding: false,
                isLoading: false,

                userID: '',
                fields: {}
            }
        },

        mounted() {
            // this.getCart();
        },

		methods: {
            updateCounter(newValue, id) {
                this.counterValue = newValue; // Update the counter value in the parent
                console.log(newValue, id);
                this.fields.product_quantity = newValue
                axios.put('/cart/edit/' + id, this.fields)
                    .then(
                        ({ data }) => {
                            this.getCart();
                        });
            },
            getCart() {
                this.isLoading = true;
                axios.get('/api/getCart/' + this.userID)
                    .then(
                        ({ data }) => {
                            this.cartItems      = data[0];
                            this.cartTotal      = data[1];
                            this.cartItemsNo    = data[2];
                            // this.$emit('reload');
                            this.isLoading = false;
                        });
            },

            deleteItem(item) {
                axios.get('/cart/remove/'+item.product_id)
                	.then(response => {
                		// let data = response.data;
                		// this.$emit('reload');
                        this.getCart();
                        let message = 'Item removed from cart!';
                        this.flashShow(message, 'danger');
                	})
            },

            // operations 
            handleAnimationEnd() {
                if (this.isHiding) {
                    this.show = false; // Hide the drawer after the animation completes
                }
            },
            showDrawer(id) {
                this.userID = id;
                this.getCart();
                this.isHiding   = false;
                this.show       = true;
            },
            closeDrawer() {
                this.isHiding = true;
            },
            close() {
                this.$emit('close');
            },

            // flash 
            flashShow(message, body) {
                this.$emit('flash', message, body);
            },
            flashTimed(message, body, duration) {
                this.$emit('timed', message, body, duration);
            },
            flashHide(duration) {
                this.$emit('hide', duration);
            },
            flashClickShow(message, body, header, url, button, duration) {
                this.$emit('click', message, body, header, url, button, duration);
            },
		}
	}
</script>