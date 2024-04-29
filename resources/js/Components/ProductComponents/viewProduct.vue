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
        <div class="container bg-blueGray-50 dark:bg-gray-900 max-h-full" v-else>
            <div class="row my-4 py-2">
                <!-- product pictures carousel  -->
                <div class="col-md-5" style="padding-left: 0px;padding-right: 0px;">
                    <div id="productImage-carousel" class="relative">
                        <!-- Carousel wrapper -->
                        <swiper
                            :loop="true"
                            :spaceBetween="30"
                            :effect="'fade'"
                            :navigation="true"
                            :autoplay="{
                                delay: 4500,
                                disableOnInteraction: false,
                            }"
                            :pagination="{
                                clickable: true,
                            }"
                            :modules="modules"
                            class="mySwiper"
                        >
                            <swiper-slide v-for="image in images">
                                <!-- delete image & tooltip -->
                                <button type="button" class="fixed inline-flex items-center p-1 text-base border border-red-800 hover:border-red-800 font-normal text-center bg-red-800 hover:bg-red-800 rounded dark:bg-transparent dark:hover:bg-transparent mx-4 top-4 left-6 cursor-pointer text-white hover:text-white z-20 shadow" @click="deleteImage(image)" v-if = "this.admin == '1'" :title="'Delete ' + image.name +' ?'">
                                    DELETE IMAGE
                                    <delete-icon class="h-4 w-4"></delete-icon>
                                </button>
                                <img :src="`${image.path}`" :alt="image.name + 'Delight Electronics'" class="img-swipe"/>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="col-md-7">
                    <section class="admin-section" v-if = "this.admin == '1'">
                        <!-- options  -->
                        <div class="inline-flex rounded" role="group">
                                <button type="button" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white font-normal text-sm p-1 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-between" @click="editProduct(product)">
                                    Edit
                                    <edit-icon class="mx-2 h-4 w-4"></edit-icon>
                                </button>
                                <button type="button" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white font-normal text-sm p-1 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-between" @click="editProductThumbnail()">
                                    Edit Thumbnail
                                    <camera-icon class="mx-2 h-4 w-4"></camera-icon>
                                </button>
                                <button type="button" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white font-normal text-sm p-1 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-between" @click="addProductPictures()">
                                    Add Photos
                                    <photo-icon class="mx-2 h-4 w-4"></photo-icon>
                                </button>
                                <button type="button" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-red-800 hover:text-white font-normal text-sm p-1 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-between" @click="deleteProduct(product)">
                                    Delete
                                    <delete-icon class="mx-2 h-4 w-4"></delete-icon>
                                </button>
                        </div>

                        <!-- click to copy -->
                        <blockquote class="w-full p-1 my-1 border-l-4 border-gray-600 hover:border-yellow-200 bg-gray-50 hover:bg-gray-900 dark:border-gray-500 dark:bg-gray-800 inline-flex justify-between rounded-r-md text-gray-900 hover:text-yellow-200 cursor-pointer px-6" title="Click to Copy!" @click="copyUrl">
                            <p class="text-xl italic font-medium leading-relaxed">
                                {{ this.link }}
                            </p>
                            <a class="cursor-pointer" title="Click to Copy!" @click="copyUrl">
                                <copy-icon class="h-8 w-8"></copy-icon>
                            </a>
                        </blockquote>
                    </section>
                    <!-- product information  -->
                    <p class="uppercase text-xl text-muted">{{ brand.name }}</p>
                    <p class="uppercase text-4xl">{{ product.name }}</p>
                    <p class="uppercase text-4xl mt-4 text-gray-500">ksh {{ Number(product.price).toLocaleString() }}.00</p>
                    <hr class="mb-4">
                    <!-- amnt in and left  -->
                    <p class="uppercase text-sm text-danger inline-flex">
                        <p class="uppercase text-sm text-success px-1">
                            <i class="fas fa-check px-1"></i>
                            {{ product.stock }} In Stock.
                        </p>
                        <div class="divider h-6"></div>
                        <p class="uppercase text-sm text-danger">
                            <i class="fas fa-clock px-1"></i>
                            {{ product.stock - this.quantity }} <span class="pl-1"> Left.</span>
                        </p>
                    </p>
                    <!-- not logged in  -->
                    <div v-if="this.logged == false">
                        <a class="w-2/3 uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-center" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" @click="showAuthModal()">
                            Add to cart.
                            <shopping-icon class="mx-2 h-6 w-6"></shopping-icon>
                        </a>
                    </div>
                    <!-- logged in  -->
                    <div v-else class="w-full inline-flex mb-2">
                        <!-- quantity counter  -->
                        <div class="inline-flex mx-4" role="group">
                            <button type="button" :class="[this.btnClass, this.minusBtnClass]" @click="minusQuantity()">
                                <i class="fas fa-minus fa-xs px-1"></i>
                            </button>
                            <button class="inline-flex items-center p-2 text-lg font-medium text-gray-900 bg-transparent border border-gray-500 focus:z-10 cursor-auto">
                                {{ Number( this.quantity ).toLocaleString() }}
                            </button>
                            <button type="button" :class="[this.btnClass, this.addBtnClass]" @click="addQuantity(product)">
                                <i class="fas fa-plus fa-xs px-1"></i>
                            </button>
                        </div>

                        <!-- add to cart  -->
                        <a class="w-full uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-center" v-if="product.stock > 0 && this.in_cart == false" @click="addToCart(product)">
                            Add to cart
                            <shopping-icon class="mx-2 h-6 w-6"></shopping-icon>
                        </a>

                        <!-- remove from cart  -->
                        <a class="w-full uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-200 font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-center" v-if="product.stock > 0 && this.in_cart == true" @click="removeFromCart(product)">
                            Remove from cart
                            <shopping-icon class="mx-2 h-6 w-6"></shopping-icon>
                        </a>

                        <!-- Out of stock  -->
                        <a class="w-full uppercase text-gray-900 bg-red-600 border border-red-600 hover:bg-red-600 hover:text-black font-medium text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-center" v-if="product.stock <= 0">
                            Out of Stock
                            <stop-icon class="mx-2 h-6 w-6"></stop-icon>
                        </a>
                    </div>
                    <hr class="mb-4">
                    <!-- add product extra info  -->
                    <p class="uppercase text-xl text-muted underline mb-2 flex" v-if = "this.admin == '1'">
                        <span class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white font-normal text-sm p-2 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow" @click="showFeatureModal" >
                            Add Features
                            <i class="fas fa-plus px-2"></i>
                        </span>
                        <span class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white font-normal text-sm p-2 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow" @click="showDescriptionModal">
                            <!-- v-if = "!description.length" -->
                            Add Description
                            <i class="fas fa-plus px-2"></i>
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
                                    <td class="p-1 uppercase" v-if = "this.admin == '1'">
                                        <div class="inline-flex rounded" role="group">
                                            <button type="button" class="text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-red-800 hover:text-white font-normal text-sm p-1 ml-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow inline-flex justify-between" @click="deleteFeature(feature)">
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
                                <div class=" inline-flex mx-2" v-if = "this.admin == '1'"> 
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
            ref 			    = "featureRef" 
        ></featureModal>

        <!-- add description modal  -->
        <descriptionModal
            v-show              = "openDescriptionModal"
            v-bind:product      = "product"
            @closemodal         = "showDescriptionModal"
            @reloaddescription  = "getProduct"
            ref 			    = "descriptionRef" 
        ></descriptionModal>

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
            ref 			    = "editProductRef" 
        ></editProductModal>

        <!-- auth modal  -->
        <authModal
            v-show              = "openAuthModal"
            v-bind:product      = "product"
            @reloaduser         = "reloadUser"
            @closemodal         = "showAuthModal"
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
    import editProductModal       from '../modalComponents/productModals/editProduct-modal.vue';
    import authModal 	          from '../ModalComponents/authModals/auth-modal.vue';
    import flash                  from '../AlertComponents/flash-simple.vue';
    import cartflash              from '../AlertComponents/flash-cart.vue';
    

    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';

    import "swiper/css/effect-fade";
    import "swiper/css/controller";
    
    import { EffectFade, Navigation, Controller, Pagination, Autoplay } from "swiper";

    // Import Swiper styles
    import 'swiper/css';
    import '../BodyComponents/css/swipe.css';

    export default {
        props: [
            'url'
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

                // btn info 
                btnClass: "mx-1 inline-flex items-center p-1 text-sm font-medium text-gray-900 bg-white border border-gray-500 hover:bg-gray-900 hover:text-white focus:z-10 shadow",
                addBtnClass: "",
                minusBtnClass: "",

                link: '',
            }
        },

        components: {
            flash,
            cartflash,
            featureModal,
            descriptionModal,
            editProductModal,
            authModal,
            Swiper,
            SwiperSlide,
        },

        beforeMount() {
            this.isloading = true;
            this.getUser();
            this.getProduct();
        },

        setup() {
            const onSwiper = (swiper) => {
                console.log(swiper);
            };
            const onSlideChange = () => {
                console.log('slide change');
            };

            return {
                modules: [
                    EffectFade, 
                    Navigation, 
                    Pagination, 
                    Controller,
                    Autoplay
                ],
            };
        },

        created() {
        },

        methods: {
            loaded() {
                this.isloading = false;
                this.scrollTo();
            },

            scrollTo() {
                // console.log('pkaaaaaaaaaaaaaaaaaaaaaaah');
                window.scrollTo(0, 1);
                window.scrollTo(0, 0);
                // document.getElementById("app").scrollIntoView();
            },

            async copyUrl() {
                let mytext = this.link;
                try {
                    await navigator.clipboard.writeText(mytext);
                    this.flashMessage = 'Copied!';
                    this.$refs.childComponentRef.flash([this.flashMessage,'bg-green-100']);
                } catch($e) {
                    this.flashMessage = 'Cannot copy!';
                    this.$refs.childComponentRef.flash([this.flashMessage,'bg-red-100']);
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
                            this.quantity   = '1';
                            this.quantityVal();
                            this.cartCheck(data[0]);
                            this.loaded();
                    });
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
                    this.$refs.childComponentRef.flash([this.flashMessage,'bg-red-100 dark:bg-red-900']);
                    this.addBtnClass = "cursor-not-allowed";
                } else {
                    let qty = this.quantity++;
                    this.quantityVal();
                }
            },

            minusQuantity(){
                if (this.quantity == 1 ) {
                    this.flashMessage = 'Sorry, Cant go Below One!';
                    this.$refs.childComponentRef.flash([this.flashMessage,'bg-red-100 dark:bg-red-900']);
                    this.quantityVal();
                } else {
                    let qty = this.quantity--;
                    this.quantityVal();
                }
            },

            showFeatureModal() {
                this.openModal = !this.openModal;
            },

            showDescriptionModal() {
                this.openDescriptionModal = !this.openDescriptionModal;
            },

            showAuthModal() {
                this.openAuthModal = !this.openAuthModal;
            },

            reload() {
                axios.get('/api/getProduct/'+ this.product.id)
                    .then(
                    	({data}) => {
                    		this.product        = data[0]
                            this.features       = data[4]
                            this.description    = data[5]
                    });
            },

        	addToCart(product) {
                if (this.dup_count >= 1) {
                    let message = 'This item is already in your cart!';
                    this.$refs.childComponentRef.flash([message, 'bg-green-100 dark:bg-green-900',]);
                } else {
                    this.fields.product_quantity = this.quantity;
                    axios.post('/cart/add/'+product.id, this.fields)
                        .then(response => {
                            let data = response.data;
                            this.in_cart = true;
                            this.$emit('cartinfo', this.user);
                            this.getProduct();
                            let message = product.name + ' : added to cart!';
                            this.$refs.cartflashComponent.flash([message, product, 'bg-green-100 dark:bg-green-900',]);
                        })
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
                        this.$refs.childComponentRef.flash([message, 'bg-red-100 dark:bg-red-900']);
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
	                    	this.$refs.childComponentRef.flash([this.flashMessage, 'bg-red-100 dark:bg-red-900']);
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
	                    	this.$refs.childComponentRef.flash([this.flashMessage, 'bg-red-100 dark:bg-red-900']);
                            this.reload();
	                 	});
			   }
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
	                    	this.$refs.childComponentRef.flash([this.flashMessage, 'bg-red-100 dark:bg-red-900']);
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
	                    	this.$refs.childComponentRef.flash([this.flashMessage, 'bg-red-100 dark:bg-red-900']);
                            this.$router.push('/');
	                 	});
			   }
            },

            editSwiper() {
                console.log('pkaaaaaaaaaah');
            }
        }
    }
</script>