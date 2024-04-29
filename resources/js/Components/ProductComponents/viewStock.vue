<template>
    <div>
        <flash 
            ref             ="childComponentRef"
        ></flash>
        <loading-body
            v-if="isloading == true"
        ></loading-body>
        <div class="container bg-blueGray-50 dark:bg-gray-900 max-h-full" v-else>
            <h2 class="text-black underline uppercase text-4xl my-4">{{ view_name }}.</h2>
            <div class="mb-2 border-b border-gray-200 dark:border-gray-700">
                <div class="sm:hidden">
                    <label for="tabs" class="sr-only uppercase">Select tab</label>
                    <select id="tabs" class="bg-white border-0 border-b border-gray-400 text-black text-base uppercase underline block w-full p-2.5">
                        <option @click="tab1show()" class="uppercase px-2">{{ tab1name }}</option>
                        <option @click="tab2show()" class="uppercase px-2">{{ tab2name }}</option>
                        <option @click="tab3show()" class="uppercase px-2">{{ tab3name }}</option>
                    </select>
                </div>
                <ul class="hidden sm:flex flex-wrap mb-2 text-lg font-medium text-center" :data-tabs-toggle="['#'+this.view_name]">
                    <li class="mr-2">
                        <button :class="[this.btn1class]" :id="[tab1name]" type="button" role="tab" @click="tab1show()">{{ tab1name }} ( {{ Number(data1.length).toLocaleString() }} )</button>
                    </li>
                    <li class="mr-2">
                        <button :class="[this.btn2class]" :id="[tab2name]" type="button" role="tab" @click="tab2show()">{{ tab2name }} ( {{ Number(data2.length).toLocaleString() }} )</button>
                    </li>
                    <li class="mr-2">
                        <button :class="[this.btn3class]" :id="[tab3name]" type="button" role="tab" @click="tab3show()">{{ tab3name }} ( {{ Number(data3.length).toLocaleString() }} )</button>
                    </li>
                </ul>
            </div>
            <div :id="[this.view_name]">
                <div :class="[this.tabBody]" v-if="tab1body">
                    <h2 class="text-black underline uppercase text-3xl my-4">{{ tab1name }}  ( {{ Number(data1.length).toLocaleString() }} items).</h2>
                    <!-- tab 1 data -->
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-base text-left text-gray-500">
                            <thead class="text-lg text-black uppercase bg-transparent">
                                <tr>
                                    <th scope="col" class="px-4 py-3 rounded-l-lg uppercase underline">
                                        Product name.
                                    </th>
                                    <th scope="col" class="px-4 py-3 uppercase underline">
                                        Stock.
                                    </th>
                                    <th scope="col" class="px-4 py-3 uppercase underline">
                                        Units Sold.
                                    </th>
                                    <th scope="col" class="px-4 py-3 rounded-r-lg uppercase underline">
                                        Total
                                    </th>
                                    <th scope="col" class="px-4 py-3 rounded-r-lg uppercase underline">
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white dark:bg-gray-800 border-b border-gray-400" v-for="(product, index) in data1">
                                    <th scope="row" class="flex items-center px-2 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                        <router-link :to="'/product_show/'+product.id"><img class="w-10 h-10 rounded" :src="product.thumbnail_path" :alt="product.name"></router-link>
                                        <div class="pl-3">
                                            <div class="text-base font-normal uppercase underline">
                                                <router-link :to="'/product_show/'+product.id">
                                                    {{ index + 1 }}. {{ product.name }}
                                                </router-link>
                                            </div>
                                            <div class="font-normal text-gray-500 uppercase">ksh {{ Number(product.price).toLocaleString() }}</div>
                                        </div>  
                                    </th>
                                    <td class="px-1 py-2">
                                        <a class="text-center uppercase text-red-600 font-normal text-base p-1 cursor-not-allowed underline" v-if="product.stock <= 0">
                                            OUT OF STOCK
                                        </a>
                                        <!-- counter  -->
                                        <div class="inline-flex rounded-md shadow-sm" role="group" v-else>
                                            <button type="button" :class="[this.btnClass, this.minusBtnClass]" @click="minusQuantity(product)">
                                                <i class="fas fa-minus fa-xs px-1"></i>
                                            </button>
                                            <button type="button" class="inline-flex items-center px-2 py-2 text-base font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 cursor-auto">
                                                {{ Number(product.stock).toLocaleString() }}
                                            </button>
                                            <button type="button" :class="[this.btnClass, this.addBtnClass]" @click="addQuantity(product)">
                                                <i class="fas fa-plus fa-xs px-1"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="px-1 py-2 text-black">
                                        {{ Number(product.soldunits.length).toLocaleString() }} Units Sold
                                    </td>
                                    <td class="px-1 py-2 text-black">
                                        ksh {{ productTotal(product) }}
                                    </td>
                                    <td class="px-1 py-2 text-black inline-flex">
                                        <!-- remove from cart  -->
                                        <a class="text-center uppercase text-blue-600 font-normal text-base p-1 py-2 cursor-pointer" @click="editProduct(product)">
                                            <edit-icon class="h-6 w-6"></edit-icon>
                                        </a>
                                        <a class="text-center uppercase text-red-600 font-normal text-base p-1 py-2 cursor-pointer" @click="deleteProduct(product)">
                                            <delete-icon class="h-6 w-6"></delete-icon>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="font-normal uppercase underline text-2xl text-gray-900 dark:text-white">
                                    <th scope="row" class="px-2 py-3">Total.</th>
                                    <td class="px-2 py-3">{{ Number(this.data1.length).toLocaleString() }} Items.</td>
                                    <td class="px-2 py-3">ksh {{ Number(this.data1sum).toLocaleString() }}.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div :class="[this.tabBody]" v-if="tab2body">
                    <h2 class="text-black underline uppercase text-3xl my-4">{{ tab2name }}  ( {{ Number(data2.length).toLocaleString() }} items).</h2>
                    <!-- tab 2 data -->
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-base text-left text-gray-500">
                            <thead class="text-lg text-black uppercase bg-transparent">
                                <tr>
                                    <th scope="col" class="px-4 py-3 rounded-l-lg uppercase underline">
                                        Product name.
                                    </th>
                                    <th scope="col" class="px-4 py-3 uppercase underline">
                                        Stock.
                                    </th>
                                    <th scope="col" class="px-4 py-3 uppercase underline">
                                        Units Sold.
                                    </th>
                                    <th scope="col" class="px-4 py-3 rounded-r-lg uppercase underline">
                                        Total
                                    </th>
                                    <th scope="col" class="px-4 py-3 rounded-r-lg uppercase underline">
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white dark:bg-gray-800 border-b border-gray-400" v-for="(product, index) in data2">
                                    <th scope="row" class="flex items-center px-2 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                        <router-link :to="'/product_show/'+product.id"><img class="w-10 h-10 rounded" :src="product.thumbnail_path" :alt="product.name"></router-link>
                                        <div class="pl-3">
                                            <div class="text-base font-normal uppercase underline">
                                                <router-link :to="'/product_show/'+product.id">
                                                    {{ index + 1 }}. {{ product.name }}
                                                </router-link>
                                            </div>
                                            <div class="font-normal text-gray-500 uppercase">ksh {{ Number(product.price).toLocaleString() }}</div>
                                        </div>  
                                    </th>
                                    <td class="px-1 py-2">
                                        <a class="text-center uppercase text-red-600 font-normal text-base p-1 cursor-not-allowed underline" v-if="product.stock <= 0">
                                            OUT OF STOCK
                                        </a>
                                        <!-- counter  -->
                                        <div class="inline-flex rounded-md shadow-sm" role="group" v-else>
                                            <button type="button" :class="[this.btnClass, this.minusBtnClass]" @click="minusQuantity(product)">
                                                <i class="fas fa-minus fa-xs px-1"></i>
                                            </button>
                                            <button type="button" class="inline-flex items-center px-2 py-2 text-base font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 cursor-auto">
                                                {{ Number(product.stock).toLocaleString() }}
                                            </button>
                                            <button type="button" :class="[this.btnClass, this.addBtnClass]" @click="addQuantity(product)">
                                                <i class="fas fa-plus fa-xs px-1"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="px-1 py-2 text-black">
                                        {{ Number(product.soldunits.length).toLocaleString() }} Units Sold
                                    </td>
                                    <td class="px-1 py-2 text-black">
                                        ksh {{ productTotal(product) }}
                                    </td>
                                    <td class="px-1 py-2 text-black inline-flex">
                                        <!-- remove from cart  -->
                                        <a class="text-center uppercase text-blue-600 font-normal text-base p-1 py-2 cursor-pointer" @click="editProduct(product)">
                                            <edit-icon class="h-6 w-6"></edit-icon>
                                        </a>
                                        <a class="text-center uppercase text-red-600 font-normal text-base p-1 py-2 cursor-pointer" @click="deleteProduct(product)">
                                            <delete-icon class="h-6 w-6"></delete-icon>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="font-normal uppercase underline text-2xl text-gray-900 dark:text-white">
                                    <th scope="row" class="px-2 py-3">Total.</th>
                                    <td class="px-2 py-3">{{ Number(this.data2.length).toLocaleString() }} Items.</td>
                                    <td class="px-2 py-3">ksh {{ Number(this.data2sum).toLocaleString() }}.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div :class="[this.tabBody]" v-if="tab3body">
                    <h2 class="text-black underline uppercase text-3xl my-4">{{ tab3name }}  ( {{ Number(data3.length).toLocaleString() }} items).</h2>
                    <!-- tab 3 data -->
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-base text-left text-gray-500">
                            <thead class="text-lg text-black uppercase bg-transparent">
                                <tr>
                                    <th scope="col" class="px-4 py-3 rounded-l-lg uppercase underline">
                                        Product name.
                                    </th>
                                    <th scope="col" class="px-4 py-3 uppercase underline">
                                        Stock.
                                    </th>
                                    <th scope="col" class="px-4 py-3 uppercase underline">
                                        Units Sold.
                                    </th>
                                    <th scope="col" class="px-4 py-3 rounded-r-lg uppercase underline">
                                        Total
                                    </th>
                                    <th scope="col" class="px-4 py-3 rounded-r-lg uppercase underline">
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white dark:bg-gray-800 border-b border-gray-400" v-for="(product, index) in data3">
                                    <th scope="row" class="flex items-center px-2 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                        <router-link :to="'/product_show/'+product.id"><img class="w-10 h-10 rounded" :src="product.thumbnail_path" :alt="product.name"></router-link>
                                        <div class="pl-3">
                                            <div class="text-base font-normal uppercase underline">
                                                <router-link :to="'/product_show/'+product.id">
                                                    {{ index + 1 }}. {{ product.name }}
                                                </router-link>
                                            </div>
                                            <div class="font-normal text-gray-500 uppercase">ksh {{ Number(product.price).toLocaleString() }}</div>
                                        </div>  
                                    </th>
                                    <td class="px-1 py-2">
                                        <a class="text-center uppercase text-red-600 font-normal text-base p-1 cursor-not-allowed underline" v-if="product.stock <= 0">
                                            OUT OF STOCK
                                        </a>
                                        <!-- counter  -->
                                        <div class="inline-flex rounded-md shadow-sm" role="group" v-else>
                                            <button type="button" :class="[this.btnClass, this.minusBtnClass]" @click="minusQuantity(product)">
                                                <i class="fas fa-minus fa-xs px-1"></i>
                                            </button>
                                            <button type="button" class="inline-flex items-center px-2 py-2 text-base font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 cursor-auto">
                                                {{ Number(product.stock).toLocaleString() }}
                                            </button>
                                            <button type="button" :class="[this.btnClass, this.addBtnClass]" @click="addQuantity(product)">
                                                <i class="fas fa-plus fa-xs px-1"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="px-1 py-2 text-black">
                                        {{ Number(product.soldunits.length).toLocaleString() }} Units Sold
                                    </td>
                                    <td class="px-1 py-2 text-black">
                                        ksh {{ productTotal(product) }}
                                    </td>
                                    <td class="px-1 py-2 text-black inline-flex">
                                        <!-- remove from cart  -->
                                        <a class="text-center uppercase text-blue-600 font-normal text-base p-1 py-2 cursor-pointer" @click="editProduct(product)">
                                            <edit-icon class="h-6 w-6"></edit-icon>
                                        </a>
                                        <a class="text-center uppercase text-red-600 font-normal text-base p-1 py-2 cursor-pointer" @click="deleteProduct(product)">
                                            <delete-icon class="h-6 w-6"></delete-icon>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="font-normal uppercase underline text-2xl text-gray-900 dark:text-white">
                                    <th scope="row" class="px-2 py-3">Total.</th>
                                    <td class="px-2 py-3">{{ Number(this.data3.length).toLocaleString() }} Items.</td>
                                    <td class="px-2 py-3">ksh {{ Number(this.data3sum).toLocaleString() }}.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- edit product modal  -->
        <editProductModal
            v-show              = "openEditModal"
            v-bind:product      = "modalData"
            v-bind:catergory    = "catergory"
            v-bind:brand        = "brand"
            @closemodal         = "editProductClose"
            @reloadproduct      = "getData"
            @reloadImages       = "getData"
            ref 			    = "editProductRef" 
        ></editProductModal>
    </div>

    <!-- footer  -->
    <footer-body></footer-body>
    <!-- end footer  -->
