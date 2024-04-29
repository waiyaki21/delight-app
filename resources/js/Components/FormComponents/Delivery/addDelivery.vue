<template>
    <div class="card dark:border-gray-700 dark:bg-gray-700">
        <div id="postDelivery" :key="formKey">
            <!-- delivery form-->
            <div class="p-4 bg-white dark:bg-gray-700">
                <form @submit.prevent="submit" class="container">
                    <div class="row mb-2">
                        <!-- delivery first name  -->
                        <div class="col-md-6">
                            <label for="first_name" v-if="errorsDelivery && errorsDelivery.first_name" :class="[formInfo.labelErrorclass]">First Name <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="first_name" v-else :class="[formInfo.labelclass]">First Name <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="first_name" name="first_name" v-model="fieldsDelivery.first_name" :class="[formInfo.inputclass]" placeholder="Enter First Name" required>
                            <p id="helper-text-explanation" v-if="errorsDelivery && errorsDelivery.first_name" :class="[formInfo.infoText]">{{ errorsDelivery.first_name[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>
                        <!-- delivery second name  -->
                        <div class="col-md-6">
                            <label for="second_name" v-if="errorsDelivery && errorsDelivery.second_name" :class="[formInfo.labelErrorclass]">Second Name <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="second_name" v-else :class="[formInfo.labelclass]">Second Name <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="second_name" name="second_name" v-model="fieldsDelivery.second_name" :class="[formInfo.inputclass]" placeholder="Enter Second Name" required>
                            <p id="helper-text-explanation" v-if="errorsDelivery && errorsDelivery.second_name" :class="[formInfo.infoText]">{{ errorsDelivery.second_name[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>
                        <!-- delivery email  -->
                        <div class="col-md-12">
                            <label for="email" v-if="errorsDelivery && errorsDelivery.email" :class="[formInfo.labelErrorclass]">Email <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="email" v-else :class="[formInfo.labelclass]">Email <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="email" id="email" name="email" v-model="fieldsDelivery.email" :class="[formInfo.inputclass]" placeholder="Enter Email" required>
                            <p id="helper-text-explanation" v-if="errorsDelivery && errorsDelivery.email" :class="[formInfo.infoText]">{{ errorsDelivery.email[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>
                        <!-- delivery city  -->
                        <div class="col-md-4">
                            <label for="city" v-if="errorsDelivery && errorsDelivery.city" :class="[formInfo.labelErrorclass]">City <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="city" v-else :class="[formInfo.labelclass]">City <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="city" name="city" v-model="fieldsDelivery.city" :class="[formInfo.inputclass]" placeholder="Enter City" required>
                            <p id="helper-text-explanation" v-if="errorsDelivery && errorsDelivery.city" :class="[formInfo.infoText]">{{ errorsDelivery.city[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>
                        <!-- delivery estate  -->
                        <div class="col-md-4">
                            <label for="estate" v-if="errorsDelivery && errorsDelivery.estate" :class="[formInfo.labelErrorclass]">Estate <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="estate" v-else :class="[formInfo.labelclass]">Estate <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="estate" name="estate" v-model="fieldsDelivery.estate" :class="[formInfo.inputclass]" placeholder="Enter Estate" required>
                            <p id="helper-text-explanation" v-if="errorsDelivery && errorsDelivery.estate" :class="[formInfo.infoText]">{{ errorsDelivery.estate[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>
                        <!-- delivery apartment  -->
                        <div class="col-md-4">
                            <label for="apartment" v-if="errorsDelivery && errorsDelivery.apartment" :class="[formInfo.labelErrorclass]">Apartment <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="apartment" v-else :class="[formInfo.labelclass]">Apartment <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="apartment" name="apartment" v-model="fieldsDelivery.apartment" :class="[formInfo.inputclass]" placeholder="Enter Apartment" required>
                            <p id="helper-text-explanation" v-if="errorsDelivery && errorsDelivery.apartment" :class="[formInfo.infoText]">{{ errorsDelivery.apartment[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>
                        <!-- delivery phone_number  -->
                        <div class="col-md-12">
                            <label for="phone_number" v-if="errorsDelivery && errorsDelivery.phone_number" :class="[formInfo.labelErrorclass]">Phone Number <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="phone_number" v-else :class="[formInfo.labelclass]">Phone Number <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="phone_number" name="phone_number" v-model="fieldsDelivery.phone_number" :class="[formInfo.inputclass]" placeholder="Enter Phone Number" required>
                            <p id="helper-text-explanation" v-if="errorsDelivery && errorsDelivery.phone_number" :class="[formInfo.infoText]">{{ errorsDelivery.phone_number[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>

                        <!-- buttons -->
                        <div class="col-md-12 my-4">
                            <button type="submit" :class="[formInfo.bluebtnClass]" @click="submitDelivery">
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
			'deliveryfile',
		],

		data() {
			return {
                //data
                user: {},
                delivery: {},

				// tabs settings
                formKey: true,

					// form settings
				//classess
                formInfo: [],

				//form
				fields: {},
                fieldsDelivery: {},
                errors: {},
                errorsDelivery: {},

                // form submission
                formsuccess: false,

                //modal
                addModal: false,
			}
		},

        mounted() {
            this.formInfo = utilities.loaded(this);
        },

		created() {
			this.getUser();
            this.formFields();
		},

		methods: {
            getUser() {
                axios.get('/getUser/delivery')
                    .then(
                    	({data}) => {
                    		this.user       = data[0]
                            this.delivery   = data[1]
                    });
            },

            // submit Delivery
            submitDelivery() {
                // submit the fields first
                this.errorsDelivery = {};
                this.formInfo = utilities.loading(this);
                axios.post('/delivery/add', this.fieldsDelivery)
                    .then(response => {
                        this.$emit('update')
                        this.fieldsDelivery = {};
                        this.formFields();
                        this.formInfo = utilities.success(this);
                        setTimeout(this.reload, 10000);
                        this.formKey += 1;
                })
                    .catch(error => {
                    if (error.response.status === 422) {
                        this.formInfo = utilities.failed(this);
                        this.errorsDelivery = error.response.data.errors || {};
                        this.$emit('failure')
                    }
                });
            }, 

            // get form fields
            formFields() {
                this.fieldsDelivery.first_name      = "";
                this.fieldsDelivery.second_name     = "";
                this.fieldsDelivery.email           = "";
                this.fieldsDelivery.phone_number    = "";
                this.fieldsDelivery.city            = "";
                this.fieldsDelivery.estate          = "";
                this.fieldsDelivery.apartment       = "";
                this.errors                         = {};
                this.errorsDelivery                 = {};
            },

            reload() {
                this.formInfo = utilities.failed(this);
            },
		}
	}
</script>