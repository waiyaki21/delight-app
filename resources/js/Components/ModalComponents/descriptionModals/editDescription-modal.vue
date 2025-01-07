<template>
	<!-- Main modal -->
	<div id="editDesc-modal" tabindex="-1" data-modal-placement="top" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center ps flex" aria-modal="true" role="dialog" >
	    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
	        <!-- Modal content -->
	        <div class="relative bg-white rounded-lg dark:bg-gray-700 border-2 border-gray-700 card-shadow2">
	            <!-- Modal header -->
	            <div class="flex justify-between items-start p-2 px-4 border-b dark:border-gray-600">
	                <h3 class="text-xl font-semibold text-gray-900 dark:text-white underline title uppercase text-center">
	                    Edit Product Description.
	                </h3>
	                <button type="button" class="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="closeModal">
	                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
	                    <span class="sr-only">Close modal</span>
	                </button>
	            </div>
	            <!-- Modal body -->
	            <div class="m-2">
                    <!-- <editDescriptionForm
                        v-bind:description 	= "description"
                        v-bind:id 	    	= "description.id"
                        ref 				= "editDescriptionFormRefs"
                        @update 	        = "reload"
                    ></editDescriptionForm>   -->
	            </div>
	        </div>
	    </div>
	</div>	
</template>

<script>
	import editDescriptionForm 	from '../../FormComponents/Description/editDescription.vue';

	export default {
		props: [

		],

		data() {
			return {
				description: {}
			}
		},

		components: {
            editDescriptionForm,
		},

		methods: {
			closeModal() {
				this.$refs.editDescriptionFormRefs.formFields();
				this.$emit('closemodal');
			},

			reload() {
				this.$emit('reloaddescription');
			},

			open(x) {
				this.description = x;
			},
		}
	}
</script>