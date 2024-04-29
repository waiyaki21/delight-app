<template>
    <div :class="[this.mobileClass]" :key="latestKey">
        <div class="h-full p-2">
            <h2 class="text-black uppercase text-xl m-2 flex underline w-full justify-between">
                Sort By
                <times-icon class="w-6 h-6 mr-4 cursor-pointer" v-if="mobileView" @click="close"/>
            </h2>
            <hr class="width-hr mx-auto mb-4 border-b-2 border-blueGray-200" />
            <ul class="space-y-2">
                <li class="flex flex-col p-2 text-base text-gray-900 rounded-lg dark:text-white">
                    <a class="flex items-center px-2 pb-1 text-xl font-normal text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700 row uppercase underline text-center">
                        <span class="ml-3">Filter by Price.</span>
                    </a>
                    <VueSimpleRangeSlider
                        style           ="width: 100%"
                        :min            ="1000"
                        :max            ="maxprice"
                        exponential
                        v-model         ="state.range"
                        @click          = "slideKey"
                    >
                        <template #prefix="{ value }">KSH </template>
                    </VueSimpleRangeSlider>
                    <p class="flex items-center p-2 text-xl font-normal text-gray-600 uppercase text-center justify-between">
                        <span class="text-xl underline"> 
                            ksh {{ Number(state.range[0]).toLocaleString() }} 
                        </span> 
                        <span> - </span> 
                        <span class="text-xl underline">ksh {{ Number(state.range[1]).toLocaleString() }} </span>
                    </p>
                </li> 
                <li>
                    <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700">
                        <span class="ml-3 uppercase text-center underline text-lg">Sort By</span>
                    </a>
                </li>
                <li>
                    <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ul class="py-1 bg-gray-100 shadow border border-gray-500 rounded w-full">
                            <li>
                                <a class="flex uppercase items-center w-full p-1 text-base font-normal  text-gray-900 transition duration-75 group px-2 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 cursor-pointer" @click="descPrice()">
                                    Price: Highest to Lowest
                                </a>
                                <hr class="width-hr border-b border-blueGray-200" />
                                <a class="flex uppercase items-center w-full p-1 text-base font-normal  text-gray-900 transition duration-75 group px-2 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 cursor-pointer" @click="ascPrice()">
                                    Price: Lowest to Highest
                                </a>
                                <hr class="width-hr border-b border-blueGray-200" />
                                <a class="flex uppercase items-center w-full p-1 text-base font-normal  text-gray-900 transition duration-75 group px-2 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 cursor-pointer" @click="latest()">
                                    Latest Arrivals
                                </a>
                                <hr class="width-hr border-b border-blueGray-200" />
                                <a class="flex uppercase items-center w-full p-1 text-base font-normal  text-gray-900 transition duration-75 group px-2 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 cursor-not-allowed" title="Feature Not Ready">
                                    Popularity
                                </a>
                                <hr class="width-hr border-b border-blueGray-200" />
                            </li>
                        </ul>
                    </a>
                </li> 
                <li>
                    <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700">
                        <span class="ml-3 uppercase text-center underline text-lg">Catergories</span>
                    </a>
                </li>
                <li v-for="catergory in catergories">
                    <button type="button" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 justify-between uppercase" :data-collapse-toggle="'dropdown#_'+catergory.id">
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ catergory.name }}</span>
                        <down-icon class="h-6 w-6 px-1 hover:rotate-180"></down-icon>
                    </button>
                    <hr class="width-hr mx-auto mb-1 border-b border-blueGray-200" />
                    <ul :id="'dropdown#_'+catergory.id" class="py-2 space-y-2 bg-gray-100 shadow border border-gray-500 rounded">
                        <li v-for="brand in catergory.brands">
                            <a :href="'/brand/'+brand.id" class="flex uppercase items-center w-full p-1 text-base font-normal  text-gray-900 transition duration-75 group px-2 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">{{ brand.name }}</a>
                            <hr class="width-hr border-b border-blueGray-200" />
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import VueSimpleRangeSlider from "vue-simple-range-slider";
    // import "../../../css/assets/slider.css";

    import { reactive }         from "vue";
    export default {
        props: [
            'products',
            'maxprice',
            'minprice',
            'search'
        ],

        data() {
            return {
                latestKey: false,
                //slider setting
                slider: false,

                // price load 
                maximum: '',
                minimum: '',

                // datasets
                catergories: [],

                // width settings 
                windowWidth:        '',
                mobileView:         true,
                mobileClass:        '',
                showButton:         true
            }
        },

        setup() {
            const state = reactive({ range: [1000, 100000], number: 1000 });
            return { state };
        },

        components: {
            VueSimpleRangeSlider 
        },

        beforeMount() {
            this.isloading = true;
            this.getCatergories();
        },

        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);
                //Init
                this.getWindowWidth()
            })
        },

        methods: {
            getWindowWidth(event) {
                this.windowWidth = document.documentElement.clientWidth;
                const x = this.windowWidth;
                switch (true) {
                    case (x < 900):
                        // console.log("mobile search tab true");
                        this.mobileView     = true;
                        this.mobileClass    = 'w-64 shadow fixed top-0 right-0 bg-white z-40 border border-gray-200 h-screen overflow-y-auto thin-scrollbar';
                        this.latestKey      += 1;
                        this.showButton = true;
                        // this.$emit('btnstate', this.showButton);
                        break;
                    case (x < 2400):
                        // console.log("mobile search tab false");
                        this.mobileView     = false;
                        this.mobileClass    = 'my-2 col-md-3 shadow bg-white border border-gray-200 h-screen overflow-y-auto thin-scrollbar';
                        this.latestKey      += 1;
                        this.showButton = false;
                        // this.$emit('btnstate', this.showButton);
                        break;
                }
            },
            
            slideKey() {
                this.minimum = this.state.range[0];
                this.maximum = this.state.range[1];
                this.slider  = true;
                axios.get('/api/search/'+ this.search + '/' + this.minimum + '/' + this.maximum)
                    .then(
                    	({data}) => {
                            this.$emit('reloadprice', data)
                    });
            },

            getCatergories() { 
                axios.get('/api/getCatergories')
                    .then(
                    	({data}) => {
                    		this.catergories = data;
                    });
            },

            descPrice() {
                if (this.slider) {
                    console.log(this.slider);
                    this.minimum = this.state.range[0];
                    this.maximum = this.state.range[1];
                    axios.get('/api/search/'+ this.search + '/' + this.minimum + '/' + this.maximum)
                        .then(
                            ({data}) => {
                                this.$emit('reloadprice', data)
                        }); 
                } else {
                    console.log(this.slider);
                    this.minimum = 0;
                    this.maximum = this.maxprice;
                    axios.get('/api/search/'+ this.search + '/' + this.minimum + '/' + this.maximum)
                        .then(
                            ({data}) => {
                                this.$emit('reloadprice', data)
                        }); 
                } 
            },

            ascPrice() {
                if (this.slider) {
                    this.minimum = this.state.range[0];
                    this.maximum = this.state.range[1];
                    axios.get('/api/search/'+ this.search + '/' + this.minimum + '/' + this.maximum + '/asc')
                        .then(
                            ({data}) => {
                                this.$emit('reloadprice', data)
                        }); 
                } else {
                    this.minimum = 0;
                    this.maximum = this.maxprice;
                    axios.get('/api/search/'+ this.search + '/' + this.minimum + '/' + this.maximum + '/asc')
                        .then(
                            ({data}) => {
                                this.$emit('reloadprice', data)
                        }); 
                }  
            },

            latest() {
                if (this.slider) {
                    this.minimum = this.state.range[0];
                    this.maximum = this.state.range[1];
                    axios.get('/api/search/'+ this.search + '/' + this.minimum + '/' + this.maximum + '/newest')
                        .then(
                            ({data}) => {
                                this.$emit('reloadprice', data)
                        }); 
                } else {
                    this.minimum = 0;
                    this.maximum = this.maxprice;
                    axios.get('/api/search/'+ this.search + '/' + this.minimum + '/' + this.maximum + '/newest')
                        .then(
                            ({data}) => {
                                this.$emit('reloadprice', data)
                        }); 
                }
            },

            close() {
                this.$emit('close');
            }
        }
    }
</script>