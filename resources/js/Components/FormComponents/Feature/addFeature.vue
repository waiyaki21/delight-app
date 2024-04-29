<template>
    <div class="dark:border-gray-700 dark:bg-gray-700">
        <!-- <div class="dark:bg-gray-700"> -->
            <flash 
                ref="childComponentRef"
            ></flash>
        <!-- </div>
        <div id="postProductFeatures" :key="formKey"> -->
            <div class="p-4 bg-white dark:bg-gray-700">
                <form @submit.prevent="submit">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 :class="[formInfo.headerClass]">
                                Enter Features for {{ this.product.name }}.
                            </h3>
                        </div>
                        <!-- product features  -->
                        <div class="col-md-12 row mb-2 justify-center">
                            <!-- feature header  -->
                            <div class="col-sm-5 m-2">
                                <label for="header" v-if="errorsFeatures && errorsFeatures.header" :class="[formInfo.labelErrorclass]">Feature Header <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="header" v-else :class="[formInfo.labelclass]">Feature Header <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <input type="text" id="header" name="header" v-model="fieldsFeatures.header" :class="[formInfo.inputclass]" placeholder="Feature header eg RAM" required>
                                <p id="helper-text-explanation" v-if="errorsFeatures && errorsFeatures.header" :class="[formInfo.infoText]">{{ errorsFeatures.header[0] }}</p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                            </div>
                            <!-- feature body  -->
                            <div class="col-sm-5 m-2">
                                <label for="body" v-if="errorsFeatures && errorsFeatures.body" :class="[formInfo.labelErrorclass]">Feature Body<i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="body" v-else :class="[formInfo.labelclass]">Feature Body<i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <input type="text" id="body" name="body" v-model="fieldsFeatures.body" :class="[formInfo.inputclass]" placeholder="Feature Body eg 8GB" required>
                                <p id="helper-text-explanation" v-if="errorsFeatures && errorsFeatures.body" :class="[formInfo.infoText]">{{ errorsFeatures.body[0] }}</p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                            </div>
                        </div>

                        <!-- buttons -->
                        <div class="col-md-12">
                            <button type="submit" :class="[formInfo.bluebtnClass]" @click="submitFeatures">
                                {{ formInfo.buttoninfo }}  
                                <i :class="[formInfo.buttoninfoIcon , 'fa-1x m-1']"></i>
                            </button>
                        </div>
                    </div>      
                </form>
            </div>           
        <!-- </div> -->
    </div>
</template>

<script>
    import flash            from '../../AlertComponents/flash-simple.vue';
    // export test 
    import utilities        from '../utilities.js';

	export default{
		props:[
			'product',
            'id'
		],

        components: {
            flash,
        },

		data() {
			return {
                //data
                brands: [],
                catergories: [],

				// tabs settings
                formKey: true,
				featuresDetails: true,

					// form settings
				//classess
                formInfo: [],

				//form
				fields: {},
                fieldsFeatures: {},
                errors: {},
                errorsFeatures: {},

                // form submission
                formsuccess: false,
                flashMessage: "Feature successfully created",

                //modal
                addModal: false,
			}
		},

        mounted: function() {
            this.formInfo = utilities.loaded(this);
        },

		created() {
			this.formFields();
		},

		methods: {
            // submit product features
            submitFeatures() {
                // submit the fields first
                this.errorsFeatures = {};
                this.formInfo = utilities.loading(this);
                axios.post('/product/features/add/' +this.id, this.fieldsFeatures)
                    .then(response => {
                        this.$emit('update')
                        this.fieldsFeatures = {};
                        let message = 'Feature added Successfully!';
                        this.$refs.childComponentRef.flash([message, 'bg-green-100 dark:bg-green-900']);
                        this.formInfo = utilities.success(this);
                        setTimeout(this.formFields, 10000);
                        this.formKey += 1;
                })
                    .catch(error => {
                    if (error.response.status === 422) {
                        this.formInfo = utilities.failed(this);
                        this.errorsFeatures = error.response.data.errors || {};
                        let message = 'Form Details Missing!';
                        this.$refs.childComponentRef.flash([message, 'bg-red-100 dark:bg-red-900']);
                    }
                });
            }, 

            // get form fields and reset classes
            formFields() {
                this.fieldsFeatures.header      = "";
                this.fieldsFeatures.body        = "";
                this.errors                     = {},
                this.errorsFeatures             = {},
                this.formInfo                   = utilities.loaded(this);
            }
		}
	}
</script>