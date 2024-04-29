<template>
	<!-- Main modal -->
	<div id="catergory-modal" tabindex="-1" data-modal-placement="top" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center ps flex" aria-modal="true" role="dialog" v-show="openModal">
	    <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
	        <!-- Modal content -->
	        <div class="relative bg-white rounded-lg dark:bg-gray-700 border-2 border-gray-700 card-shadow2">
	            <!-- Modal header -->
	            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
	                <h3 class="text-3xl font-medium text-gray-900 dark:text-white underline title uppercase text-center">
	                    {{ this.header }}
	                </h3>
	                <button type="button" class="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="show">
	                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
	                    <span class="sr-only">Close modal</span>
	                </button>
	            </div>
	            <!-- Modal body -->
	            <div class="container my-2">
	                <div class="row">
	                    <div class="col-md-12" v-if="catergoryForm">
	                        <addCatergoryForm
	                        	@created 		=   "update"
	                        ></addCatergoryForm>
	                    </div>
                        <div class="col-md-12" v-else>
							<addBrandForm
								v-bind:catergory    = "catergory"
	                        	@created 			= "updateBrand"
								@back				= "revert"
	                        ></addBrandForm>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>	
</template>

<script>
	import addCatergoryForm 	from '../../FormComponents/Catergory/addCatergory.vue';
	import addBrandForm 		from '../../FormComponents/Brand/addBrand.vue';
	export default {
		props: [
			// 'user',
			// 'allorders'
		],

		data() {
			return {
				// modal header 
				header: 'Add New Catergory.',

				// form boolean 
				catergoryForm:  true,
                brandForm:      false,

                //new catergory
                catergory: {},

				openModal: false
			}
		},

		components: {
            addCatergoryForm,
			addBrandForm,
		},

		created() {

		},

		methods: {
			closeModal() {
				this.$emit('closemodal');
			},

			update(message, info) {
				this.header      	= 'Add New Brands :' + info.name;
                this.catergory      = info;
                this.catergoryForm  = false;
                this.brandForm      = true;
				this.$emit('completed', message);
			},

			updateBrand(message) {
				this.$emit('completed', message);
			},

			revert () {
				this.header      	= 'Add Catergories';
                this.catergoryForm  = true;
                this.brandForm      = false;
				let message 		= "Now showing Catergories Form!";
				this.$emit('completed', message);
			},

			updateBrands(info) {
				this.header      	= 'Add Catergory Brands';
                this.catergory      = info;
                this.catergoryForm  = false;
                this.brandForm      = true;
				// this.$emit('completed', message);
			},

			show() {
				this.openModal = !this.openModal;
				this.catergoryForm = true;
				this.brandForm = false;
			},

			showBrands(info) {
				this.openModal = !this.openModal;
				this.updateBrands(info);
			},
		}
	}
</script>