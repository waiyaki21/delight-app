<style>
    .swiper-slide{
        opacity: 0;
        visibility: hidden;
    }
    .swiper-slide-active{
    opacity: 1;
        visibility: visible;
    }
</style>

<template>
    <div>
        <flash 
            ref             ="childComponentRef"
        ></flash>
        <cartflash 
            v-if            = "this.logged == true"
            v-bind:user     = "user"
            ref             = "cartflashComponent"
        ></cartflash>
        <loading-body
            v-if="isloading == true"
        ></loading-body>
        <div class="w-full bg-gray-100 dark:bg-gray-900 max-h-full" v-else>
            <div class="grid grid-cols-1 md:grid-cols-12 m-4 py-2">
                <!-- product pictures carousel  -->
                <productCarousel
                    :images="images"
                    :modules="modules"
                    :admin="admin"
                    @delete-image="deleteImage"
                />

                <!-- product pictures info  -->
                <div class="col-span-1 md:col-span-7">
                    <section class="admin-section flex-col" v-if = "this.admin">
                        <!-- options  -->
                        <div class="grid grid-cols-2 md:grid-cols-4 rounded" role="group">
                                <button type="button" :class="this.actionBtnClass, 'col-span-1'" @click="editProduct(product)">
                                    Edit
                                    <edit-icon class="mx-2 h-4 w-4"></edit-icon>
                                </button>
                                <button type="button" :class="this.actionBtnClass, 'col-span-1'" @click="editProductThumbnail()">
                                    Edit Thumbnail
                                    <camera-icon class="mx-2 h-4 w-4"></camera-icon>
                                </button>
                                <button type="button" :class="this.actionBtnClass, 'col-span-1'" @click="addProductPictures()">
                                    Add Photos
                                    <photo-icon class="mx-2 h-4 w-4"></photo-icon>
                                </button>
                                <button type="button" :class="this.actionBtnClass, 'col-span-1'" @click="deleteProduct(product)">
                                    Delete Product
                                    <delete-icon class="mx-2 h-4 w-4"></delete-icon>
                                </button>
                        </div>

                        <!-- click to copy -->
                        <blockquote class="w-full p-1 my-1 border-2 border-gray-600 hover:border-yellow-200 bg-gray-50 hover:bg-gray-900 dark:border-gray-500 dark:bg-gray-800 inline-flex justify-between rounded-md text-gray-900 hover:text-yellow-200 cursor-pointer px-4 py-1.5" title="Click to Copy!" @click="copyUrl">
                            <p class="text-base hover:italic font-normal leading-relaxed">
                                {{ this.link }}
                            </p>
                            <a class="cursor-pointer" title="Click to Copy!" @click="copyUrl">
                                <share-icon class="h-6 w-6"></share-icon>
                            </a>
                        </blockquote>
                    </section>
                    <!-- product information  -->
                    <p class="uppercase text-xl text-muted">{{ brand.name }}</p>
                    <p class="uppercase text-4xl">{{ product.name }}</p>
                    <p class="uppercase text-4xl mt-2 text-gray-500">ksh {{ Number(product.price).toLocaleString() }}.00</p>
                    <p class="text-lg my-1 text-gray-900">{{ product.info }}</p>
                    <hr class="my-2">
                    <!-- product models  -->
                    <div class="w-full inline-flex mb-2">
                        <span v-for="model in models" :class="[model.is_selected ? selectedBtnClass : actionBtnClass, 'inline-flex justify-center space-x px-2 py-0.5']" @click="selectModel(model)">
                            <span class="font-normal text-base px-2">{{ model.name }}.</span>
                            <div :class="['divider px-1 h-[50%] my-auto', model.is_selected ? 'group-hover:text-gray-900 text-white' : 'text-gray-900 group-hover:text-white']" v-if = "this.admin"></div>
                            <a class="text-center uppercase text-red-600 font-normal text-base my-auto cursor-pointer px-1" @click.stop="deleteModel(model)" v-if = "this.admin" v-tooltip="$tooltip(`Delete Products Models`, 'top')">
                                <delete-icon class="h-4 w-4"></delete-icon>
                            </a>
                        </span>
                    </div>
                    <!-- amnt in and left  -->
                    <p class="uppercase text-sm text-danger inline-flex">
                        <p class="uppercase text-sm text-success px-1 inline-flex gap-1">
                            <check-icon class="h-4 w-4"></check-icon>
                            {{ product.stock }} In Stock.
                        </p>
                        <div class="divider h-6"></div>
                        <p class="uppercase text-sm text-danger inline-flex gap-1">
                            <clock-icon class="h-4 w-4"></clock-icon>
                            {{ product.stock - this.quantity }} <span class="pl-1"> Left.</span>
                        </p>
                    </p>
                    <!-- not logged in  -->
                    <div v-if="!this.logged">
                        <a :class="this.cartBtn" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" @click="showAuthModal()">
                            Add to cart.
                            <shopping-icon class="mx-2 h-6 w-6"></shopping-icon>
                        </a>
                    </div>
                    <!-- logged in  -->
                    <div v-else class="w-full inline-flex mb-2">
                        <!-- quantity counter  -->
                        <div class="inline-flex mx-4" role="group">
                            <button type="button" :class="[this.btnClass, this.minusBtnClass]" @click="minusQuantity()">
                                <minus-icon class="mx-1 h-5 w-5"></minus-icon>
                            </button>
                            <button :class="[this.qtyClass]">
                                {{ Number( this.quantity ).toLocaleString() }}
                            </button>
                            <button type="button" :class="[this.btnClass, this.addBtnClass]" @click="addQuantity(product)">
                                <plus-icon class="mx-1 h-5 w-5"></plus-icon>
                            </button>
                        </div>

                        <!-- add to cart  -->
                        <a :class="[this.cartBtn, this.cartActive ? 'cursor-pointer' : 'cursor-not-allowed']" v-if="this.in_stock && !this.in_cart" @click="addToCart(product)">
                            Add to cart
                            <shopping-icon class="mx-2 h-6 w-6"></shopping-icon>
                        </a>

                        <!-- remove from cart  -->
                        <a :class="this.cartBtn" v-if="this.in_stock && this.in_cart" @click="removeFromCart(product)">
                            Remove from cart
                            <shopping-icon class="mx-2 h-6 w-6"></shopping-icon>
                        </a>

                        <!-- Out of stock  -->
                        <a :class="this.stockOutBtn" v-if="!this.in_stock">
                            Out of Stock
                            <stop-icon class="mx-2 h-6 w-6"></stop-icon>
                        </a>
                    </div>
                    <hr class="my-2">
                    <!-- add product extra info  -->
                    <p class="uppercase text-xl text-muted mb-2 flex" v-if = "this.admin">
                        <span :class="this.actionBtnClass" @click="showFeatureModal" >
                            Add Features
                            <plus-icon class="mx-2 h-4 w-4"></plus-icon>
                        </span>
                        <span :class="this.actionBtnClass" @click="showDescriptionModal">
                            <!-- v-if = "!description.length" -->
                            Add Description
                            <plus-icon class="mx-2 h-4 w-4"></plus-icon>
                        </span>
                        <span :class="this.actionBtnClass" @click="showModelModal">
                            <!-- v-if = "!description.length" -->
                            Add Model Types
                            <plus-icon class="mx-2 h-4 w-4"></plus-icon>
                        </span>
                    </p>
                    <!-- feature table  -->
                    <div class="relative overflow-x-auto col-md-12">
                        <p class="uppercase text-xl text-muted underline mb-2 flex">
                            {{ product.name }} Features.
                        </p>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="feature in features">
                                    <th scope="row" class="py-1 px-2 font-normal text-lg underline text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ feature.header }} :
                                    </th>
                                    <td class="p-1 uppercase">
                                        {{ feature.body }}
                                    </td>
                                    <td class="p-1 uppercase" v-if = "this.admin">
                                        <div class="inline-flex rounded" role="group">
                                            <button type="button" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-red-800 hover:text-white font-normal text-sm p-1 ml-2  cursor-pointer shadow inline-flex justify-between" @click="deleteFeature(feature)">
                                                Delete
                                                <delete-icon class="mx-2 h-4 w-4"></delete-icon>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- feature description  -->
                    <div class="relative overflow-x-auto col-md-12">
                        <p class="uppercase text-xl text-muted underline mb-2 flex">
                            {{ product.name }} Description.
                        </p>
                        <div v-for="desc in description" class="my-1 border-b border-gray-200">
                            <p class="text-gray-800 text-xl uppercase underline mb-2 inline-flex justify-between"> 
                                {{ desc.header }}. 
                                <div class=" inline-flex mx-2" v-if = "this.admin"> 
                                    <a class="text-center uppercase text-blue-600 font-normal text-base p-1 py-2 cursor-pointer" @click="editDesc(desc)">
                                        <edit-icon class="h-4 w-4"></edit-icon>
                                    </a>
                                    <a class="text-center uppercase text-red-600 font-normal text-base p-1 py-2 cursor-pointer" @click="deleteDesc(desc)">
                                        <delete-icon class="h-4 w-4"></delete-icon>
                                    </a>
                                </div>
                            </p>
                            <p class="text-gray-800 text-lg" v-html="desc.body"></p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

        <!-- add product modal  -->
        <featureModal
            v-show              = "openModal"
            v-bind:product      = "product"
            @closemodal         = "showFeatureModal"
            @reloadfeature      = "getProduct"
            @flash              = "flashShow"
            ref 			    = "featureRef" 
        ></featureModal>

        <!-- add description modal  -->
        <descriptionModal
            v-show              = "openDescriptionModal"
            v-bind:product      = "product"
            @closemodal         = "showDescriptionModal"
            @reloaddescription  = "getProduct"
            @flash              = "flashShow"
            ref 			    = "descriptionRef" 
        ></descriptionModal>

        <!-- add model modal  -->
        <modelModal
            v-show              = "openModelModal"
            v-bind:product      = "product"
            @closemodal         = "showModelModal"
            @reloadmodel        = "getProduct"
            @flash              = "flashShow"
            ref 			    = "modelRef" 
        ></modelModal>

        <!-- edit description modal  -->
        <!-- <editDescriptionModal
            v-show              = "openEditDescriptionModal"
            @closemodal         = "showEditDescriptionModal"
            @reloaddescription  = "getProduct"
            ref 			    = "editDescriptionRef" 
        ></editDescriptionModal> -->

        <!-- edit product modal  -->
        <editProductModal
            v-show              = "openEditModal"
            v-bind:product      = "product"
            v-bind:catergory    = "catergory"
            v-bind:brand        = "brand"
            v-bind:count        = "number"
            @closemodal         = "editProduct"
            @reloadproduct      = "reload"
            @reloadImages       = "getImages"
            @flash              = "flashShow"
            ref 			    = "editProductRef" 
        ></editProductModal>

        <!-- auth modal  -->
        <authModal
            v-show              = "openAuthModal"
            v-bind:product      = "product"
            @reloaduser         = "reloadUser"
            @closemodal         = "showAuthModal"
            @flash              = "flashShow"
            ref 			    = "authRef" 
        ></authModal>  
    </div>

    <!-- footer  -->
    <footer-body></footer-body>
    <!-- end footer  -->
