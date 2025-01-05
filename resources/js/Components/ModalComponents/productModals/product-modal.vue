<template>
	<!-- Main modal -->
	<div id="product-modal" tabindex="-1" data-modal-placement="top" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center ps flex" aria-modal="true" role="dialog" >
	    <div class="relative p-2 w-full max-w-4xl h-full md:h-auto overflow-auto">
	        <!-- Modal content -->
	        <div class="relative bg-gray-100 rounded-lg dark:bg-gray-700 border-2 border-gray-700 card-shadow2">
	            <!-- Modal header -->
				<modal-header :name="'Add New Product.'" @close="closeModal"></modal-header>
	            <!-- Modal body -->
	            <div class="p-2">
					<addProductForm
						v-bind:getcatergory = "catfiles"
						ref 				= "productFormRefs"
						@reloadproducts 	= "reload"
						@add 				= "addBrand"
						@flash              = "flashShow"
						@hide               = "flashHide"
						@timed              = "flashTimed"
						@click              = "flashClickShow"
					></addProductForm>  
	            </div>
	        </div>
	    </div>
	</div>	
</template>

<script>
	import addProductForm 	from '../../FormComponents/Product/addProduct.vue';

	export default {
		props: [
			'catfiles',
		],

		data() {
			return {
				// form boolean 
				// catergoryForm:  true,
                // brandForm:      false,

                //new product
                product: {}
			}
		},

		components: {
            addProductForm,
		},

		methods: {
			closeModal() {
				this.$refs.productFormRefs.formFields();
				this.$refs.productFormRefs.showProductDetails();
				this.$emit('closemodal');
			},

			reload() {
				this.$emit('reloadproduct');
			},

			addBrand(cat) {
				this.$emit('add', cat);
			},

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