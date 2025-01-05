<template>
    <div class="card dark:border-gray-700 dark:bg-gray-700">
        <div class="dark:bg-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center dark:bg-gray-700" id="myTab" role="tablist">
                <li class="mr-2" role="presentation">
                    <button :class="[this.tabClass, this.productBtn]" id="product-tab" data-tabs-target="#product" type="button" aria-controls="product" @click="showProductDetails">1. Product Details</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button :class="[this.tabClass ,this.disabledBtn, this.featuresBtn]" data-tooltip-target="featuresDetailsTooltip" type="button" @click="showFeaturesDetails" :disabled="this.disabled">
                        2. Product Features
                    </button>
                    <tooltip :id="'featuresDetailsTooltip'" :info="this.disabled ? 'Fill in all details within Page 1': 'Enter Product Features'"></tooltip>
                </li>
            </ul>
        </div>
        <div id="postProducts" :key="formKey">
            <!-- product details panel -->
            <div v-show="productDetails" class="p-2 bg-transparent">
                <form @submit.prevent="submit">
                    <div class="grid grid-cols-6 gap-2">
                        <!-- catergory select -->
                        <div class="col-span-2 mt-2">
                            <label 
                                for="catergory_id" 
                                :class="errors && errors.catergory_id ? formFailed.labelErrorclass : formInfo.labelclass">
                                Product Catergory 
                                <i v-if="errors?.catergory_id || formsuccess" :class="formFailed.iconreloadclass"></i>
                            </label>
                            <select id="catergory_id" name="catergory_id" v-model="fields.catergory_id" 
                            :class="[errors && errors.catergory_id ? formFailed.inputclass : formInfo.inputclass, 'option-font']" @change="getBrand(fields.catergory_id)" @keydown.enter="focusNext" @input="checkValue('catergory_id')" ref="startRefs">
                                <option selected>Choose a Catergory</option>
                                <option v-for="catergory in catergories" :value="catergory.id">{{ catergory.name }}</option>
                            </select>
                        </div>

                        <!-- brand select -->
                        <div class="col-span-2 mt-2">
                            <section class="row">
                                <label 
                                    for="brand_id" 
                                    :class="errors && errors.brand_id ? formFailed.labelErrorclass : formInfo.labelclass">
                                    Product Brand 
                                    <i v-if="errors?.brand_id || formsuccess" :class="formFailed.iconreloadclass"></i>
                                </label>
                                <span class="bg-blue-600 text-white text-sm font-normal p-1 rounded dark:bg-blue-900 dark:text-blue-300 shadow hover:bg-black hover:text-white hover:shadow-md mb-1 cursor-pointer text-center uppercase" @click="addBrand" v-if="!this.fields.catergory_id && this.showAdd">
                                    Add Brand
                                </span>
                            </section>
                            <select id="brand_id" name="brand_id" v-model="fields.brand_id" :class="[formInfo.inputclass, 'option-font']" @click="getBrand(this.fields.catergory_id)" @keydown.enter="focusNext" @input="checkValue('brand_id')">
                                <option v-if="!this.fields.catergory_id" selected v-html="!this.fields.catergory_id ? 'SELECT A CATERGORY FIRST' : 'Choose a Brand'"></option>
                                <option v-if="this.fields.catergory_id != '' && this.brands.length == 0">
                                    CATERGORY HAS NO BRANDS
                                </option>
                                <option v-for="brand in brands" :value="brand.id" v-if="this.fields.catergory_id != '' && this.brands.length != 0">
                                    {{ brand.name }}
                                </option>
                            </select>
                        </div>

                        <!-- product name  -->
                        <div class="col-span-2 mt-2">
                            <label 
                                for="name" 
                                :class="errors && errors.name ? formFailed.labelErrorclass : formInfo.labelclass">
                                Product Name 
                                <i v-if="errors?.name || formsuccess" :class="formFailed.iconreloadclass"></i>
                            </label>
                            <input type="text" id="name" name="name" v-model="fields.name" :class="[formInfo.inputclass]" placeholder="Enter Product Name" @keydown.enter="focusNext" @input="checkValue('name')">
                        </div>

                        <!-- product price  -->
                        <div class="col-span-3 mt-2">
                            <label 
                                for="price" 
                                :class="errors && errors.price ? formFailed.labelErrorclass : formInfo.labelclass">
                                Product Price 
                                <i v-if="errors?.price || formsuccess" :class="formFailed.iconreloadclass"></i>
                            </label>
                            <input type="text" id="price" name="price" v-model="fields.price" :class="[formInfo.inputclass]" placeholder="Enter Product Price" @keydown.enter="focusNext" @input="checkValue('price')">
                        </div>

                        <!-- product stock  -->
                        <div class="col-span-3 mt-2">
                            <label 
                                for="stock" 
                                :class="errors && errors.stock ? formFailed.labelErrorclass : formInfo.labelclass">
                                Product Stock 
                                <i v-if="errors?.stock || formsuccess" :class="formFailed.iconreloadclass"></i>
                            </label>
                            <input type="text" id="stock" name="stock" v-model="fields.stock" :class="[formInfo.inputclass]" placeholder="Enter Product Stock Amnt" @keydown.enter="focusNext" @input="checkValue('stock')">
                        </div>

                        <!-- thumbnail file -->
                        <div class="col-span-3 pt-2">
                            <label 
                                for="thumbnail" 
                                :class="errors && errors.thumbnail ? formFailed.labelErrorclass : formInfo.labelclass">
                                Product Thumbnail 
                                <i v-if="errors?.thumbnail || formsuccess" :class="formFailed.iconreloadclass"></i>
                            </label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="thumbnail" name="thumbnail" type="file" ref="thumbnail" @change="onChangeThumbnail" @keydown.enter="focusNext" @input="checkValue('thumbnail')">          		
                        </div>

                        <!-- product_files -->
                        <div class="col-span-3 pt-2">
                            <label 
                                for="images" 
                                :class="errors && errors.files ? formFailed.labelErrorclass : formInfo.labelclass">
                                Upload Product Images 
                                <i v-if="errors?.files || formsuccess" :class="formFailed.iconreloadclass"></i>
                            </label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="files" name="files[]" type="file" ref="files" @change="onChangeFiles" multiple="multiple" @keydown.enter="focusNext" @input="checkValue('files')">         		
                        </div>

                        <!-- buttons -->
                        <div class="col-span-6 w-full mt-2">
                            <button type="submit" :class="[formInfo.bluebtnClass]" @click="submitProduct">
                                {{ formInfo.buttoninfo }}  
                                <i :class="['m-1', formInfo.buttoninfoIcon]"></i>
                            </button>
                            <!-- <button type="button"
                                :class="[this.hasErrors ? formFailed.bluebtnClass : formInfo.bluebtnClass]"
                                @click="[this.hasErrors ? this.$emit('success', 'Fill in the errors to proceed', 'reload') : submitProduct()]">
                                {{ this.hasErrors ? formFailed.buttoninfo : formInfo.buttoninfo }}.
                                <div :class="[formInfo.svgSize]"
                                    v-html="this.hasErrors ? formFailed.svgIcon : formInfo.svgIcon"></div>
                            </button> -->
                        </div>
                    </div>      
                </form>
            </div>
            <!-- product features panel -->
            <div v-show="featuresDetails" class="p-2 bg-transparent">
                <form @submit.prevent="submit">
                    <div class="w-full flex-col space-y">
                        <div class="w-full">
                            <h3 class="text-lg text-gray-900 dark:text-white underline title uppercase text-center">
                                Enter Features for {{ this.newProduct.name }}.
                            </h3>
                        </div>
                        <!-- product features  -->
                        <div class="w-full row mb-2">
                            <!-- feature header  -->
                            <div class="col m-2">
                                <label for="header" v-if="errorsFeatures && errorsFeatures.header" :class="[formInfo.labelErrorclass]">Product Features <i :class="[formFailed.iconreloadclass]"></i></label>
                                <label for="header" v-else :class="[formInfo.labelclass]">Features Header <i v-if="formsuccess" :class="[formFailed.iconreloadclass]"></i></label>
                                <input type="text" id="header" name="header" v-model="fieldsFeatures.header" :class="[formInfo.inputclass]" placeholder="Feature header eg RAM">
                                <p id="helper-text-explanation" v-if="errorsFeatures && errorsFeatures.header" :class="[formInfo.infoText]">{{ errorsFeatures.header[0] }}</p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                            </div>
                            <!-- feature body  -->
                            <div class="col m-2">
                                <label for="body" v-if="errorsFeatures && errorsFeatures.body" :class="[formInfo.labelErrorclass]">Product Features <i :class="[formFailed.iconreloadclass]"></i></label>
                                <label for="body" v-else :class="[formInfo.labelclass]">Product Features <i v-if="formsuccess" :class="[formFailed.iconreloadclass]"></i></label>
                                <input type="text" id="body" name="body" v-model="fieldsFeatures.body" :class="[formInfo.inputclass]" placeholder="Feature Body eg 8GB">
                                <p id="helper-text-explanation" v-if="errorsFeatures && errorsFeatures.body" :class="[formInfo.infoText]">{{ errorsFeatures.body[0] }}</p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                            </div>
                        </div>

                        <!-- buttons -->
                        <div class="w-full">
                            <button type="submit" :class="[formInfo.bluebtnClass]" @click="submitFeatures">
                                {{ formInfo.buttoninfo }} 
                                <i :class="['m-1', formInfo.buttoninfoIcon]"></i>
                            </button>
                        </div>
                    </div>      
                </form>
            </div>           
        </div>
    </div>