</template>

<script>
    import featureModal           from '../modalComponents/featureModals/feature-modal.vue';
    import descriptionModal       from '../modalComponents/descriptionModals/description-modal.vue';
    import modelModal             from '../modalComponents/modelModals/model-modal.vue';
    // import editDescriptionModal   from '../modalComponents/descriptionModals/editDescription-modal.vue';
    import editProductModal       from '../modalComponents/productModals/editProduct-modal.vue';
    import authModal 	          from '../ModalComponents/authModals/auth-modal.vue';
    import flash                  from '../AlertComponents/flash-simple.vue';
    import cartflash              from '../AlertComponents/flash-cart.vue';
    import productCarousel        from './carousel/productCarousel.vue';

    export default {
        props: [
            'url',
        ],

        data() {
            return {
                // load 
                isloading: true,

                // auth datasets 
                user:           {},
                logged:         '',
                admin:          '',

                // product datasets 
                product:        {},
                brand:          {},
                images:         {},
                catergory:      {},
                features:       [],
                quantity:       '',
                number:         '',
                description:    [],
                in_cart:        false,
                in_stock:       false,
                //  cart check item
                dup_items      : false,
                dup_count      : '',
                dup_itemsTotal : '',

                // alert datasets 
                flashMessage:   "",

                //fields
                fields: {},

                // modals 
                openModal: false,
                openEditModal: false,
                openAuthModal: false,
                openDescriptionModal: false,
                openEditDescriptionModal: false,
                openModelModal: false,

                // btn info 
                btnClass: "mx-1 inline-flex items-center p-1 text-sm font-medium text-gray-900 bg-white border border-gray-500 hover:bg-gray-900 hover:text-white focus:z-10 shadow rounded-md hover:shadow-md",
                addBtnClass: "",
                minusBtnClass: "",

                link: '',
                actionBtnClass: 'group text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white font-normal text-sm p-1 ml-2  cursor-pointer shadow inline-flex justify-between rounded-md hover:shadow-md',
                cartBtn: 'w-full uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-200 font-medium text-lg px-4 py-2 mr-2 shadow inline-flex justify-center rounded-md hover:shadow-md',
                qtyClass: 'inline-flex items-center p-2 text-lg font-medium text-gray-900 bg-white border border-gray-500 focus:z-10 cursor-auto rounded-md',
                selectedBtnClass: 'group text-center uppercase text-white bg-green-700 border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-gray-900 font-normal text-sm p-1 ml-2 cursor-pointer shadow inline-flex justify-between rounded-md hover:shadow-md',
                stockOutBtn: 'w-full uppercase text-gray-900 bg-red-600 border border-red-600 hover:bg-red-600 hover:text-black font-medium text-lg px-5 py-2.5 mr-2 mb-2  cursor-pointer shadow inline-flex justify-center',

                selectedModel_id: null,
                cartActive: false,
            }
        },

        components: {
            flash,
            cartflash,
            featureModal,
            descriptionModal,
            // editDescriptionModal,
            editProductModal,
            authModal,
            productCarousel,
            modelModal
        },

        beforeMount() {
            this.isloading = true;
            this.getUser();
            this.getProduct();
        },

        methods: {
            loaded() {
                this.isloading = false;
                // this.scrollTo();
            },

            scrollTo() {
                window.scrollTo(0, 1);
                window.scrollTo(0, 0);
            },

            async copyUrl() {
                let mytext = this.link;
                try {
                    await navigator.clipboard.writeText(mytext);
                    this.flashMessage = 'Copied!';
                    this.flashShow(this.flashMessage,'success');
                } catch($e) {
                    this.flashMessage = 'Cannot copy!';
                    this.flashShow(this.flashMessage,'danger');
                }
            },

            getUser() {
                axios.get('/getUser/')
                    .then(
                    	({data}) => {
                    		this.user   = data[0]
                            this.logged = data[1]
                            this.admin  = data[2]
                    });
            },

            reloadUser() {
                this.getUser();
                this.$emit('reloaduser');
            },

            getImages() {
                let product_id = this.$route.params.id;
                axios.get('/api/getProduct/'+ product_id)
                    .then(
                    	({data}) => {
                            this.images     = data[2];
                            this.number     = this.images.length;
                            // this.loaded();
                    });
            },

            getProduct() {
                let product_id = this.$route.params.id;
                let hreflink   = this.$route.path;

                this.link      = this.url + hreflink;
                axios.get('/api/getProduct/'+ product_id)
                    .then(
                    	({data}) => {
                    		this.product    = data[0]
                            this.brand      = data[1]
                            this.images     = data[2]
                            this.number     = data[2].length;
                            this.catergory  = data[3]
                            this.features   = data[4]
                            this.description= data[5]
                            this.models     = this.updatedModels(data[6]);

                            if (this.product.stock > 0) {
                                this.in_stock = true;
                            } else {
                                this.in_stock = false;
                            }

                            if (!this.models) {
                                this.selectedModel_id = null;
                                this.cartActive       = true;
                            }
                            
                            this.quantity   = '1';
                            this.quantityVal();
                            this.cartCheck(data[0]);
                            this.loaded();
                            this.scrollTo();
                    });
            },

            // Add is_selected to each model
            updatedModels(infos) {
                return infos.map(model => ({
                    ...model,
                    is_selected: model.is_selected || false, // Default to `false` if not set
                }));
            },

            selectModel(model) {
                // Step 1: Deselect all other models
                this.models.forEach(m => {
                    if (m.is_selected) m.is_selected = false;
                });

                // Step 2: Set the passed model as selected
                model.is_selected = true;

                // Step 3: Update the selectedModel_id variable
                this.selectedModel_id = model.id;

                // Step 4: Set cartActive based on whether any model is selected
                this.cartActive = this.models.some(m => m.is_selected);

                // Optional: Force a re-render if necessary
                this.$forceUpdate(); 
                this.flashShow(`${model.name} ${this.product.name} Selected!`, 'cart'); 
            },

            cartCheck(product) {
                axios.get('/cartCheck/'+product.id)
                	.then(
                        ({data}) => {
                        this.dup_items      = data[0];
                        this.dup_count      = data[1];
                        this.dup_itemsTotal = data[2];
                        if (this.dup_count >= 1) {
                            this.in_cart = true;
                        } else {
                            this.in_cart = false;
                        }
                	})
            },

            quantityVal() {
                if (this.quantity > '0' ) {
                    this.addBtnClass = "cursor-pointer";
                }

                if (this.quantity <= 1 ) {
                    this.minusBtnClass = "cursor-not-allowed";
                } else {
                    this.minusBtnClass = "cursor-pointer";
                }
            },

            addQuantity(product){
                if (this.quantity == product.stock ) {
                    this.flashMessage = 'Maximum No of Stock Reached!';
                    this.flashShow(this.flashMessage,'danger');
                    this.addBtnClass = "cursor-not-allowed";
                } else {
                    let qty = this.quantity++;
                    this.quantityVal();
                }
            },

            minusQuantity(){
                if (this.quantity == 1 ) {
                    this.flashMessage = 'Sorry, Cant go Below One!';
                    this.flashShow(this.flashMessage,'danger');
                    this.quantityVal();
                } else {
                    let qty = this.quantity--;
                    this.quantityVal();
                }
            },

            reload() {
                axios.get('/api/getProduct/'+ this.product.id)
                    .then(
                    	({data}) => {
                    		this.product    = data[0]
                            this.brand      = data[1]
                            this.images     = data[2]
                            this.number     = data[2].length;
                            this.catergory  = data[3]
                            this.features   = data[4]
                            this.description= data[5]
                            this.models     = this.updatedModels(data[6])
                            
                            this.quantity   = '1';
                            this.quantityVal();
                            this.cartCheck(data[0]);
                            this.loaded();

                            if (!this.models) {
                                this.selectedModel_id = null;
                                this.cartActive       = true;
                            }

                            if (this.selectedModel_id) {
                                this.reselectModel(this.selectedModel_id)
                            }
                    });
            },

            reselectModel(id) {
                this.models.forEach(m => {
                    if (m.is_selected) m.is_selected = false;
                });

                const model = this.models.find(m => m.id === id);
                if (model) {
                    model.is_selected = true; // Set the flag to true to trigger the exit animation

                    // Step 3: Update the selectedModel_id variable
                    this.selectedModel_id = model.id;

                    // Step 4: Set cartActive based on whether any model is selected
                    this.cartActive = this.models.some(m => m.is_selected);
                }

                // Optional: Force a re-render if necessary
                this.$forceUpdate();
            },

        	addToCart(product) {
                if (!this.selectedModel_id) {
                    this.flashShow('Select a product option', 'cart');
                } else {
                    if (this.dup_count >= 1) {
                        let message = 'This item is already in your cart!';
                        this.flashShow(message, 'success');
                    } else {
                        this.fields.product_quantity = this.quantity;
                        axios.post('/cart/add/'+product.id, this.fields)
                            .then(response => {
                                let data = response.data;
                                this.in_cart = true;
                                this.$emit('cartinfo', this.user);
                                this.getProduct();
                                let message = product.name + ' : added to cart!';
                                this.$refs.cartflashComponent.flash([message, product, 'bg-green-100 dark:bg-green-900']);
                            })
                    }
                }
        	},

            removeFromCart(product) {
                axios.get('/cart/remove/'+product.id)
                	.then(response => {
                		let data = response.data;
                        this.in_cart = false;
                		this.$emit('cartinfo', this.user);
                        this.getProduct();
                        let message = 'Item removed from cart!';
                        this.flashShow(message, 'danger');
                	})
            },

            // delete feature 
            deleteFeature(feature) {
                if(confirm('ARE YOU SURE YOU WANT TO DELETE: ' + feature.header + ' : ' + feature.body + '?'))
			   	{
			   		let name = feature.header + ' : ' + feature.body;
	                axios.delete('/feature/delete/'+feature.id)
	                    .then(response => {
	                    	this.flashMessage = 'The feature: ' + name + ' has been deleted!';
	                    	this.flashShow(this.flashMessage, 'danger');
                            this.reload();
	                 	});
			   }
            },

            // delete description
            deleteDesc(description) {
                if(confirm('ARE YOU SURE YOU WANT TO DELETE: ' + description.header + '?'))
			   	{
			   		let name = description.header;
	                axios.delete('/description/delete/'+description.id)
	                    .then(response => {
	                    	this.flashMessage = 'The description: ' + name + ' has been deleted!';
	                    	this.flashShow(this.flashMessage, 'danger');
                            this.reload();
	                 	});
			   }
            },

            // delete model
            deleteModel(model) {
                if(confirm('ARE YOU SURE YOU WANT TO DELETE: ' + model.name + '?'))
			   	{
                    if (this.selectedModel_id == model.id) {
                        this.selectedModel_id = null;
                        this.cartActive       = false;
                    }

			   		let name = model.name;
	                axios.delete('/model/delete/'+model.id)
	                    .then(response => {
	                    	this.flashShow(`The Product Option: ${name} has been deleted!`, 'danger');
                            this.reload();
	                 	});
			   }
            },

            // modals 
            showFeatureModal() {
                this.openModal = !this.openModal;
            },

            showDescriptionModal() {
                this.openDescriptionModal = !this.openDescriptionModal;
            },

            showModelModal() {
                this.openModelModal = !this.openModelModal;
            },

            editDesc(desc) {
                this.openEditDescriptionModal = !this.openEditDescriptionModal;
                this.$refs.editDescriptionRef.open(desc);
            },

            showEditDescriptionModal() {
                this.openEditDescriptionModal = !this.openEditDescriptionModal;
            },

            showAuthModal() {
                this.openAuthModal = !this.openAuthModal;
            },

            editProduct() {
                this.openEditModal = !this.openEditModal;
            },

            editProductThumbnail() {
                this.openEditModal = !this.openEditModal;
                this.$refs.editProductRef.thumbnailShow();
            },

            addProductPictures() {
                this.openEditModal = !this.openEditModal;
                this.$refs.editProductRef.photosShow();
            },

            deleteImage(image) {
                if(confirm('ARE YOU SURE YOU WANT TO DELETE THIS IMAGE?'))
			   	{
	                axios.delete('/image/delete/'+image.id)
	                    .then(response => {
	                    	this.flashMessage = 'The image has been deleted!';
	                    	this.flashShow(this.flashMessage, 'danger');
                            this.getImages();
	                 	});
			   }
            },

            deleteProduct(product) {
                if(confirm('ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT?'))
			   	{
	                axios.delete('/product/delete/'+product.id)
	                    .then(response => {
	                    	this.flashMessage = 'The product has been deleted!';
	                    	this.flashShow(this.flashMessage, 'danger');
                            this.$router.push('/');
	                 	});
			   }
            },

            // flash 
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
        }
    }
</script>