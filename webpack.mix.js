const mix = require('laravel-mix');
// const webpack = require('webpack')

const commonExtract = [
    'vue-router',
    '@heroicons/vue/24/outline',
    'vue-simple-range-slider'
];

mix
    .js('resources/js/app.js', 'public/js/app8.js')
    .vue()
    .extract([
        'moment',
        'swiper',
        '@tiptap',
        ...commonExtract
    ])
    .version()

    .js('resources/js/search.js', 'public/js/search.js')
    .vue()
    .extract([
        ...commonExtract
    ])
    .version()

    .postCss('resources/css/main.css', 'public/css/main.css', [
        require('tailwindcss'),
        require('autoprefixer')
    ]);

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

mix.browserSync('127.0.0.1:8000');