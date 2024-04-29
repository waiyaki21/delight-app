<template>
    <hr class="width-hr mx-auto mb-4 border-b-2 border-blueGray-200" />

    <footer class="bg-white dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0">
                    <a href="/" class="flex items-center">
                        <img src="/img/logos/delight-electronics-logo-bny.png" class="mr-2 mb-2 logo" alt="Delight Electronics Logo" />
                        <span class="self-center text-2xl font-normal whitespace-nowrap dark:text-white">Delight Electronics</span>
                    </a>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 class="mb-6 text-sm font-normal text-gray-900 uppercase dark:text-white">Resources</h2>
                        <ul class="text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="https://flowbite.com/" class="hover:underline">Flowbite</a>
                            </li>
                            <li>
                                <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-normal text-gray-900 uppercase dark:text-white">Follow us</h2>
                        <ul class="text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                            </li>
                            <li>
                                <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-normal text-gray-900 uppercase dark:text-white">Legal</h2>
                        <ul class="text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 
                <a href="/" class="hover:underline">Delight Electronics™</a>
                . All Rights Reserved.
                </span>
                <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                    <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 8 19">
                            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="sr-only">Facebook page</span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
    
    <footer class="block mt-2 mb-1 pt-2 pb-1 dark:bg-gray-900">
        <div class="container mx-auto px-4">
            <!-- <hr class="mb-4 border-b-1 border-blueGray-200" /> -->
            <div class="flex flex-wrap items-center md:justify-between justify-center">
                <div class="w-full md:w-4/12 px-4">
                    <div
                        class="text-sm text-blueGray-500 dark:text-white font-normal py-1 text-center md:text-left whitespace-nowrap">
                        Copyright © <span>{{ getYear() }}</span>
                    </div>
                </div>
                <div class="w-full md:w-8/12 px-4">
                    <ul class="flex flex-wrap list-none md:justify-end justify-center">
                        <li>
                            <a href=""
                                class="text-blueGray-600 dark:text-white hover:text-blueGray-800 text-sm font-normal block py-1 px-3">
                                Kelvin Waiyaki Wanjohi
                            </a>
                        </li>
                        <li>
                            <a href=""
                                class="text-blueGray-600 dark:text-white hover:text-blueGray-800 text-sm font-normal block py-1 px-1">
                                +254794967315
                            </a>
                        </li>
                        <li>
                            <a href="tel:+254794967315" data-tooltip-target="call-footer-tooltip"
                                class="text-blueGray-600 dark:text-white hover:text-blueGray-800 text-sm font-normal block py-1 px-1"
                                style="margin-top: -9px;">
                                <i class="text-blueGray-600 dark:text-white fas fa-phone-alt text-sm my-2 mx-1"></i>
                                <div id="call-footer-tooltip" role="tooltip"
                                    class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                    Call, Waiyaki for your own state of the art system of your own preference.
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="whatsapp://send?text=Hello Waiyaki&phone=+254794967315"
                                data-tooltip-target="whatsapp-footer-tooltip"
                                class="text-blueGray-600 dark:text-white hover:text-blueGray-800 text-sm font-normal block py-1 px-1"
                                style="margin-top: -9px;">
                                <i class="text-blueGray-600 dark:text-white fas fa-sms text-sm my-2 mx-1"></i>
                                <div id="whatsapp-footer-tooltip" role="tooltip"
                                    class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                    Click to Whatsapp, Waiyaki for your own state of the art system of your own preference.
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