</template>

<script>
    import flash            from '../../AlertComponents/flash-simple.vue';
    import notify           from '../../AlertComponents/flash.vue';

    // export test 
    import utilities        from '../utilities.js';

	export default{
		props:[
			'getcatergory',
		],

        components: {
            flash,
            notify,
        },

		data() {
			return {
                //data
                brands: [],
                catergories: [],

				// tabs settings
                formKey: true,
				productDetails: true,
				featuresDetails: false,
				paymentDetails: false,
				productBtn: "",
				featuresBtn: "",
				paymentsBtn: "",
                // disabled: true,

				// form settings
				//classes
                formInfo: [],

				//form
				fields: {},
                fieldsFeatures: {},
                errors: {},
                errorsFeatures: {},
                thumbnail_file: '',
                file: '',
                files: [],
                filesSelected: 0,

                // form submission
                formsuccess: false,
                flashMessage: "Product successfully created",
                newProduct: {},

                //modal
                addModal: false,
                allOrders: [],
                showAdd: false,
                cat: {},
                brandLoading: false,

                // classes
                spanReload:         'mb-1 cursor-pointer',
                successFlash:       'bg-green-400 dark:bg-green-900 border border-green-900 text-white',
                infoFlash:          'bg-teal-400 dark:bg-teal-900 border border-teal-900 text-white',
                dangerFlash:        'bg-rose-400 dark:bg-rose-900 border border-rose-900 text-white',

                tabClass:           'inline-block px-4 pb-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-700 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400 dark:border-gray-700 dark:hoverborder-gray-300 border-gray-300',

                // new error 
                formFailed      : [],
                hasErrors       : false,
                submitted       : false,
                cleared         : false
			}
		},

        mounted() {
            this.submitted      = false;
            this.hasErrors      = false;
            this.cleared        = false;
            this.formInfo = utilities.loaded(this);
        },

		created() {
            this.getCatergoriesLoad();
			this.showProductDetails();
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
                        this.$emit('success', 'All fee errors cleared!', 'info')
                        this.cleared = true;
                    }
                    // this.modalInfo = modalUtilities.info(this);
                    this.formInfo  = utilities.info(this);
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

            // get Catergories on load
            getCatergoriesLoad() {
                return this.catergories = JSON.parse(JSON.stringify(this.getcatergory));  
            },

            // get Brands on click
            getBrand(id) {
                this.brandLoading = true;
                // if-else condition 
                if (!id) {
                    // message if empty
                    let info = 'Select a catergory first!';
                    this.flashShow(info, 'danger');
                    this.brandLoading = false;
                } else {
                    // message 
                    let info = 'Loading Brands!';
                    this.flashShow(info, 'info');
                    // load info 
                    axios.get('/api/getBrands/' + id)
                        .then(
                            ({data}) => {
                                this.brands = data;
                                if (this.brands.length == 0) {
                                    this.showAdd        = true;
                                    this.spanReload     = 'mb-1 cursor-pointer';
                                    this.flashMessage   = `Add Brands First`;
                                    this.type           = `warning`;
                                } else {
                                    this.showAdd        = false;
                                    this.spanReload     = 'mb-1 cursor-pointer flex justify-end';
                                    this.flashMessage   = `${this.brands.length} Brands Loaded`;
                                    this.type           = `success`;
                                }
                                this.brandLoading = false;
                                // close any flash 
                                // this.flashHide(1000);
                                // show message 
                                this.flashShow(this.flashMessage, this.type);
                        });
                }
            },

            // get latest product on submission
            async getProduct() {
                axios.get('/api/getNewProduct/')
                    .then(
                    	({data}) => {
                    		this.newProduct = data;
                            let link        = '/product_show/'+ data.id;
                            let header      = `Upload Successful!`;
                            let button      = `View Product`;
                            this.message    = `${data.name} Uploaded Sucessfully`;
                            this.flashClickShow(this.message, 'success', header, link, button, 15000);
                    });
            },

            // on thumbnail change 
            onChangeThumbnail(event) {
                this.fileSelected   = event.target.files.length;
                this.thumbnail_file = this.$refs.thumbnail.files;
                this.disabledBtn    = "";
                this.disabled       = false;
                console.log('Uploaded Thumbnail', this.thumbnail_file);   
            },

            // on file selection change 
            onChangeFiles(event) {
                // this.filesSelected = event.target.files.length;
                this.files          = this.$refs.files.files;
                this.disabledBtn    = "";
                this.disabled       = false;
                console.log('Uploaded Files', this.files);     
            },

            // submit product
            async submitProduct() {
                this.loadingToggle();

                // Prepare fields
                this.fields.thumbnail = this.$refs.thumbnail.files;
                this.fields.files = this.$refs.files.files;
                this.errors = {};
                this.formInfo = utilities.loading(this);

                try {
                    // Submit fields
                    const response = await axios.post('/product/add', this.fields);

                    // Reset form fields
                    this.formFields();

                    // Submit thumbnail
                    await this.submitThumbnail(response.data[2]);

                    // Submit product files
                    await this.submitProductFiles(response.data[2]);

                    // Fetch updated product list
                    await this.getProduct();

                    // Mark success and reload
                    this.formInfo = utilities.success(this);
                    setTimeout(this.reload, 10000);
                    this.formKey += 1;
                    this.$emit('reloadproducts');
                    this.successToggle();

                } catch (error) {
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
                }
            },

            // submit product thumbnail
            async submitThumbnail(id) {
                const config = {
                    headers: { 'content-type': 'multipart/form-data' },
                };

                const files = Array.from(this.$refs.thumbnail.files);
                for (const file of files) {
                    const data = new FormData();
                    data.append('thumbnail', file);

                    try {
                        await axios.post(`/product/thumbnail/add/${id}`, data, config);
                        const message = `Thumbnail: ${file.name} (${(file.size / 1e6).toFixed(2)} MB) uploaded successfully!`;
                        this.flashTimed(message, 'media', 20000);
                    } catch (err) {
                        const message = `${file.name} (${(file.size / 1e6).toFixed(2)} MB) upload failed!`;
                        this.flash(message, 'danger');
                    }
                }
            },

            // submit product files
            async submitProductFiles(id) {
                const config = {
                    headers: { 'content-type': 'multipart/form-data' },
                };

                const files = Array.from(this.$refs.files.files);
                for (const file of files) {
                    const data = new FormData();
                    data.append('file', file);

                    try {
                        await axios.post(`/product/files/add/${id}`, data, config);
                        const message = `${file.name} (${(file.size / 1e6).toFixed(2)} MB) uploaded successfully!`;
                        this.flashTimed(message, 'media', 10000);
                    } catch (err) {
                        const message = `${file.name} (${(file.size / 1e6).toFixed(2)} MB) upload failed!`;
                        this.flashShow(message, 'danger');
                    }
                }
            },

            // submit product features
            submitFeatures() {
                // submit the fields first
                this.errorsFeatures = {};
                // this.isloading();
                this.formInfo = utilities.loading(this);
                axios.post('/product/features/add/' +this.newProduct.id, this.fieldsFeatures)
                    .then(response => {
                        console.log(response);
                        this.getProduct();
                        this.fieldsFeatures = {};
                        this.formFields();
                        let message = 'Feature added Successfully!';
                        this.flashShow(message, 'success');
                        // this.loadcomplete();
                        this.formInfo = utilities.success(this);
                        setTimeout(this.reload, 10000);
                        this.formKey += 1;
                })
                    .catch(error => {
                    if (error.response.status === 422) {
                        this.formInfo = utilities.failed(this);
                        this.errorsFeatures = error.response.data.errors || {};
                        let message = 'Please fill in all the inputs!';
                        this.flashShow(message, 'success');
                    }
                });
            }, 

            // get form fields
            formFields() {
                this.fields.catergory_id        = "";
                this.fields.brand_id            = "";
                this.fields.name                = "";
                this.fields.stock               = "";
                this.fields.price               = "";
                this.fieldsFeatures.header      = "";
                this.fieldsFeatures.body        = "";
                this.errors                     = {};
                this.errorsFeatures             = {};
                this.showAdd                    = false;
            },

			// tabs controls settings
			showProductDetails() {
				this.productDetails = true;
				this.featuresDetails = false;
				this.productBtn = "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
				this.featuresBtn = "";
			},

			showFeaturesDetails() {
				if (this.disabled) {
                    this.productDetails = false;
                    this.featuresDetails = true;
                    this.featuresBtn = "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
                    this.productBtn = "";
                    this.paymentsBtn = "";
                } else {
                    this.flashShow('Fill in the details of page 1 first', 'danger')
                }
			},

            reload() {
                this.formInfo = utilities.loaded(this);
            },

            flashLoad() {
                this.showFeaturesDetails();
                this.flashMessage = 'Product: ' + this.newProduct.name + ' created successfully!';
                this.flashTimed(this.flashMessage, 'success', 20000);
            },

            addBrand() {
                this.catergories.forEach(catergory => {
                    if (catergory.id == this.fields.catergory_id) {
                        this.cat = catergory;
                        console.log(this.cat);
                    }
                });
                this.$emit('add', this.cat);
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