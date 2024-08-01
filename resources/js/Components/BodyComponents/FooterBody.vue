<template>
    <hr class="width-hr mx-auto mb-2 border-b-2 border-blueGray-200" />
    <footer class="block mt-2 mb-1 pt-2 pb-1 dark:bg-gray-900">
        <div class="container mx-auto px-4">
            <!-- <hr class="mb-4 border-b-1 border-blueGray-200" /> -->
            <div class="flex flex-wrap items-center md:justify-between justify-center">
                <div class="w-full md:w-4/12 px-4">
                    <div class="text-sm text-blueGray-500 dark:text-white font-normal py-1 text-center md:text-left whitespace-nowrap">
                        Copyright © <span>{{ getYear() }}</span>
                    </div>
                </div>
                <div class="w-full md:w-8/12 px-4">
                <ul class="flex flex-wrap list-none md:justify-end justify-center">
                    <li>
                        <a href="" class="text-blueGray-600 dark:text-white hover:text-blueGray-800 text-sm font-normal block py-1 px-3">
                            {{ appname }}.
                        </a>
                    </li>
                    <li>
                        <a href="" class="text-blueGray-600 dark:text-white hover:text-blueGray-800 text-sm font-normal block py-1 px-1">
                            {{ contact1 }}
                        </a>
                    </li>
                    <li>
                        <a :href="'tel:+'+contact1" data-tooltip-target="call-footer-tooltip" class="text-blueGray-600 dark:text-white hover:text-blueGray-800 text-sm font-normal block py-1 px-1" style="margin-top: -9px;">
                            <i class="text-blueGray-600 dark:text-white fas fa-phone-alt text-sm my-2 mx-1"></i>
                            <div id="call-footer-tooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                            Call, Delight Electronics.
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a :href="'whatsapp://send?text=Hello Delight Electronics&phone=+'+ contact1" data-tooltip-target="whatsapp-footer-tooltip" class="text-blueGray-600 dark:text-white hover:text-blueGray-800 text-sm font-normal block py-1 px-1" style="margin-top: -9px;">
                            <i class="text-blueGray-600 dark:text-white fas fa-sms text-sm my-2 mx-1"></i>
                            <div id="whatsapp-footer-tooltip" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                            Whatsapp, Delight Electronics. 
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import moment from 'moment';
    export default {

        data() {
            return {
                appname:  process.env.MIX_APP_NAME,
                contact1: process.env.MIX_CONTACT1,
            }
        },

        created() {
        },

        methods: {
            getYear() {
                var year = moment().year();

                return year;
            }
        }
    }
</script>