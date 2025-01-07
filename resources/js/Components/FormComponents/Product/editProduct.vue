<template>
    <div class="col-md-12">
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
                        <button :class="['inline-block', 'px-4','pb-2', 'rounded-t-lg', 'border-b-2', 'border-transparent', 'hover:text-gray-600', 'hover:border-gray-700', 'dark:hover:text-gray-300', 'text-gray-500', 'dark:text-gray-400', , 'dark:border-gray-700', 'dark:hoverborder-gray-300', 'border-gray-300 ', this.productBtn]" id="product-tab" data-tabs-target="#product" type="button" aria-controls="product" @click="showProductDetails">1. Edit Product</button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button :class="['inline-block', 'px-4','pb-2', 'rounded-t-lg', 'border-b-2', 'border-transparent', 'hover:text-gray-600', 'hover:border-gray-700', 'dark:hover:text-gray-300', 'text-gray-500', 'dark:text-gray-400', 'dark:border-gray-700', 'dark:hoverborder-gray-300', 'border-gray-300 ', this.thumbnailBtn]" data-tooltip-target="thumbnailDetailsTooltip" type="button" @click="showThumbnailDetails">
                            2. Edit Thumbnail
                        </button>
                        <div id="thumbnailDetailsTooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-800">
                            Upload New Thumbnail.
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button :class="['inline-block', 'px-4','pb-2', 'rounded-t-lg', 'border-b-2', 'border-transparent', 'hover:text-gray-600', 'hover:border-gray-700', 'dark:hover:text-gray-300', 'text-gray-500', 'dark:text-gray-400', 'dark:border-gray-700', 'dark:hoverborder-gray-300', 'border-gray-300 ', this.photosBtn]" data-tooltip-target="photosDetailsTooltip" type="button" @click="showPhotosDetails">
                            3. Edit Photos
                        </button>
                        <div id="photosDetailsTooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-800">
                            Add/Delete New Photos
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
                                <label for="catergory_id" v-if="errors && errors.catergory_id" :class="[formInfo.labelErrorclass]">Select Product Catergory <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="catergory_id" v-else :class="[formInfo.labelclass]">Select Product Catergory <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <select id="catergory_id" name="catergory_id" v-model="fields.catergory_id" :class="[formInfo.inputclass, 'option-font']">
                                    <option selected :value="fields.catergory_id" @click="getBrand(product.catergory_id)">{{ this.catfile.name }}</option>
                                    <option v-for="catergory in catergories" :value="catergory.id" @click="getBrand(catergory.id)">{{ catergory.name }}</option>
                                </select>
                                <p id="helper-text-explanation" v-if="errors && errors.catergory_id" :class="[formInfo.infoText]"><b>{{ errors.catergory_id[0] }}</b></p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']"><b>Success</b></p>	
                            </div>

                            <!-- brand select -->
                            <div class="col-md-4 mt-2">
                                <label for="brand_id" v-if="errors && errors.brand_id" :class="[formInfo.labelErrorclass]">Select Product Catergory <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="brand_id" v-else :class="[formInfo.labelclass]">Select Product Brand <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <select id="brand_id" name="brand_id" v-model="fields.brand_id" :class="[formInfo.inputclass, 'option-font']">
                                    <option selected :value="fields.brand_id">{{ brandfile.name }}</option>
                                    <option v-for="brand in brands" :value="brand.id">{{ brand.name }}</option>
                                </select>
                                <p id="helper-text-explanation" v-if="errors && errors.brand_id" :class="[formInfo.infoText]"><b>{{ errors.brand_id[0] }}</b></p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']"><b>Success</b></p>	
                            </div>

                            <!-- product name  -->
                            <div class="col-md-4 mt-2">
                                <label for="name" v-if="errors && errors.name" :class="[formInfo.labelErrorclass]">Product Name <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="name" v-else :class="[formInfo.labelclass]">Product Name <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <input type="text" id="name" name="name" v-model="fields.name" :class="[formInfo.inputclass]" :placeholder="product.name">
                                <p id="helper-text-explanation" v-if="errors && errors.name" :class="[formInfo.infoText]"><b>{{ errors.name[0] }}</b></p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']"><b>Success</b></p>
                            </div>

                            <!-- product price  -->
                            <div class="col-md-6 mt-2">
                                <label for="price" v-if="errors && errors.price" :class="[formInfo.labelErrorclass]">Product Price <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="price" v-else :class="[formInfo.labelclass]">Product Price <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <input type="text" id="price" name="price" v-model="fields.price" :class="[formInfo.inputclass]" :placeholder="product.price" required>
                                <p id="helper-text-explanation" v-if="errors && errors.price" :class="[formInfo.infoText]"><b>{{ errors.price[0] }}</b></p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']"><b>Success</b></p>
                            </div>

                            <!-- product stock  -->
                            <div class="col-md-6 mt-2">
                                <label for="stock" v-if="errors && errors.stock" :class="[formInfo.labelErrorclass]">Product Stock <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="stock" v-else :class="[formInfo.labelclass]">Product Stock <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <input type="text" id="stock" name="stock" v-model="fields.stock" :class="[formInfo.inputclass]" :placeholder="product.stock" required>
                                <p id="helper-text-explanation" v-if="errors && errors.stock" :class="[formInfo.infoText]"><b>{{ errors.stock[0] }}</b></p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']"><b>Success</b></p>
                            </div>

                            <!-- product info  -->
                            <div class="col-md-12 mt-2">
                                <label for="info" v-if="errors && errors.info" :class="[formInfo.labelErrorclass]">Product info <i :class="[formInfo.iconreloadclass]"></i></label>
                                <label for="info" v-else :class="[formInfo.labelclass]">Product info <i v-if="formsuccess" :class="[formInfo.iconreloadclass]"></i></label>
                                <input type="text" id="info" name="info" v-model="fields.info" :class="[formInfo.inputclass]" :placeholder="product.info" required>
                                <p id="helper-text-explanation" v-if="errors && errors.info" :class="[formInfo.infoText]"><b>{{ errors.info[0] }}</b></p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfo.infoText, 'text-success']"><b>Success</b></p>
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
                <!-- product thumbnail panel -->
                <div v-show="thumbnailDetails" class="p-4 bg-white dark:bg-gray-700">
                    <form @submit.prevent="submit">
                        <div class="row">
                            <!-- thumbnail file -->
                            <div class="col-md-12 pt-2">
                                <label for="thumbnail" v-if="errorsThumb && errorsThumb.thumbnail" :class="[formInfoThumb.labelErrorclass]">Upload Thumbnail File <i :class="[formInfoThumb.iconreloadclass]"></i></label>
                                <label for="thumbnail" v-else :class="[formInfoThumb.labelclass]">Upload Thumbnail File <i v-if="formsuccess" :class="[formInfoThumb.iconreloadclass]"></i></label>
                                <input :class="[formInfoThumb.inputUpload]" id="thumbnail" name="thumbnail" type="file" ref="thumbnail" @change="onChangeThumbnail">
                                <i v-if="formsuccess" :class="[formInfoThumb.iconreloadclass]"></i>
                                <p id="helper-text-explanation" v-if="errorsThumb && errorsThumb.thumbnail" :class="[formInfoThumb.infoText]"><b>{{ errorsThumb.thumbnail[0] }}</b></p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfoThumb.infoText, 'text-success']"><b>Success</b></p>           		
                            </div>

                            <!-- buttons -->
                            <div class="row col-md-12 mt-2">
                                <button type="submit" :class="[formInfoThumb.bluebtnClass, 'col m-2']" @click="submitThumbnail([this.product.id,this.$refs.childComponentRef, this.$emit])">
                                    {{ formInfoThumb.buttoninfo }}  
                                    <i :class="['m-1', formInfoThumb.buttoninfoIcon]"></i>
                                </button>
                                <button type="submit" :class="[formDelete.bluebtnClass, 'col m-2']" @click="deleteThumbnail([this.product.id, this.$refs.childComponentRef, this.$emit, this.formDelete])">
                                    Delete Thumbnail 
                                    <i :class="['m-1', formDelete.buttoninfoIcon]"></i>
                                </button>
                            </div>
                        </div>      
                    </form>
                </div> 
                <!-- product photos panel -->
                <div v-show="photosDetails" class="p-4 bg-white dark:bg-gray-700">
                    <form @submit.prevent="submit">
                        <div class="row">
                            <!-- product_files -->
                            <div class="col-md-12 pt-2">
                                <label for="images" v-if="errors && errors.file" :class="[formInfoPhoto.labelErrorclass]">Upload Product Images <i :class="[formInfoPhoto.iconreloadclass]"></i></label>
                                <label for="images" v-else :class="[formInfoPhoto.labelclass]">Upload Product Images <i v-if="formsuccess" :class="[formInfoPhoto.iconreloadclass]"></i></label>
                                <input :class="[formInfoPhoto.inputUpload]" id="files" name="files[]" type="file" ref="files" @change="onChangeFile" multiple="multiple" >
                                <i v-if="formsuccess" :class="[formInfoPhoto.iconreloadclass]"></i>
                                <p id="helper-text-explanation" v-if="errors && errors.file" :class="[formInfoPhoto.infoText]"><b>{{ errors.file[0] }}</b></p>
                                <p id="helper-text-explanation" v-show="formsuccess" :class="[formInfoPhoto.infoText, 'text-success']"><b>Success</b></p>           		
                            </div>

                            <!-- buttons -->
                            <div class="row col-md-12 mt-2">
                                <button type="submit" :class="[formInfoPhoto.bluebtnClass, 'col m-2']" @click="submitProductFiles([this.product.id,this.$refs.childComponentRef, this.$emit, this.formInfo])">
                                    {{ formInfoPhoto.buttoninfo }}  
                                    <i :class="['m-1', formInfoPhoto.buttoninfoIcon]"></i>
                                </button>
                                <button type="submit" :class="[formDelete.bluebtnClass, 'col m-2']" @click="deleteImages([this.product.id, this.$refs.childComponentRef, this.$emit, this.formDelete])" v-if="this.count > 0">
                                    Delete All <b>( {{ this.count }} )</b> Images 
                                    <i :class="['m-1', formDelete.buttoninfoIcon]"></i>
                                </button>
                            </div>
                        </div>      
                    </form>
                </div>           
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
			'product',
            'catfile',
			'brandfile',
            'count'
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
				thumbnailDetails: false,
				photosDetails: false,
				productBtn: "",
				thumbnailBtn: "",
				photosBtn: "",

					// form settings
				//classes
                formInfo: [],
                formInfoThumb: [],
                formInfoPhoto: [],
                formDelete: [],

				//form
				fields: {},
                fieldsThumb: {},
                errors: {},
                errorsThumb: {},
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
                allOrders: []
			}
		},

        mounted() {
            this.formInfo       = utilities.loaded(this);
            this.formInfoThumb  = utilities.loaded(this);
            this.formInfoPhoto  = utilities.loaded(this);
            this.formDelete     = utilities.delete(this);
        },

		created() {
            this.getCatergories();
			this.showProductDetails();
			this.formFields();
		},

		methods: {
            // get Catergories on load
            getCatergories() {
                axios.get('/api/getCatergories/')
                    .then(
                    	({data}) => {
                    		this.catergories = data;
                    });
            },

            // get Brands on click
            getBrand(id) {
                axios.get('/api/getBrands/' + id)
                    .then(
                    	({data}) => {
                    		this.brands = data;
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
                // this.fields.thumbnail  = this.$refs.thumbnail.files;
                // this.fields.files       = this.$refs.thumbnail.files;
                this.errors = {};
                this.formInfo = utilities.loading(this);
                axios.put('/product/edit/'+this.product.id, this.fields)
                    .then(response => {
                        this.formKey += 1;
                        this.$emit('reloadproducts');
                        this.formInfo = utilities.success(this);
                        setTimeout(this.reload, 10000);
                        this.flashMessage = 'Product: ' + this.product.name + ' editted successfully!';
                        this.$refs.childComponentRef.flash([this.flashMessage,'bg-green-100 dark:bg-green-900']);
                })
                    .catch(error => {
                    if (error.response.status === 422) {
                        this.formInfo = utilities.failed(this);
                        this.errors = error.response.data.errors || {};
                        let message = 'Product editting Failed!';
                        this.$refs.childComponentRef.flash([message, 'bg-red-100 dark:bg-red-900']);
                    }
                });
            }, 

            // submit product thumbnail
            submitThumbnail([id, alert, emit]) { 
                // let thumberrors = this.errorsThumb;
                this.formInfoThumb = utilities.loading(this);
                // submit the fields first
                this.fieldsThumb.thumbnail  = this.$refs.thumbnail.files;

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
                    console.log(data);
                    axios
                        .post('/product/thumbnail/edit/'+ id  , data, config)
                        .then(function (res) {
                            let message = 'Thumbnail: '+ fileName + ' ( '+ fileSize +' MB ) has been uploaded Successfully!';
                            alert.flash([message, 'bg-green-100 dark:bg-green-900']);
                            emit('successthumb');
                            
                        })
                        .catch(function (err) {
                            let message = fileName + ' ( '+ fileSize +' MB ) File Upload Failure!';
                            alert.flash([message, 'bg-red-100 dark:bg-red-900']);
                            existingObj.output = err;
                            emit('failurethumb');
                        });
                });
            },

            // delete thumbnail 
            deleteThumbnail([id, alert, emit]) {
                if (confirm('ARE YOU SURE YOU WANT TO DELETE THE PRODUCT THUMBNAIL ?')) {
                    axios.delete('/product/thumbnail/delete/' + id)
                        .then(response => {
                            this.flashMessage = 'The product thumbnail has been deleted!';
                            alert.flash([this.flashMessage, 'bg-red-100 dark:bg-red-900']);
                            emit('reloadproductsfiles');
                        });
                }
            },

            // submit product files
            submitProductFiles([id, alert, emit]) { 
                this.formInfoPhoto = utilities.loading(this);
                // let seterror = this.errors;
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
                            alert.flash([message, 'bg-green-100 dark:bg-green-900']);
                            emit('reloadproductsfiles');
                        })
                        .catch(function (err) {
                            // seterror = err.response.data.errors || {};
                            let message = fileName + ' ( '+ fileSize +' MB ) File Upload Failure!';
                            alert.flash([message, 'bg-red-100 dark:bg-red-900']);
                            existingObj.output = err;
                            emit('failurefiles');
                        });
                });
            },

            // delete images 
            deleteImages([id, alert, emit]) {
                if (confirm('ARE YOU SURE YOU WANT TO DELETE ALL PRODUCT IMAGES ?')) {
                    axios.delete('/images/delete/' + id)
                        .then(response => {
                            this.flashMessage = 'All product images have been deleted!';
                            alert.flash([this.flashMessage, 'bg-red-100 dark:bg-red-900']);
                            emit('reloadproductsfiles');
                        });
                }
            },

            // get form fields
            formFields() {
                this.fields.catergory_id        = this.product.catergory_id ;
                this.fields.brand_id            = this.product.brand_id     ;
                this.fields.name                = this.product.name         ;
                this.fields.stock               = this.product.stock        ;
                this.fields.info               = this.product.info        ;
                this.fields.price               = this.product.price        ;
                this.fieldsThumb.thumbnail      = "";
                this.filesSelected              = 0;
            },

			// tabs controls settings
			showProductDetails() {
				this.productDetails = true;
				this.thumbnailDetails = false;
				this.photosDetails = false;
				this.productBtn = "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
				this.thumbnailBtn = "";
				this.photosBtn = "";
			},
            showThumbnailDetails() {
				this.productDetails = false;
				this.thumbnailDetails = true;
				this.photosDetails = false;
				this.productBtn = "";
				this.thumbnailBtn = "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
				this.photosBtn = "";
			},
            showPhotosDetails() {
				this.productDetails = false;
				this.thumbnailDetails = false;
				this.photosDetails = true;
				this.productBtn = "";
				this.thumbnailBtn = "";
				this.photosBtn = "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
			},

            reload() {
                this.formFields();
                this.formInfo       = utilities.loaded(this);
                this.formInfoThumb  = utilities.loaded(this);
                this.formInfoPhoto  = utilities.loaded(this);
            },

            failureThumb() {
                this.formInfoThumb = utilities.failed(this);
            },
            
            successThumb() {
                this.formInfoThumb = utilities.success(this);
                setTimeout(this.reload, 10000);
            },

            failurePhotos() {
                this.formInfoPhoto = utilities.failed(this);
            },
            
            successPhotos() {
                this.formInfoPhoto = utilities.success(this);
                setTimeout(this.reload, 10000);
            },

            flashLoad() {
                this.showThumbnailDetails();
                this.flashMessage = 'Product: ' + this.newProduct.name + ' created successfully!';
                this.$refs.childComponentRef2.flash([this.flashMessage,this.newProduct,'bg-green-100 dark:bg-green-900']);
            },
		}
	}
</script>