</template>

<script>
    import flash                                    from '../AlertComponents/flash-simple.vue';
    import editProductModal                         from '../modalComponents/productModals/editProduct-modal.vue';
    // pagination 
    import { TailwindPagination }                   from 'laravel-vue-pagination';
    export default {
        props: [

        ],

        data() {
            return {
                // load 
                isloading: true,

                // tables field data 
                fields: {},

                //  table class
                btnClass: "mx-0.5 inline-flex items-center p-0.5 text-xs font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10",
                addBtnClass: "",
                minusBtnClass: "",
                

                // datasets 
                data1: [],
                data2: [],
                data3: [],
                data1sum: '',
                data2sum: '',
                data3sum: '',

                // page name 
                view_name: "",

                // tabs
                // classes
                activeTab: 'inline-block p-4 py-3 border-b-2 border-blue-700 uppercase text-blue-700',
                inactiveTab: 'inline-block p-4 py-3 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 uppercase',
                tabBody: 'bg-white dark:bg-gray-800 relative flex flex-col min-w-0 break-words w-full mb-6 shadow bg-blueGray-200 border-0 p-4 py-2',
                btn1class: '',
                btn2class: '',
                btn3class: '',

                // bodies 
                tab1body: true,
                tab2body: false,
                tab3body: false,

                // bodies 
                tab1name: 'All Products',
                tab2name: 'In Stock',
                tab3name: 'Out Of Stock',

                // modal info 
                openEditModal: false,
                modalData: {},
                catergory: {},
                brand: {}
            }
        },

        components: {
            flash,
            editProductModal,
            TailwindPagination
        },

        beforeMount() {
            this.isloading = true;
            this.getData();
            this.tab1show();
        },

        methods: {
            loaded() {
                this.view_name = this.$route.name;
                this.isloading = false;
                window.scrollTo(0, 1);
                window.scrollTo(0, 0);
            },

            getData() {
                axios.get('/api/getStock/Admin')
                    .then(
                    	({data}) => {
                    		this.data1     = data[0]
                            this.data2     = data[1]
                            this.data3     = data[2]
                            this.data1sum  = data[3]
                            this.data2sum  = data[4]
                            this.data3sum  = data[5]
                            this.loaded();
                    });
            },

            // show tabs 
            tab1show() {
                this.tab1body     = true;
                this.tab2body     = false;
                this.tab3body     = false;
                this.btn1class    = this.activeTab;
                this.btn2class    = this.inactiveTab;
                this.btn3class    = this.inactiveTab;
            },

            tab2show() {
                this.tab1body     = false;
                this.tab2body     = true;
                this.tab3body     = false;
                this.btn1class    = this.inactiveTab;
                this.btn2class    = this.activeTab;
                this.btn3class    = this.inactiveTab;
            },

            tab3show() {
                this.tab1body     = false;
                this.tab2body     = false;
                this.tab3body     = true;
                this.btn1class    = this.inactiveTab;
                this.btn2class    = this.inactiveTab;
                this.btn3class    = this.activeTab;
            },

            // operations 
            productTotal(product) {
                let prod = product.stock * product.price;
                let number = Number(prod).toLocaleString();
                return number;
            },

            quantity(product) {
                let qty = product.stock;

                if (product.stock > '0' ) {
                    this.addBtnClass = "cursor-pointer";
                }

                if (product.stock <= 1 ) {
                    this.minusBtnClass = "cursor-not-allowed";
                } else {
                    this.minusBtnClass = "cursor-pointer";
                }

                return qty;
            },

            addQuantity(product){
                // if (product.stock == product.stock ) {
                //     this.flashMessage = 'Maximum No of Stock Reached!';
                //     this.$refs.childComponentRef.flash([this.flashMessage,'bg-red-100 dark:bg-red-900']);
                // } else {
                    let no = Number(product.stock);
                    let num = no + 1;
                    this.fields.stock = num;
                    console.log(num);
                    this.editQty(product.id);
                // }
            },

            minusQuantity(product){
                if (product.stock == 1 ) {
                    this.flashMessage = 'Minimum No. Reached!';
                    this.$refs.childComponentRef.flash([this.flashMessage,'bg-red-100 dark:bg-red-900']);
                } else {
                    let no = product.stock;
                    let num = no - 1;
                    this.fields.stock = num;
                    console.log(num);
                    this.editQty(product.id);
                }
            },

            editQty(id) {
                axios.put('/product/edit/'+id, this.fields)
                    .then(response => {
                        this.getData();
                        this.flashMessage = 'Stock Quantity Edit Success!';
                        this.$refs.childComponentRef.flash([this.flashMessage,'bg-green-100 dark:bg-green-900']);
                })
            },

            editProduct(product) {
                axios.get('/api/getProduct/'+ product.id)
                    .then(
                    	({data}) => {
                    		this.modalData      = data[0]
                            this.brand          = data[1]
                            this.catergory      = data[3]
                            this.openEditModal  = !this.openEditModal;
                    });   
            },

            editProductClose() {
                this.modalData      = {}
                this.brand          = {}
                this.catergory      = {}
                this.openEditModal  = !this.openEditModal;  
            },

            deleteProduct(product) {
                if(confirm('ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT?'))
			   	{
	                axios.delete('/product/delete/'+product.id)
	                    .then(response => {
	                    	this.flashMessage = 'The product has been deleted!';
	                    	this.$refs.childComponentRef.flash([this.flashMessage, 'bg-red-100 dark:bg-red-900']);
                            this.getData();
	                 	});
			   }
            },
        }
    }
</script>