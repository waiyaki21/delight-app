<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <!--sheets-->
    @include('partials.sheets.app') 
    <!--end sheets-->  
  </head>
  <body class="text-blueGray-700 antialiased dark:bg-gray-900">
    <section id="app">
      <!--alerts-->
      @include('partials.alerts.alert')
      <!--end alerts-->
      
      <!-- body -->
      @yield('content')
      <!-- end body -->
    </section>
    <!-- scripts -->
    @include('partials.js_scripts.app')
    <!-- end scripts -->
  </body>
</html>
