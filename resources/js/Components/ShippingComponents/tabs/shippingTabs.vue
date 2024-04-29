<template>
    <div class="col-md-12">
        <!-- flash  -->
        <flash 
            ref  ="childComponentRef"
        ></flash>

        <div class="mx-auto bg-blueGray-50 dark:bg-gray-900 max-h-full">

            <!-- header  -->
            <h2 class="col-md-12 text-black underline uppercase text-5xl my-4">
                Orders Shipping.
                <span class="text-muted mx-2 text-2xl" v-if = "this.admin == '1'"> ( Admin ) </span>
            </h2>

            <!-- tab links  -->
            <div class="mb-2 border-b border-gray-200 dark:border-gray-700">
                <h2 class="col-md-12 text-muted underline text-base my-2">
                    Select Shipping Catergories.
                </h2>
                <div class="sm:hidden">
                    <select id="tabs" class="bg-white border-0 border-b border-gray-400 text-black text-xl uppercase underline block w-full p-2.5 cursor-pointer">
                        <option @click="tab4show()" class="uppercase px-2 cursor-pointer" v-if="this.admin == '1'">
                            {{ tab4name }}
                            ( {{  Number(today.length).toLocaleString() }} )
                        </option>
                        <option @click="tab1show()" class="uppercase px-2 cursor-pointer">
                            {{ tab1name }}
                            ( {{  Number(allShippings.length).toLocaleString() }} )
                        </option>
                        <option @click="tab2show()" class="uppercase px-2 cursor-pointer">
                            {{ tab2name }}
                            ( {{  Number(transit.length).toLocaleString() }} )
                        </option>
                        <option @click="tab3show()" class="uppercase px-2 cursor-pointer">
                            {{ tab3name }}
                            ( {{  Number(delivered.length).toLocaleString() }} )
                        </option>
                    </select>
                </div>
                <ul class="hidden sm:flex flex-wrap mb-2 text-lg font-medium text-center" :data-tabs-toggle="['#'+this.view_name]">
                    <li class="mr-2">
                        <button :class="[this.btn4class]" :id="[tab4name]" type="button" role="tab" @click="tab4show()" v-if="this.admin == '1'">{{ tab4name }} ( {{ Number(today.length).toLocaleString() }} )</button>
                    </li>
                    <li class="mr-2">
                        <button :class="[this.btn1class]" :id="[tab1name]" type="button" role="tab" @click="tab1show()">{{ tab1name }} ( {{ Number(allShippings.length).toLocaleString() }} )</button>
                    </li>
                    <li class="mr-2">
                        <button :class="[this.btn2class]" :id="[tab2name]" type="button" role="tab" @click="tab2show()">{{ tab2name }} ( {{ Number(transit.length).toLocaleString() }} )</button>
                    </li>
                    <li class="mr-2">
                        <button :class="[this.btn3class]" :id="[tab3name]" type="button" role="tab" @click="tab3show()">{{ tab3name }} ( {{ Number(delivered.length).toLocaleString() }} )</button>
                    </li>
                </ul>
            </div>
            
            <div :id="[this.view_name]">
                <div :class="[this.tabBody]" v-if="tab1body">
                    <h2 class="text-black underline uppercase text-3xl my-4">{{ tab1name }}.</h2>

                    <loading-body
                        v-if="isloading == true"
                    ></loading-body>

                    <section v-else>
                        <p class="my-1 py-1 text-4xl text-center font-semibold underline uppercase title" v-if="allShippings.length == 0">
                            (0) Shipments. No Order shipments!
                        </p>

                        <div id="accordion-flush" data-accordion="collapse" data-active-classes="dark:bg-gray-900 text-gray-900 dark:text-white bg-blueGray-200" data-inactive-classes="text-gray-500 dark:text-gray-400" v-for="(shipping , index) in allShippings" v-else>
                            <h2 :id="index" :key="index" :class="this.sectionBody">
                                <button type="button" class="inline-flex space-x-2 items-start justify-between w-full py-2 font-medium text-gray-500 hover:text-blue-800 border-b-2 border-gray-700 hover:border-cyan-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-800" :data-accordion-target="'#body-'+index" aria-expanded="true" :aria-controls="index" @click="showAllInfo(index)">
                                    <div class="w-[90%]">
                                        <!-- header  -->
                                        <h2 class="inline-flex justify-start text-black uppercase text-xl mx-2 mt-2 mb-1 w-full">
                                            <span>#{{ shipping.id }}: </span>
                                            <p class="text-black underline uppercase text-3xl w-full text-left inline-flex justify-start ml-2">
                                                {{ shipping.buyer_name }}:  
                                                <span class="px-2"> 
                                                    KSH {{ Number(shipping.shipping_total).toLocaleString() }}
                                                </span>
                                            </p>
                                        </h2>
                                    </div>
                                    <div class="m-2">
                                        <svg data-accordion-icon="" :class="this.caretClass" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </button>
                                <div :id="'body-'+index">
                                    <shippingsTable
                                        v-bind:admin 				= "admin"
                                        v-bind:index 				= "index"
                                        v-bind:products 			= "shipping.shippedproducts"
                                        v-bind:shipping 			= "shipping"
                                        @flashreload                = flashReload
                                        @delivered                  = tab3show
                                        ref 						= "allShippingRef" 
                                    ></shippingsTable>

                                    <!-- footer  -->
                                    <h2 class="text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col">
                                        <p class="text-black uppercase text-xl inline-flex justify-between w-full">
                                            Delivery Status:  
                                            <span class="text-rose-500 uppercase underline" v-if="shipping.shipping_delivered == 0">
                                                In Transit:
                                                <span>{{ formatDate(shipping.delivery_date) }}: {{ fromDate(shipping.delivery_date) }}.</span>
                                            </span>
                                            <span class="text-emerald-600 uppercase underline" v-else> 
                                                Delivered:
                                                <span>{{ formatDate(shipping.delivered_on) }}: {{ fromDate(shipping.delivered_on) }}.</span>
                                            </span>
                                        </p>
                                        <p class="text-black uppercase text-xl inline-flex justify-between w-full">Delivery Cost:  
                                            <span class="text-teal-600 uppercase underline"> 
                                                KSH 150 
                                            </span>
                                        </p>
                                        <p class="text-black uppercase text-3xl inline-flex justify-between w-full">
                                            Total Costs:  
                                            <span class="text-blue-600 uppercase underline">
                                                {{ Number(shipping.shipping_items).toLocaleString() }} Items
                                            </span>
                                            <span class="text-green-600 uppercase underline">
                                                KSH {{ Number(shipping.shipping_total).toLocaleString() }}
                                            </span>
                                        </p>
                                    </h2>
                                </div>
                            </h2>
                            <!-- space  -->
                            <hr class="border-b border-gray-500 rounded-md my-2 w-[90%] mx-auto">
                        </div>
                    </section>
                </div>

                <div :class="[this.tabBody]" v-if="tab2body">
                    <h2 class="text-black underline uppercase text-3xl my-4">{{ tab2name }}.</h2>

                    <loading-body
                        v-if="isloading == true"
                    ></loading-body>

                    <section v-else>
                        <p class="my-1 py-1 text-4xl text-center font-semibold underline uppercase title" v-if="transit.length == 0">
                            (0) Successful Shipments. No Completed shipments!
                        </p>

                        <div id="accordion-flush" data-accordion="collapse" data-active-classes="dark:bg-gray-900 text-gray-900 dark:text-white bg-blueGray-200" data-inactive-classes="text-gray-500 dark:text-gray-400" v-for="(shipping , index) in transit" v-else>
                            <h2 :id="index" :key="index" :class="this.sectionBody">
                                <button type="button" class="inline-flex space-x-2 items-start justify-between w-full py-2 font-medium text-gray-500 hover:text-blue-800 border-b-2 border-gray-700 hover:border-cyan-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-800" :data-accordion-target="'#body-'+index" aria-expanded="true" :aria-controls="index" @click="showTransitInfo(index)">
                                    <div class="w-[90%]">
                                        <!-- header  -->
                                        <h2 class="inline-flex justify-start text-black uppercase text-xl mx-2 mt-2 mb-1 w-full">
                                            <span>#{{ shipping.id }}: </span>
                                            <p class="text-black underline uppercase text-3xl w-full text-left inline-flex justify-start ml-2">
                                                {{ shipping.buyer_name }}:  
                                                <span class="px-2"> 
                                                    KSH {{ Number(shipping.shipping_total).toLocaleString() }}
                                                </span>
                                            </p>
                                        </h2>
                                    </div>
                                    <div class="m-2">
                                        <svg data-accordion-icon="" class="bg-white border-2 border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring focus:ring-gray-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-8 w-8 rounded-full accordion-caret" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </button>
                                <div :id="'body-'+index">
                                    <shippingsTable
                                        v-bind:admin 				= "admin"
                                        v-bind:index 				= "index"
                                        v-bind:products 			= "shipping.shippedproducts"
                                        v-bind:shipping 			= "shipping"
                                        @flashreload                = flashReload
                                        @delivered                  = tab3show
                                        ref 						= "allTransitRef" 
                                    ></shippingsTable>

                                    <!-- footer  -->
                                    <h2 class="text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col">
                                        <p class="text-black uppercase text-xl inline-flex justify-between w-full">
                                            Delivery Status:  
                                            <span class="text-rose-500 uppercase underline" v-if="shipping.shipping_delivered == 0">
                                                In Transit:
                                                <span>{{ formatDate(shipping.delivery_date) }}: {{ fromDate(shipping.delivery_date) }}.</span>
                                            </span>
                                            <span class="text-emerald-600 uppercase underline" v-else> 
                                                Delivered:
                                                <span>{{ formatDate(shipping.delivered_on) }}: {{ fromDate(shipping.delivered_on) }}.</span>
                                            </span>
                                        </p>
                                        <p class="text-black uppercase text-xl inline-flex justify-between w-full">Delivery Cost:  
                                            <span class="text-teal-600 uppercase underline"> 
                                                KSH 150 
                                            </span>
                                        </p>
                                        <p class="text-black uppercase text-3xl inline-flex justify-between w-full">
                                            Total Costs:  
                                            <span class="text-blue-600 uppercase underline">
                                                {{ Number(shipping.shipping_items).toLocaleString() }} Items
                                            </span>
                                            <span class="text-green-600 uppercase underline">
                                                KSH {{ Number(shipping.shipping_total).toLocaleString() }}
                                            </span>
                                        </p>
                                    </h2>
                                </div>
                            </h2>
                            <!-- space  -->
                            <hr class="border-b border-gray-500 rounded-md my-2 w-[90%] mx-auto">
                        </div>
                    </section>
                </div>

                <div :class="[this.tabBody]" v-if="tab3body">
                    <h2 class="text-black underline uppercase text-3xl my-4">{{ tab3name }}.</h2>

                    <loading-body
                        v-if="isloading == true"
                    ></loading-body>

                    <section v-else>
                        <p class="my-1 py-1 text-4xl text-center font-semibold underline uppercase title" v-if="delivered.length == 0">
                            (0) Delivered Shipments. No Delivered shipments!
                        </p>

                        <div id="accordion-flush" data-accordion="collapse" data-active-classes="dark:bg-gray-900 text-gray-900 dark:text-white bg-blueGray-200" data-inactive-classes="text-gray-500 dark:text-gray-400" v-for="(shipping , index) in delivered" v-else>
                            <h2 :id="index" :key="index" :class="this.sectionBody">
                                <button type="button" class="inline-flex space-x-2 items-start justify-between w-full py-2 font-medium text-gray-500 hover:text-blue-800 border-b-2 border-gray-700 hover:border-cyan-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-800" :data-accordion-target="'#body-'+index" aria-expanded="true" :aria-controls="index" @click="showDeliveredInfo(index)">
                                    <div class="w-[90%]">
                                        <!-- header  -->
                                        <h2 class="inline-flex justify-start text-black uppercase text-xl mx-2 mt-2 mb-1 w-full">
                                            <span>#{{ shipping.id }}: </span>
                                            <p class="text-black underline uppercase text-3xl w-full text-left inline-flex justify-start ml-2">
                                                {{ shipping.buyer_name }}:  
                                                <span class="px-2"> 
                                                    KSH {{ Number(shipping.shipping_total).toLocaleString() }}
                                                </span>
                                            </p>
                                        </h2>
                                    </div>
                                    <div class="m-2">
                                        <svg data-accordion-icon="" class="bg-white border-2 border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring focus:ring-gray-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-8 w-8 rounded-full accordion-caret" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </button>
                                <div :id="'body-'+index">
                                    <shippingsTable
                                        v-bind:admin 				= "admin"
                                        v-bind:index 				= "index"
                                        v-bind:products 			= "shipping.shippedproducts"
                                        v-bind:shipping 			= "shipping"
                                        @flashreload                = flashReload
                                        @delivered                  = tab3show
                                        ref 						= "allDeliveredRef" 
                                    ></shippingsTable>

                                    <!-- footer  -->
                                    <h2 class="text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col">
                                        <p class="text-black uppercase text-xl inline-flex justify-between w-full">
                                            Delivery Status:  
                                            <span class="text-rose-500 uppercase underline" v-if="shipping.shipping_delivered == 0">
                                                In Transit:
                                                <span>{{ formatDate(shipping.delivery_date) }}: {{ fromDate(shipping.delivery_date) }}.</span>
                                            </span>
                                            <span class="text-emerald-600 uppercase underline" v-else> 
                                                Delivered:
                                                <span>{{ formatDate(shipping.delivered_on) }}: {{ fromDate(shipping.delivered_on) }}.</span>
                                            </span>
                                        </p>
                                        <p class="text-black uppercase text-xl inline-flex justify-between w-full">Delivery Cost:  
                                            <span class="text-teal-600 uppercase underline"> 
                                                KSH 150 
                                            </span>
                                        </p>
                                        <p class="text-black uppercase text-3xl inline-flex justify-between w-full">
                                            Total Costs:  
                                            <span class="text-blue-600 uppercase underline">
                                                {{ Number(shipping.shipping_items).toLocaleString() }} Items
                                            </span>
                                            <span class="text-green-600 uppercase underline">
                                                KSH {{ Number(shipping.shipping_total).toLocaleString() }}
                                            </span>
                                        </p>
                                    </h2>
                                </div>
                            </h2>
                            <!-- space  -->
                            <hr class="border-b border-gray-500 rounded-md my-2 w-[90%] mx-auto">
                        </div>
                    </section>
                </div>

                <div :class="[this.tabBody]" v-if="tab4body && this.admin == '1'">
                    <h2 class="text-black underline uppercase text-3xl my-4">{{ tab4name }} ( {{ Number(today.length).toLocaleString() }} Deliveries). </h2>

                    <loading-body
                        v-if="isloading == true"
                    ></loading-body>

                    <section v-else>
                        <p class="my-1 py-1 text-4xl text-center font-semibold underline uppercase title" v-if="today.length == 0">
                            (0) Delivery Shipments for Today!
                        </p>

                        <div id="accordion-flush" data-accordion="collapse" data-active-classes="dark:bg-gray-900 text-gray-900 dark:text-white bg-blueGray-200" data-inactive-classes="text-gray-500 dark:text-gray-400" v-for="(shipping , index) in today" v-else>
                            <h2 :id="index" :key="index" :class="this.sectionBody">
                                <button type="button" class="inline-flex space-x-2 items-start justify-between w-full py-2 font-medium text-gray-500 hover:text-blue-800 border-b-2 border-gray-700 hover:border-cyan-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-800" :data-accordion-target="'#body-'+index" aria-expanded="true" :aria-controls="index" @click="showTodayInfo(index)">
                                    <div class="w-[90%]">
                                        <!-- header  -->
                                        <h2 class="inline-flex justify-start text-black uppercase text-xl mx-2 mt-2 mb-1 w-full">
                                            <span>#{{ shipping.id }}: </span>
                                            <p class="text-black underline uppercase text-3xl w-full text-left inline-flex justify-start ml-2">
                                                {{ shipping.buyer_name }}:  
                                                <span class="px-2"> 
                                                    KSH {{ Number(shipping.shipping_total).toLocaleString() }}
                                                </span>
                                            </p>
                                        </h2>
                                    </div>
                                    <div class="m-2">
                                        <svg data-accordion-icon="" class="bg-white border-2 border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring focus:ring-gray-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-8 w-8 rounded-full accordion-caret" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </button>
                                <div :id="'body-'+index">
                                    <shippingsTable
                                        v-bind:admin 				= "admin"
                                        v-bind:index 				= "index"
                                        v-bind:products 			= "shipping.shippedproducts"
                                        v-bind:shipping 			= "shipping"
                                        @flashreload                = flashReload
                                        @delivered                  = tab3show
                                        ref 						= "allTodayRef" 
                                    ></shippingsTable>

                                    <!-- footer  -->
                                    <h2 class="text-black text-2xl mx-2 mt-1 mb-2 flex items-center justify-between flex-col">
                                        <p class="text-black uppercase text-xl inline-flex justify-between w-full">
                                            Delivery Status:  
                                            <span class="text-rose-500 uppercase underline" v-if="shipping.shipping_delivered == 0">
                                                In Transit:
                                                <span>{{ formatDate(shipping.delivery_date) }}: {{ fromDate(shipping.delivery_date) }}.</span>
                                            </span>
                                            <span class="text-emerald-600 uppercase underline" v-else> 
                                                Delivered:
                                                <span>{{ formatDate(shipping.delivered_on) }}: {{ fromDate(shipping.delivered_on) }}.</span>
                                            </span>
                                        </p>
                                        <p class="text-black uppercase text-xl inline-flex justify-between w-full">Delivery Cost:  
                                            <span class="text-teal-600 uppercase underline"> 
                                                KSH 150 
                                            </span>
                                        </p>
                                        <p class="text-black uppercase text-3xl inline-flex justify-between w-full">
                                            Total Costs:  
                                            <span class="text-blue-600 uppercase underline">
                                                {{ Number(shipping.shipping_items).toLocaleString() }} Items
                                            </span>
                                            <span class="text-green-600 uppercase underline">
                                                KSH {{ Number(shipping.shipping_total).toLocaleString() }}
                                            </span>
                                        </p>
                                    </h2>
                                </div>
                            </h2>
                            <!-- space  -->
                            <hr class="border-b border-gray-500 rounded-md my-2 w-[90%] mx-auto">
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import flash                  from '../../AlertComponents/flash-simple.vue';
    // tables 
    import shippingsTable         from '../tables/allShippings-table.vue';
    // import transitTable           from '../tables/transitShippings-table.vue';
    // import deliveredTable         from '../tables/deliveredShippings-table.vue';

    import moment                 from 'moment';

    export default {
        props: [

        ],

        data() {
            return {
                // load 
                isloading: false,

                // datasets 
                inStock: [],
                outOfStock: [],

                // page name 
                view_name: "",

                // tabs
                // classes
                activeTab: 'inline-block p-4 py-3 border-b-2 border-blue-700 uppercase text-blue-700',
                inactiveTab: 'inline-block p-4 py-3 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 uppercase',
                tabBody: 'bg-transparent dark:bg-transparent relative flex flex-col min-w-0 break-words w-full mb-4',
                sectionBody: 'bg-gray-100/50 dark:bg-gray-800 relative flex flex-col min-w-0 break-words w-full mb-2 bg-blueGray-200 border border-gray-900 rounded-md shadow hover:shadow-md p-2',
                sectionBodyTransit: 'bg-blue-400/10 dark:bg-blue-800 relative flex flex-col min-w-0 break-words w-full mb-2 border border-blue-900 rounded-md shadow hover:shadow-md p-2',
                sectionBodyDelivered: 'bg-green-400/10 dark:bg-green-800 relative flex flex-col min-w-0 break-words w-full mb-2 border border-green-900 rounded-md shadow hover:shadow-md p-2',
                sectionBodyToday: 'bg-rose-400/10 dark:bg-rose-800 relative flex flex-col min-w-0 break-words w-full mb-2 border border-rose-900 rounded-md shadow hover:shadow-md p-2',

                caretClass: 'bg-white border-2 border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring focus:ring-gray-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 h-8 w-8 rounded-full accordion-caret',
                caretClassTransit: 'bg-blue-400/10 border-2 border-blue-800 focus:outline-none hover:bg-blue-100 focus:ring focus:ring-blue-200 text-md dark:bg-gray-800 text-gray-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-600 dark:focus:ring-blue-700 h-8 w-8 rounded-full accordion-caret',
                caretClassDelivered: 'bg-green-400/10 border-2 border-green-800 focus:outline-none hover:bg-green-100 focus:ring focus:ring-green-200 text-md dark:bg-green-800 text-gray-800 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-600 dark:focus:ring-green-700 h-8 w-8 rounded-full accordion-caret',
                caretClassToday: 'bg-rose-400/10 border-2 border-rose-800 focus:outline-none hover:bg-rose-100 focus:ring focus:ring-rose-200 text-md dark:bg-rose-800 text-gray-800 dark:text-white dark:border-rose-600 dark:hover:bg-rose-700 dark:hover:border-rose-600 dark:focus:ring-rose-700 h-8 w-8 rounded-full accordion-caret',

                btn1class: '',
                btn2class: '',
                btn3class: '',
                btn4class: '',

                // bodies 
                tab1body: true,
                tab2body: false,
                tab3body: false,
                tab4body: false,

                // bodies 
                tab1name: 'View all',
                tab2name: 'In Transit',
                tab3name: 'Delivered',
                tab4name: 'Today Deliveries',

                // auth datasets 
                user:           {},
                logged:         '',
                admin:          '',

                // shipping datasets 
                allShippings:       [],
                transit:            [],
                delivered:          [],
                today:              []
            }
        },

        components: {
            flash,
            shippingsTable
        },

        beforeMount() {
            this.isloading = true;
            this.getUser();
            // this.tab1show();
        },

        methods: {
            loaded() {
                this.view_name = this.$route.name;
                this.isloading = false;
                window.scrollTo(0, 1);
                window.scrollTo(0, 0);
            },

            // get diff for humans time
            fromDate(date) {
                return moment(date).fromNow()
            },
            
            // get formatted time
            formatDate(date) {
                return moment(date).format("ddd, Do MMM YYYY")
            },

            getUser() {
                axios.get('/getUser/')
                    .then(
                    	({data}) => {
                    		this.user   = data[0]
                            this.logged = data[1]
                            this.admin  = data[2]
                            // get shippings 
                            if (this.admin == '1') {
                                this.getShippingsAdmin();
                                this.tab1name = 'View all (admin)';
                                this.tab4show();
                            } else {
                                this.getShippings(data[0]); 
                                this.tab1show();   
                            }
                    });
            },

            getShippingsAdmin() {
                this.isLoading = true;
                axios.get('/api/getShippings')
                    .then(
                    	({data}) => {
                            this.allShippings   = data[0]
                    		this.transit        = data[1]
                            this.delivered      = data[2]
                            this.today          = data[3]
                            this.loaded();
                    });
            },

            getShippings(user) {
                this.isLoading = true;
                axios.get('/api/getShippings/'+ user.id)
                    .then(
                    	({data}) => {
                            this.allShippings   = data[0]
                    		this.transit        = data[1]
                            this.delivered      = data[2]
                            this.loaded();
                    });
            },

            // show tabs 
            tab1show() {
                this.tab1body     = true;
                this.tab2body     = false;
                this.tab3body     = false;
                this.tab4body     = false;
                this.btn1class    = this.activeTab;
                this.btn2class    = this.inactiveTab;
                this.btn3class    = this.inactiveTab;
                this.btn4class    = this.inactiveTab;
                this.sectionBody  = this.sectionBody;
                this.caretClass   = this.caretClass;
            },

            tab2show() {
                this.tab1body     = false;
                this.tab2body     = true;
                this.tab3body     = false;
                this.tab4body     = false;
                this.btn1class    = this.inactiveTab;
                this.btn2class    = this.activeTab;
                this.btn3class    = this.inactiveTab;
                this.btn4class    = this.inactiveTab;
                this.sectionBody  = this.sectionBodyTransit;
                this.caretClass   = this.caretClassTransit;
            },

            tab3show() {
                this.tab1body     = false;
                this.tab2body     = false;
                this.tab3body     = true;
                this.tab4body     = false;
                this.btn1class    = this.inactiveTab;
                this.btn2class    = this.inactiveTab;
                this.btn3class    = this.activeTab;
                this.btn2class    = this.inactiveTab;
                this.sectionBody  = this.sectionBodyDelivered;
                this.caretClass   = this.caretClassDelivered;
            },

            tab4show() {
                this.tab1body     = false;
                this.tab2body     = false;
                this.tab3body     = false;
                this.tab4body     = true;
                this.btn1class    = this.inactiveTab;
                this.btn2class    = this.inactiveTab;
                this.btn3class    = this.inactiveTab;
                this.btn4class    = this.activeTab;
                this.sectionBody  = this.sectionBodyToday;
                this.caretClass   = this.caretClassToday;
            },

            // show accordions 
            showAllInfo(index) {
                this.$refs.allShippingRef[index].show();
            },

            showTransitInfo(index) {
                this.$refs.allTransitRef[index].show();
            },

            showDeliveredInfo(index) {
                this.$refs.allDeliveredRef[index].show();
            },

            showTodayInfo(index) {
                this.$refs.allTodayRef[index].show();
            },

            flashReload([message, body]) {
                this.$refs.childComponentRef.flash([message, body]);
                // get shippings 
                if (this.admin == '1') {
                    this.getShippingsAdmin();
                } else {
                    this.getShippings(this.user);    
                }
            }
        }
    }
</script>