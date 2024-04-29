const mix = require('laravel-mix');

// main 
mix
    .js('resources/js/app.js', 'public/js/app.js')
    .vue()
    .extract(['moment','swiper','vue-router','@heroicons/vue/24/outline','@tiptap','vue-simple-range-slider'])
    .version()

// search 
// mix
//     .js('resources/js/search.js', 'public/js/search')
//     .vue()
//     .extract(['vue-router','@heroicons/vue/24/outline','vue-simple-range-slider'])
//     .version()

    // .postCss('resources/css/main.css', 'public/css/main.css', [
    //     require('tailwindcss'), require('autoprefixer')
    // ])

    // .alias({
    //     '@': 'resources/js',
    // });

    // other assets

// mix.scripts([
//             'resources/js/assets/flowbite.js',
//             'resources/js/assets/charts.min.js',
//             'resources/js/assets/popper.js',
//             ], 'public/js/assets/app_assets.js')
    // .disableSuccessNotifications()

if (mix.inProduction()) {
    mix.version();
}