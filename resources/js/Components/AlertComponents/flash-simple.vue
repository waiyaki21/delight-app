<template> 
<div class="flash-message-container">
    <div id="flash-message" :class="[this.alertClass, this.classType, this.positionClass]" role="alert" v-show="show" >
        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Info</span>
        <div class="ml-3 text-lg font-medium text-gray-700 dark:text-gray-300 uppercase">
            {{ this.body }}
        </div>
        <button type="button" class="text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-transparent inline-flex h-8 w-8 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white ml-2 mb-2" style="margin-top: -3px;" aria-label="Close" @click="hide">
            <times-icon class="w-5 h-5 text-black"></times-icon>
        </button>
    </div>
</div>
</template>
   
<script>
    export default {
        props: [
            'message'
        ],

        data() {
            return {
                show        : false,
                body        : '',
                classType   : '',
                alertClass  : 'fixed z-10 left-[15px] card-shadow2 flex px-4 py-2 my-4 bg-gray-100 rounded-lg dark:bg-gray-700 alert',
                positionClass : ''
            }
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
                    case (x < 767):
                        this.positionClass = 'bottom-[20px]';
                        break;
                    case (x < 1024):
                        this.positionClass = 'top-[120px]';
                        break;
                    case (x < 2400):
                        this.positionClass = 'top-[120px]';
                        break;
                }
            },

            flash(message) {
                this.body       = message[0]
                this.classType  = message[1]
                this.show       = true

                setTimeout(() => {
                    this.hide()
                },5000)
            },

            flashTimed(message) {
                this.body       = message[0]
                this.classType  = message[1]
                this.show       = true

                setTimeout(() => {
                    this.hide()
                }, message[2])
            },

            hide() {
                this.show = false;
            }
        }
    }
</script>