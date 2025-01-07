<template>
    <div class="dark:border-gray-700 dark:bg-gray-700">
        <div class="p-4 bg-white dark:bg-gray-700">
            <form @submit.prevent="submit">
                <div class="w-full flex-col space-y">
                    <div class="w-full">
                        <h3 :class="[formInfo.headerClass]">
                            Enter Models for {{ this.product.name }}.
                        </h3>
                    </div>
                    <!-- product Model  -->
                    <div class="w-full mb-2 justify-center">
                        <!-- feature header  -->
                        <div class="m-2">
                            <label 
                                for="name" 
                                :class="errors && errors.name ? formFailed.labelErrorclass : formInfo.labelclass">
                                Product Model Name 
                                <i v-if="errors?.name || formsuccess" :class="formFailed.iconreloadclass"></i>
                            </label>
                            <input type="text" id="name" name="name" v-model="fieldsModel.name" :class="[formInfo.inputclass]" placeholder="Product Model or Color" required @keydown.enter="focusNext" @input="checkValue('name')" ref="startRefs">
                            <p id="helper-text-explanation" v-if="errorsModel && errorsModel.name" :class="[formInfo.infoText]">{{ errorsModel.name[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>
                    </div>

                    <!-- buttons -->
                    <div class="w-full">
                        <button type="submit" :class="[formInfo.bluebtnClass]" @click.prevent="submit">
                            {{ formInfo.buttoninfo }}  
                            <i :class="[formInfo.buttoninfoIcon , 'fa-1x m-1']"></i>
                        </button>
                    </div>
                </div>      
            </form>
        </div>
    </div>
</template>

<script>
    // export test 
    import utilities        from '../utilities.js';

	export default{
		props:[
			'product',
            'id'
		],

        components: {
        },

		data() {
			return {
				// tabs settings
                formKey: true,

				// form settings
				//classess
                formInfo: [],

				//form
				fields: {},
                fieldsModel: {},
                errors: {},
                errorsModel: {},

                // form submission
                formsuccess: false,
                flashMessage: "Model successfully added",

                //modal
                addModal: false,

                // new error 
                formFailed      : [],
                hasErrors       : false,
                submitted       : false,
                cleared         : false
			}
		},

        mounted: function() {
            this.formInfo = utilities.loaded(this);
        },

		created() {
			this.formFields();
            this.focusStart();
		},

		methods: {
            // focus inputs 
            checkValue(fieldName) {
                // Clear the error for the specific field
                if (this.errors[fieldName]) {
                    delete this.errors[fieldName];
                }

                // Set hasErrors to true if there are still errors
                this.hasErrors = Object.keys(this.errors).length > 0; 

                // If there are no errors, set modalInfo and formInfo
                if (!this.hasErrors && this.submitted) {
                    if (!this.cleared) {
                        this.flashShow('All Errors cleared!', 'info')
                        this.cleared = true;
                    }
                    // this.modalInfo = modalUtilities.info(this);
                    this.formInfo  = utilities.loaded(this);
                }
            },

            focusStart() {
                this.$nextTick(() => {
                    if (this.$refs.startRefs) {
                        this.$refs.startRefs.focus();
                    } else {
                        console.error('startRefs is not available.');
                    }
                });
            },

            focusNext(e) {
                const inputs = Array.from(e.target.form.querySelectorAll('input', 'select', 'textarea'));
                const index = inputs.indexOf(e.target);

                if (index < inputs.length) {
                    inputs[index + 1].focus();
                } else {
                    this.submit();
                }
            },

            // submit product Model
            submit() {
                if (this.submitted) return; // Prevent duplicate submissions
                this.submitted = true;

                this.loadingToggle();

                // submit the fields first
                this.errorsModel = {};
                axios.post('/product/model/add/' +this.id, this.fieldsModel)
                    .then(response => {
                        this.$emit('update');
                        this.flashShow(response.data.message, response.data.type);
                        setTimeout(this.formFields, 3000);
                        this.formKey += 1;
                        this.successToggle();
                })
                    .catch(error => {
                        if (error.response?.status === 422) {
                            this.failureToggle();
                            this.errors = error.response.data.errors || {};
                            this.notification = error.response.data.message || 'Submission Failed, Try Again!';
                            this.$emit('flash', this.notification, 'danger');

                            // Flash error messages sequentially
                            let delay = 0;
                            for (const key in this.errors) {
                                for (const message of this.errors[key]) {
                                    setTimeout(() => {
                                        this.$emit('flash', message, 'danger');
                                    }, delay);
                                    delay += 500;
                                }
                            }
                        }
                })
                    .finally(() => {
                    this.submitted = false; // Reset loading state
                });
            }, 

            // get form fields and reset classes
            formFields() {
                this.fieldsModel.name      = "";
                this.errors                = {},
                this.errorsModel           = {},
                this.normalToggle();
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

            // form states 
            successToggle() {
                this.hasErrors      = false;
                this.formInfo       = utilities.success(this);
                setTimeout(this.normalToggle, 3500);
            },

            loadingToggle() {
                this.formInfo       = utilities.loading(this);
                // setTimeout(this.normalToggle, 5000);
            },

            failureToggle() {
                this.formInfo       = utilities.success(this);
                this.formFailed     = utilities.failed(this);
                this.hasErrors      = true;
                // setTimeout(() => {
                //     this.hasErrors      = false;
                //     this.errors         = {};
                // }, 5000);
            },

            normalToggle() {
                this.formInfo       = utilities.loaded(this);
            },
		}
	}
</script>