<link href="{{ asset('/img/logos/Delight Electronics-logos_transparent.png') }}" rel="shortcut icon" />
<link rel="icon" href="/favicon.ico" />
{{-- <link href='https://fonts.googleapis.com/css?family=Sofia Sans Extra Condensed' rel='stylesheet'> --}}
<link href="{{ asset('/css/vendor/@fortawesome/fontawesome-free/css/all.min.css') }}" rel="stylesheet" >
<link href="{{ asset('/css/main.css') }}" rel="stylesheet" >
{{-- <title>{{ Route::currentRouteName() }} | {{ config('app.name') }}</title> --}}
<title>{{ config('app.name') }}</title>

{{-- <style>
    body {
        font-family: 'Sofia Sans Extra Condensed';font-size: 30px;
    }
</style> --}}

{{-- <script>
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
</script> --}}