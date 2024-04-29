<template>
    <div class="card dark:border-gray-700 dark:bg-gray-700">
        <div class="dark:bg-gray-700">
            <flash 
                ref="childComponentRef"
            ></flash>
            <notify 
                ref="childComponentRef2"
            ></notify>
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center dark:bg-gray-700" id="myTab" role="tablist">
                <li class="mr-2" role="presentation">
                    <button :class="['inline-block', 'px-4','pb-2', 'rounded-t-lg', 'border-b-2', 'border-transparent', 'hover:text-gray-600', 'hover:border-gray-700', 'dark:hover:text-gray-300', 'text-gray-500', 'dark:text-gray-400', , 'dark:border-gray-700', 'dark:hoverborder-gray-300', 'border-gray-300 ', this.productBtn]" id="product-tab" data-tabs-target="#product" type="button" aria-controls="product" @click="showProductDetails">1. Product Details</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button :class="['inline-block', 'px-4','pb-2', 'rounded-t-lg', 'border-b-2', 'border-transparent', 'hover:text-gray-600', 'hover:border-gray-700', 'dark:hover:text-gray-300', 'text-gray-500', 'dark:text-gray-400', 'dark:border-gray-700', 'dark:hoverborder-gray-300', 'border-gray-300 ',this.disabledBtn, this.featuresBtn]" data-tooltip-target="featuresDetailsTooltip" type="button" @click="showFeaturesDetails" :disabled="this.disabled">
                        2. Product Features
                    </button>
                    <div id="featuresDetailsTooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-800">
                        Fill in all details within Page 1
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </li>
            </ul>
        </div>
        <div id="postProducts" :key="formKey">
            <!-- product details panel -->
            <div v-show="productDetails" class="p-4 bg-white dark:bg-gray-700">
                <form @submit.prevent="submit">
                    <div class="row">
                        <!-- catergory select -->
                        <div class="col-md-4 mt-2">
                            <label for="catergory_id" v-if="errors && errors.catergory_id" :class="[formInfo.labelErrorclass]">Product Catergory <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="catergory_id" v-else :class="[formInfo.labelclass]">Product Catergory <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <select id="catergory_id" name="catergory_id" v-model="fields.catergory_id" :class="[formInfo.inputclass, 'option-font']">
                                <option selected>Choose a Catergory</option>
                                <option v-for="catergory in catergories" :value="catergory.id" @click="getBrand(catergory.id)">{{ catergory.name }}</option>
                            </select>
                            <p id="helper-text-explanation" v-if="errors && errors.catergory_id" :class="[formInfo.infoText]">{{ errors.catergory_id[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>	
                        </div>

                        <!-- brand select -->
                        <div class="col-md-4 mt-2">
                            <section class="row">
                                <label for="brand_id" v-if="errors && errors.brand_id" :class="[formInfo.labelErrorclass, 'col inline-flex justify-between w-full']">
                                    Product Brand 
                                    <i :class="[formInfo.iconreloadclass]"></i>
                                    <span :class="[this.spanReload]" v-if="this.fields.catergory_id != ''" @click="getBrand(this.fields.catergory_id)" title="Reload Brands if nothing appears">
                                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin h-4 w-4 text-black hover:text-blue-900">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </span>
                                </label>
                                <label for="brand_id" v-else :class="[formInfo.labelclass, 'col inline-flex justify-between w-full']">
                                    Product Brand 
                                    <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i>
                                    <span :class="[this.spanReload]" v-if="this.fields.catergory_id != ''" @click="getBrand(this.fields.catergory_id)" title="Reload Brands if nothing appears">
                                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin h-4 w-4 text-black hover:text-blue-900">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </span>
                                </label>
                                <span class="bg-blue-600 text-white text-sm font-normal p-1 rounded dark:bg-blue-900 dark:text-blue-300 shadow hover:bg-black hover:text-white hover:shadow-md mb-1 cursor-pointer text-center uppercase" @click="addBrand" v-if="this.fields.catergory_id != '' && this.showAdd == true">
                                    Add Brand
                                </span>
                            </section>
                            <select id="brand_id" name="brand_id" v-model="fields.brand_id" :class="[formInfo.inputclass, 'option-font']" @click="getBrand(this.fields.catergory_id)">
                                <option v-if="this.fields.catergory_id == ''" selected>
                                    SELECT A CATERGORY FIRST
                                </option>
                                <option selected v-if="this.fields.catergory_id != ''">
                                    Choose a Brand
                                </option>
                                <option v-if="this.fields.catergory_id != '' && this.brands.length == 0">
                                    CATERGORY HAS NO BRANDS
                                </option>
                                <option v-for="brand in brands" :value="brand.id" v-if="this.fields.catergory_id != '' && this.brands.length != 0">
                                    {{ brand.name }}
                                </option>
                            </select>
                            <p id="helper-text-explanation" v-if="errors && errors.brand_id" :class="[formInfo.infoText]">{{ errors.brand_id[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>	
                        </div>

                        <!-- product name  -->
                        <div class="col-md-4 mt-2">
                            <label for="name" v-if="errors && errors.name" :class="[formInfo.labelErrorclass]">Product Name <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="name" v-else :class="[formInfo.labelclass]">Product Name <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="name" name="name" v-model="fields.name" :class="[formInfo.inputclass]" placeholder="Enter Product Name">
                            <p id="helper-text-explanation" v-if="errors && errors.name" :class="[formInfo.infoText]">{{ errors.name[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>

                        <!-- product price  -->
                        <div class="col-md-6 mt-2">
                            <label for="price" v-if="errors && errors.price" :class="[formInfo.labelErrorclass]">Product Price <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="price" v-else :class="[formInfo.labelclass]">Product Price <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="price" name="price" v-model="fields.price" :class="[formInfo.inputclass]" placeholder="Enter Product Price">
                            <p id="helper-text-explanation" v-if="errors && errors.price" :class="[formInfo.infoText]">{{ errors.price[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>

                        <!-- product stock  -->
                        <div class="col-md-6 mt-2">
                            <label for="stock" v-if="errors && errors.stock" :class="[formInfo.labelErrorclass]">Product Stock <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="stock" v-else :class="[formInfo.labelclass]">Product Stock <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input type="text" id="stock" name="stock" v-model="fields.stock" :class="[formInfo.inputclass]" placeholder="Enter Product Stock Amnt">
                            <p id="helper-text-explanation" v-if="errors && errors.stock" :class="[formInfo.infoText]">{{ errors.stock[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                        </div>

                        <!-- thumbnail file -->
                        <div class="col-md-6 pt-2">
                            <label for="thumbnail" v-if="errors && errors.thumbnail" :class="[formInfo.labelErrorclass]">Upload Thumbnail File <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="thumbnail" v-else :class="[formInfo.labelclass]">Upload Thumbnail File <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="thumbnail" name="thumbnail" type="file" ref="thumbnail" @change="onChangeThumbnail">
                            <p id="helper-text-explanation" v-if="errors && errors.thumbnail" :class="[formInfo.infoText]">{{ errors.thumbnail[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>           		
                        </div>

                        <!-- product_files -->
                        <div class="col-md-6 pt-2">
                            <label for="images" v-if="errors && errors.files" :class="[formInfo.labelErrorclass]">Upload Product Images <i :class="[formInfo.iconreloadclass]"></i></label>
                            <label for="images" v-else :class="[formInfo.labelclass]">Upload Product Images <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="files" name="files[]" type="file" ref="files" @change="onChangeFile" multiple="multiple">
                            <p id="helper-text-explanation" v-if="errors && errors.files" :class="[formInfo.infoText]">{{ errors.files[0] }}</p>
                            <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>           		
                        </div>

                        <!-- buttons -->
                        <div class="col-md-12 mt-2">
                            <button type="submit" :class="[formInfo.bluebtnClass]" @click="submitProduct">
                                {{ formInfo.buttoninfo }}  
                                <i :class="['m-1', formInfo.buttoninfoIcon]"></i>
                            </button>
                        </div>
                    </div>      
                </form>
            </div>
            <!-- product features panel -->
            <div v-show="featuresDetails" class="p-4 bg-white dark:bg-gray-700">
                <form @submit.prevent="submit">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="text-lg  text-gray-900 dark:text-white underline title uppercase text-center">
                                Enter Features for {{ this.newProduct.name }}.
                            </h3>
                        </div>
                        <!-- product features  -->
                        <div class="col-md-12 row mb-2">
                            <!-- feature header  -->
                            <div class="col m-2">
                                <label for="header" v-if="errorsFeatures && errorsFeatures.header" :class="[formInfo.labelErrorclass]">Product Features <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="header" v-else :class="[formInfo.labelclass]">Features Header <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <input type="text" id="header" name="header" v-model="fieldsFeatures.header" :class="[formInfo.inputclass]" placeholder="Feature header eg RAM">
                                <p id="helper-text-explanation" v-if="errorsFeatures && errorsFeatures.header" :class="[formInfo.infoText]">{{ errorsFeatures.header[0] }}</p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                            </div>
                            <!-- feature body  -->
                            <div class="col m-2">
                                <label for="body" v-if="errorsFeatures && errorsFeatures.body" :class="[formInfo.labelErrorclass]">Product Features <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="body" v-else :class="[formInfo.labelclass]">Product Features <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <input type="text" id="body" name="body" v-model="fieldsFeatures.body" :class="[formInfo.inputclass]" placeholder="Feature Body eg 8GB">
                                <p id="helper-text-explanation" v-if="errorsFeatures && errorsFeatures.body" :class="[formInfo.infoText]">{{ errorsFeatures.body[0] }}</p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']">Success</p>
                            </div>
                        </div>

                        <!-- buttons -->
                        <div class="col-md-12">
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

                // classes
                spanReload:         'mb-1 cursor-pointer',
                successFlash:       'bg-green-400 dark:bg-green-900 border border-green-900 text-white',
                infoFlash:          'bg-teal-400 dark:bg-teal-900 border border-teal-900 text-white',
                dangerFlash:        'bg-rose-400 dark:bg-rose-900 border border-rose-900 text-white',
			}
		},

        mounted() {
            this.formInfo = utilities.loaded(this);
        },

		created() {
            this.getCatergoriesLoad();
			this.showProductDetails();
			this.formFields();
		},

		methods: {
            // get Catergories on load
            getCatergoriesLoad() {
                return this.catergories = JSON.parse(JSON.stringify(this.getcatergory));  
            },

            // get Brands on click
            getBrand(id) {
                // close any flash 
                this.$refs.childComponentRef.hide();

                // if-else condition 
                if (id == '') {
                    // message if empty
                    let info = 'Select a catergory first!';
                    this.$refs.childComponentRef.flash([info, this.dangerFlash]);
                } else {
                    // message 
                    let info = 'Loading!';
                    this.$refs.childComponentRef.flash([info, this.infoFlash]);
                    // load info 
                    axios.get('/api/getBrands/' + id)
                        .then(
                            ({data}) => {
                                this.brands = data;
                                if (this.brands.length == 0) {
                                    this.showAdd        = true;
                                    this.spanReload     = 'mb-1 cursor-pointer';
                                    this.flashMessage   = 'Brands Loaded ( Count: ' + this.brands.length + ')';
                                } else {
                                    this.showAdd        = false;
                                    this.spanReload     = 'mb-1 cursor-pointer flex justify-end';
                                    // if equal to or not equal to one 
                                    if (this.brands.length != 1) {
                                        this.flashMessage = 'Brands Loaded ( Count: ' + this.brands.length + ')';
                                    } else {
                                        this.flashMessage = 'Brand  Loaded ( Count: ' + this.brands.length + ')';
                                    }
                                }
                                // close any flash 
                                this.$refs.childComponentRef.hide();
                                // show message 
                                this.$refs.childComponentRef.flashTimed([this.flashMessage, this.successFlash, 20000]);
                        });
                }
            },

            // get latest product on submission
            getProduct() {
                axios.get('/api/getNewProduct/')
                    .then(
                    	({data}) => {
                    		this.newProduct = data;
                    });
            },

            // on thumbnail change 
            onChangeThumbnail(event) {
                this.fileSelected = event.target.files.length;
                this.thumbnail_file = this.$refs.thumbnail.files;
                this.disabledBtn = "";
                this.disabled = false;
                console.log('Uploaded Thumbnail', this.thumbnail_file);  
                // this.submitFile();     
            },

            // on file selection change 
            onChangeFiles(event) {
                // this.filesSelected = event.target.files.length;
                this.files = this.$refs.files.files;
                this.disabledBtn = "";
                this.disabled = false;
                console.log('Uploaded Files', this.files);  
                // this.submitFile();     
            },

            // submit product 
            submitProduct() {
                // submit the fields first
                this.fields.thumbnail  = this.$refs.thumbnail.files;
                this.fields.files       = this.$refs.thumbnail.files;
                this.errors = {};
                this.formInfo = utilities.loading(this);
                axios.post('/product/add', this.fields)
                    .then(response => {
                        // console.log(response);
                        this.getProduct();
                        this.formFields();
                        // this.loadcomplete();
                        this.submitThumbnail([response.data[2],this.$refs.childComponentRef]);
                        this.submitProductFiles([response.data[2],this.$refs.childComponentRef, this.flashLoad]);
                        this.formInfo = utilities.success(this);
                        setTimeout(this.reload, 10000);
                        this.formKey += 1;
                        this.$emit('reloadproducts');
                })
                    .catch(error => {
                    if (error.response.status === 422) {
                        // this.formfailure();
                        this.formInfo = utilities.failed(this);
                        this.errors = error.response.data.errors || {};
                        let message = 'Product adding Failed!';
                        this.$refs.childComponentRef.flash([message, this.dangerFlash]);
                    }
                });
            }, 

            // submit product thumbnail
            submitThumbnail([id, alert]) { 
                // setTimeout(this.getOrder, 2000);
                let existingObj = this;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                Array.prototype.forEach.call(this.$refs.thumbnail.files, function(file) {
                    // get file name
                    let fileName = file.name;
                    // get file size
                    let fileSize    = Number(file.size / 1000000).toFixed(2);
                    let fileData    = file;
                    let data        = new FormData();
                    data
                        .append('thumbnail', fileData);
                    axios
                        .post('/product/thumbnail/add/'+id  , data, config)
                        .then(function (res) {
                            let message = 'Thumbnail: '+ fileName + ' ( '+ fileSize +' MB ) has been uploaded Successfully!';
                            let success   = 'bg-green-400 dark:bg-green-900 border border-green-900 text-white';
                            alert.flashTimed([message, success, 20000]);
                            // setTimeout(load, 10000);
                        })
                        .catch(function (err) {
                            let message = fileName + ' ( '+ fileSize +' MB ) File Upload Failure!';
                            let danger = 'bg-rose-400 dark:bg-rose-900 border border-rose-900 text-white';
                            alert.flash([message, danger]);
                            existingObj.output = err;
                        });
                });
            },

            // submit product files
            submitProductFiles([id, alert, load]) { 
                let existingObj = this;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                Array.prototype.forEach.call(this.$refs.files.files, function(file) {
                    // get file name
                    let fileName = file.name;
                    // get file size
                    let fileSize    = Number(file.size / 1000000).toFixed(2);
                    let fileData    = file;
                    let data        = new FormData();
                    data
                        .append('file', fileData);
                    axios
                        .post('/product/files/add/'+id  , data, config)
                        .then(function (res) {
                            let message = fileName + ' ( '+ fileSize +' MB ) has been uploaded Successfully!';
                            let success = 'bg-green-400 dark:bg-green-900 border border-green-900 text-white';
                            alert.flashTimed([message, success, 20000]);
                            setTimeout(load, 10000);
                            
                        })
                        .catch(function (err) {
                            let message = fileName + ' ( '+ fileSize +' MB ) File Upload Failure!';
                            let danger = 'bg-rose-400 dark:bg-rose-900 border border-rose-900 text-white';
                            alert.flash([message, danger]);
                            existingObj.output = err;
                        });
                });
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
                        this.$refs.childComponentRef.flash([message, this.successFlash]);
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
                        this.$refs.childComponentRef.flash([message, this.successFlash]);
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
				this.productDetails = false;
				this.featuresDetails = true;
				this.featuresBtn = "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
				this.productBtn = "";
				this.paymentsBtn = "";
			},

            reload() {
                this.formInfo = utilities.loaded(this);
            },

            flashLoad() {
                this.showFeaturesDetails();
                this.flashMessage = 'Product: ' + this.newProduct.name + ' created successfully!';
                this.$refs.childComponentRef2.flashTimed([this.flashMessage,this.newProduct, this.successFlash, 20000]);
            },

            addBrand() {
                this.catergories.forEach(catergory => {
                    if (catergory.id == this.fields.catergory_id) {
                        this.cat = catergory;
                        console.log(this.cat);
                    }
                });
                this.$emit('add', this.cat);
            }
		}
	}
</script>