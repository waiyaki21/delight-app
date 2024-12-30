<template>
    <div class="fixed group z-10 top-[140px] right-[10px]" v-if="logged == true && user.admin == '1'"
        @mouseleave="closeDial">
        <!-- dial btn  -->
        <button type="button" :class="this.btndropClass" v-if="logged == true && user.admin == '1'" @click="showDial">
            <plus-icon class="h-6 w-6 transition-transform group-hover:rotate-45"></plus-icon>
            <span class="sr-only">Open actions menu</span>
        </button>

        <div :class="[this.dialClass, this.dialDef]" v-show="this.dialShow">
            <!-- Product -->
            <PluginButton id="product" :icon="{ name: 'bag-icon' }" label="Add Product" tooltip="Add Product"
                :btndropClass="btndropClass" :onClick="showProduct" />

            <!-- Catergory -->
            <PluginButton id="catergory" :icon="{ name: 'phone-icon' }" label="Add Catergory"
                tooltip="Add Catergory" :btndropClass="btndropClass" :onClick="addCatergory" />

            <!-- Shipping -->
            <PluginButton id="shipping" :icon="{ name: 'truck-icon' }" label="Shipping" tooltip="View Shipping"
                :btndropClass="btndropClass" :isButton="false" :link="'/shipping/admin/' + user.id" />

            <!-- Out of Stock Items -->
            <PluginButton id="stock" :icon="{ name: 'no-icon' }" label="Stock" tooltip="View Stock"
                :btndropClass="btndropClass" :isButton="false" :link="'/stock/admin/' + user.id" />
        </div>
    </div>

    <div class="fixed right-[10px] top-[80%] z-10 group">
        <a :href="'whatsapp://send?text=Hello Delight Electronics&phone=' + contact1"
            :class="this.whatsappClass">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>
</template>

<script>
    import  PluginButton  from "../../Utilities/Plugins/PluginButton.vue";

    export default {
        props: [
            'user',
            'logged',
            'contact1'
        ],

        components : {
            PluginButton,
        },

        data() {
            return {
                dialDef: 'flex flex-col items-center my-2 space-y-2',
                dialClass: 'hidden',
                dialShow: false,
                btndropClass: 'flex justify-center items-center w-10 h-10 rounded-full hover:rounded-5xl shadow hover:shadow-md text-black hover:text-yellow-300 bg-yellow-300 hover:bg-black border-2 border-black hover:border-yellow-600 focus:ring-1 focus:ring-yellow-300 focus:outline-none',
                whatsappClass: 'flex items-center justify-center text-black bg-green-700 rounded-full w-10 h-10 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-1 focus:ring-green-300 focus:outline-none dark:focus:ring-green-800 border border-black'
            }
        },

        methods: {
            addCatergory() {
                this.showDial();
                this.$emit('opencatergory');
            },

            showProduct() {
                this.showDial();
                this.$emit('openproduct');
            },

            showDial() {
                this.dialShow = !this.dialShow;
                if (this.dialShow == true) {
                    this.dialClass = '';
                } else {
                    this.dialClass = 'hidden';
                }
            },

            closeDial() {
                this.dialShow = false;
            }
        }
    }
</script>