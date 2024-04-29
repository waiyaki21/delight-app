<template>
    <flash-message
        ref="childComponentRef"
    ></flash-message>
    <!-- Main modal -->
    <div id="contact-plugin" tabindex="-1" aria-hidden="true" class="fixed z-50 w-2/3 p-4 overflow-x-hidden overflow-y-auto" v-show="showModal" style="right: 10px;bottom: 70px;">
        <div class="relative w-full h-full max-w-md md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2 border-black">
                <div class="p-4">
                    <!-- Modal header -->
    	            <div class="flex justify-between items-start rounded-t border-b dark:border-gray-600">
    	                <h3 class="text-base font-semibold text-gray-900 dark:text-white underline title uppercase text-center">
    	                    Contact Us.
    	                </h3>
    	                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" @click="showContact">
    	                    <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    	                    <span class="sr-only">Close modal</span>
    	                </button>
    	            </div>
                    <h3 class="mb-1 text-xs font-normal uppercase underline text-success dark:text-white">
                        replies usually within two minutes
                    </h3>
                    <form class="my-2" @submit.prevent="submit">
                        <div>
                            <textarea type="message" rows="5" name="message" id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white my-1" placeholder="Type in your message here!" required v-model="fields.message"></textarea>
                        </div>
                        <a :href="'https://wa.me/' + this.$props.contact1 + '?text='+fields.message" target="_blank" @click="submitMessage" class="w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded shadow text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 uppercase my-1">
                            Send Message
                        </a>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="/register" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
    <div class="fixed right-6 bottom-6 group" @click="showContact">
        <button type="button" @click="showContact" aria-expanded="false" class="flex items-center justify-center text-black bg-green-700 rounded-full w-12 h-12 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none dark:focus:ring-green-800 border-2 border-black">
            <i class="fab fa-whatsapp" @click="showContact"></i>
        </button>
    </div>
</template>

<script>
    export default {
        props: [
            'contact1'
        ],

        components: {
            // flash
        },

        data() {
            return {
                // modal 
                showModal: false,

                //form
                errors:     {},
                fields:     {},
                formInfo:   []
            }
        },

        created() {
            this.formFields();
		},

        methods: {
            showContact() {
                this.showModal = !this.showModal;
            },

            submitMessage() {
                let message = 'Sending Message!';
                this.$refs.childComponentRef.flash([message, 'bg-green-100 dark:bg-green-900']);
                setTimeout(this.showContact(), 1000);
            },
            
            // get form fields
            formFields() {
                this.fields.message         = "";
                this.errors                 = {};
            },

            reload() {
                this.formInfo = utilities.loaded(this);
            },
        }
    }
</script>