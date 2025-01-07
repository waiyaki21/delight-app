<template>
    <div class="dark:border-gray-700 dark:bg-gray-700">
        <div class="p-2 bg-white dark:bg-gray-700">
            <form @submit.prevent="submit">
                <div class="row">
                    <div class="col-md-12 my-1">
                        <h3 class="text-lg text-gray-900 dark:text-white underline title uppercase text-center">
                            Enter Description for {{ this.product.name }}.
                        </h3>
                        <!-- product description header  -->
                        <div class="col-md-12">
                            <label for="header" v-if="errorsDescription && errorsDescription.header" :class="[formInfo.labelErrorclass]">Enter Description header <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="header" v-else :class="[formInfo.labelclass]">Enter Description header <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="header" name="header" v-model="fieldsDescription.header" :class="[formInfo.inputclass]" placeholder="Enter description header">
                            <p id="helper-text-explanation" v-if="errorsDescription && errorsDescription.header" :class="[formInfo.infoText]">{{ errorsDescription.header[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>
                    
                        <!-- product description body  -->
                        <div class="col-md-12">
                            <label for="body" v-if="errorsDescription && errorsDescription.body" :class="[formInfo.labelErrorclass]">Enter Description body <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="body" v-else :class="[formInfo.labelclass]">Enter Description body <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <!-- <test></test> -->
                            <addDescription
                                @descInfo   = "setOrderDescription"
                                @descget    = "getOrderDescription"
                                ref         ="descriptionRef"
                            ></addDescription>
                            <p id="helper-text-explanation" v-if="errorsDescription && errorsDescription.body" :class="[formInfo.infoText]">{{ errorsDescription.body[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>

                        <!-- buttons -->
                        <div class="col-md-12 my-2">
                            <button type="submit" :class="[formInfo.bluebtnClass]" @click="submitDescription">
                                {{ formInfo.buttoninfo}}  
                                <i :class="[formInfo.buttoninfoIcon, 'fa-1x m-1']"></i>
                            </button>
                        </div>
                    </div>
                </div>      
            </form>

            
        </div>           
    </div>
</template>

<script>
    // export test 
    import utilities        from '../utilities.js';

    import addDescription   from './addDescriptionForm.vue';

	export default{
		props:[
			'product',
            'id'
		],

        components: {
            addDescription,
            // test
        },

		data() {
			return {
                editor: null,
                //data
                brands: [],
                catergories: [],

				// tabs settings
                formKey: true,
				DescriptionDetails: true,
                

					// form settings
				//classess
                formInfo: [],

				//form
				fields: {},
                fieldsDescription: {},
                errors: {},
                errorsDescription: {},

                // form submission
                formsuccess: false,
                flashMessage: "Description successfully created",

                //modal
                addModal: false,
			}
		},

        mounted() {
            this.formInfo = utilities.loaded(this);
        },

		created() {
			this.formFields();
		},

		methods: {
            setOrderDescription(info) {
                this.fieldsDescription.body = info;
            },

            getOrderDescription(info) {
                this.fieldsDescription.body = info;
                console.log('order desc success!');
            },

            // Handle the image URL uploaded
            handleImageUploadFromChild(imageUrl) {
                this.fieldsDescription.imageUrl = imageUrl; // Store the image URL in the description fields
            },

            // submit product Description
            submitDescription() {
                // submit the fields first
                this.errorsDescription = {};
                this.formInfo = utilities.loading(this);
                axios.post('/product/description/add/' +this.id, this.fieldsDescription)
                    .then(response => {
                        this.$emit('update')
                        this.fieldsDescription = {};
                        let message = 'Description added Successfully!';
                        this.flashShow(message, 'success');
                        this.formInfo = utilities.success(this);
                        this.formFields();
                        setTimeout(this.reload, 10000);
                        this.formKey += 1;
                })
                    .catch(error => {
                    if (error.response.status === 422) {
                        this.formInfo = utilities.failed(this);
                        this.errorsDescription = error.response.data.errors || {};
                        let message = 'Please fill in all the inputs!';
                        this.flashShow(message, 'danger');
                    }
                });
            }, 

            // get form fields
            formFields() {
                this.fieldsDescription.body     = "";
                this.errors                     = {};
                this.errorsDescription          = {};
            },

            reload() {
                this.formInfo = utilities.loaded(this);
            },

            flashShow(message, body) {
                this.$emit('flash', message, body);
            }
		}
	}
</script>