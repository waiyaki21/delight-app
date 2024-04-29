<template>
	<form @submit.prevent="submit">
        <div class="row my-2">
            <!-- name -->
            <div class="col-md-12">
                <label for="name" v-if="errors && errors.name" :class="[formInfo.labelErrorclass]">Brand Name <i :class="[formInfo.iconreloadclass]"></i></label>
                <label for="name" v-else :class="[formInfo.labelclass]">Brand Name <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                <p id="helper-text-explanation text-sm underline" :class="[formInfo.infoText]">
                    Add Brands to {{ catergory.name }}.
                </p>
                <input type="text" id="name" name="name" v-model="fields.name" :class="[formInfo.inputclass]" placeholder="Enter Brand Name" required>
                <p id="helper-text-explanation" v-if="errors && errors.name" :class="[formInfo.infoText]">{{ errors.name[0] }}</p>
                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>  
            </div>
        </div>
        
	    <!-- Modal footer -->
        <div class="row">
            <div class="col-md-6 w-full flex items-center py-2 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
                <button type="button" :class="['title', formInfo.bluebtnClass]" @click="submit">
                    {{ formInfo.buttoninfo }} 
                    <i :class="['mx-2', formInfo.buttoninfoIcon]"></i>
                </button>
            </div>
            <div class="col-md-6 w-full flex items-center py-2 border-gray-200 dark:border-gray-600">
                <button type="button" class="title w-full block text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-200 font-normal text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow" @click="revertBack">
                    ADD MORE CATERGORIES
                    <i class="mx-2 fas fa-chevron-right"></i>
                </button>
            </div> 
        </div>
             
	</form>	
</template>

<script>
    // export test 
    import utilities        from '../utilities.js';

	export default {
        props: [
            'catergory'
        ],

		data() {
			return {
                fields: {},
                errors: {},
                flashMessage: "",

					// form settings
				//classes
				formInfo: [],
			}
		},

        created(){
            this.formFields();
        },

        mounted() {
            this.formInfo = utilities.loaded(this);
        },

		methods: {
            submit() {
                // submit the fields first
                this.errors = {};
                this.formInfo = utilities.loading(this);
                axios.post('/brand/add/'+this.catergory.id , this.fields)
                    .then(response => {
                        this.flashEditor();
                        // this.$refs.childComponentRef.flash([this.flashMessage, 'bg-green-100 dark:bg-green-900']);
                        this.$emit('created', this.flashMessage);
                        this.fields = {};
                        this.formFields();
                        this.formInfo = utilities.success(this);
                        setTimeout(this.reload, 1000);
                    })
                    // .catch(error => {
                    //     this.errors = error.response.data.errors;
                    //     this.formInfo = utilities.failed(this);
                    // });
            },

            revertBack() {
                this.$emit('back');
            },

            formFields() {
                this.fields.name  = "";
                this.errors       = {};
            },

            flashEditor() {
                return this.flashMessage = 'The New Brand has been Created!';
            },

            reload() {
                this.formInfo = utilities.loaded(this);
            },

		}
	}	
</script>