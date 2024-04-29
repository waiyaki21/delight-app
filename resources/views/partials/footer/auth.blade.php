<footer class="absolute w-full bottom-0 bg-blueGray-800 pb-6">
    <div class="container mx-auto px-4">
        <hr class="mb-6 border-b-1 border-blueGray-600" />
        <div
        class="flex flex-wrap items-center md:justify-between justify-center"
        >
        <div class="w-full md:w-4/12 px-4">
            <div
            class="text-sm text-white font-semibold py-1 text-center md:text-left"
            >
            Copyright © <span id="get-current-year"></span>
            <a
                href="#"
                class="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
                >Kelvin Waiyaki</a
            >
            </div>
        </div>
        <div class="w-full md:w-8/12 px-4">
            <ul
            class="flex flex-wrap list-none md:justify-end justify-center"
            >
            <li>
                <a
                href=""
                class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >Kelvin Waiyaki</a
                >
            </li>
            <li>
                <a
                href="#"
                class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >+{{ config('app.dev_no') }}</a
                >
            </li>
            </ul>
        </div>
        </div>
    </div>
</footer>