<template>
	<!-- Main modal -->
	<div id="model-modal" tabindex="-1" data-modal-placement="top" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center ps flex" aria-modal="true" role="dialog" >
	    <div class="relative p-2 w-full max-w-2xl h-full md:h-auto">
	        <!-- Modal content -->
	        <div class="relative bg-white rounded-lg dark:bg-gray-700 border-2 border-gray-700 card-shadow2">
	            <!-- Modal header -->
				<modal-header :name="'Add Product Model.'" @close="closeModal"></modal-header>
	            <!-- Modal body -->
	            <div class="m-2">
                    <addModelForm
                        v-bind:product 	    = "product"
                        v-bind:id 	    	= "product.id"
                        ref 				= "modelFormRefs"
                        @update 	        = "reload"
						@flash              = "flashShow"
                    ></addModelForm>  
	            </div>
	        </div>
	    </div>
	</div>	
</template>

<script>
	import addModelForm 	from '../../FormComponents/Model/addModel.vue';

	export default {
		props: [
			'product',
		],

		data() {
			return {
			}
		},

		components: {
            addModelForm,
		},

		methods: {
			closeModal() {
				this.$refs.modelFormRefs.formFields();
				this.$emit('closemodal');
			},

			reload() {
				this.$emit('reloadmodel');
			},

			flashShow(message, body) {
                this.$emit('flash', message, body);
            }
		}
	}
</script>