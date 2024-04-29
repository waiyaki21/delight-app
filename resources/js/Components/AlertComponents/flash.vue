<template>
    <div id="product-alert" :class="[this.alertCLass, this.classType]" role="alert" v-show="show">
      <div class="">
        <div class="w-full inline-flex items-center">  
            <div class="w-4/5">
                <div class="mt-2 mb-4 text-sm text-black">
                    <h4 class="text-xl mb-0 font-medium underline dark:text-white uppercase">{{ body }}</h4>
                </div>
            </div>
            <div class="w-1/5">
                <button type="button" class="-mx-1.5 -my-1.5 text-gray-900 hover:text-red-900 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white ml-2 mb-2" data-dismiss-target="#product-alert" aria-label="Close">
                    <span class="sr-only">Dismiss</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
        <div class="row row-no-space">
            <div class="col-md-12">
                <a :href="'/product_show/'+product.id" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-normal shadow text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer uppercase block text-center">
                    View Product
                    <i class="fas fa-arrow-right pl-1"></i>
                </a>
            </div>
        </div>
      </div>
    </div>
</template>
   
<script>
    export default {
        props: [
            // 'neworder'
        ],

        data() {
            return {
                show        : false,
                body        : '',
                classType   : '',
                product     : {},
                alertCLass  : 'max-w-sm spacing2 card-shadow2 flex p-4 bg-gray-100 rounded-lg dark:bg-gray-700 alert my-4 bg-green-100 dark:bg-green-900'
            }
        },

        created() {
            // this.$parent.$on('flash', this.flash);
            // if(this.message) {
                // this.flash(this.message)
            // }
            // window.addEventListener('flash',(message) => this.flash(message))
        },

        methods: {
            flash(message) {
                this.body       = message[0]
                this.product    = message[1]
                this.classType  = message[2]
                this.show       = true

                setTimeout(() => {
                    this.hide()
                },5000)
            },

            flashTimed(message) {
                this.body       = message[0]
                this.product    = message[1]
                this.classType  = message[2]
                this.show       = true

                setTimeout(() => {
                    this.hide()
                }, message[3])
            },

            hide() {
                this.show = false;
            }
        }
    }
</script>