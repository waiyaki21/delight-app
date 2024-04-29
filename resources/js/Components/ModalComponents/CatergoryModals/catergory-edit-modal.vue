<template>
	<!-- Main modal -->
	<div id="catergory-modal" tabindex="-1" data-modal-placement="top" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center ps flex" aria-modal="true" role="dialog" >
	    <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
	        <!-- Modal content -->
	        <div class="relative bg-white rounded-lg dark:bg-gray-700 border-2 border-gray-700 card-shadow2">
	            <!-- Modal header -->
	            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
	                <h3 class="text-xl font-semibold text-gray-900 dark:text-white underline title uppercase text-center" v-if="banner">
	                    Edit Catergory Banner.
	                </h3>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white underline title uppercase text-center" v-else>
						Edit Catergory Info.
					</h3>
	                <button type="button" class="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="closeModal">
	                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
	                    <span class="sr-only">Close modal</span>
	                </button>
	            </div>
	            <!-- Modal body -->
	            <div class="container my-1">
	                <div class="row">
	                    <div class="col-md-12">
							<!-- tabs  -->
							<div class="border-b border-gray-200 dark:border-gray-700">
								<ul class="flex flex-wrap -mb-px text-base font-normal text-center text-gray-500 dark:text-gray-400">
									<li class="mr-2">
										<a :class="[this.nameTab]" @click="switchTab()">
											<edit-icon :class="[this.nameIcon]"></edit-icon>
											Edit Name
										</a>
									</li>
									<li class="mr-2">
										<a :class="[this.bannerTab]" @click="switchTab()">
											<photo-icon :class="[this.bannerIcon]"></photo-icon>
											Edit Banner
										</a>
									</li>
								</ul>
							</div>
							<!-- form  -->
	                        <editCatergoryForm
                                v-bind:catergory    = "catergory"
								v-bind:banner       = "state"
	                        	@updated 		    = "update"
								ref					= "editCatergoryRef"
	                        ></editCatergoryForm>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>	
</template>

<script>
	import editCatergoryForm 	from '../../FormComponents/Catergory/editCatergory.vue';
	export default {
		props: [
			'catergory',
			'banner'
		],

		data() {
			return {
				tabActive: 		'inline-flex items-center justify-center p-2 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group cursor-pointer',
				tabInactive: 	'inline-flex items-center justify-center p-2 border-b border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group cursor-pointer',

				iconActive:		'w-4 h-4 mr-2 text-blue-600 dark:text-blue-500',
				iconInactive: 	'w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300',

				nameTab:		'',
				bannerTab:		'',

				nameIcon: 		'',
				bannerIcon: 	'',

				state:			true
			}
		},

		components: {
            editCatergoryForm
		},

		created() {
			this.setup();
		},

		methods: {
			setup() {
				this.state = this.$props.banner;
				this.classState(this.state);
			},

			switchTab() {
				this.state = !this.state;
				this.classState(this.state);
			},

			classState(info) {
				if (info == true) {
					this.nameTab 		= this.tabActive;
					this.bannerTab 		= this.tabInactive;
					this.nameIcon 		= this.iconActive;
					this.bannerIcon 	= this.iconInactive;
				} else {
					this.nameTab 		= this.tabInactive;
					this.bannerTab 		= this.tabActive;
					this.nameIcon 		= this.iconInactive;
					this.bannerIcon 	= this.iconActive;
				}
			},

			closeModal() {
				this.$emit('closemodal');
			},

			update(message) {
				this.$emit('editted', message);
			}
		}
	}
</script>