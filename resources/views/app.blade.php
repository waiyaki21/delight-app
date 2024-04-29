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
    <!--alerts-->
    @include('partials.alerts.alert')
    <!--end alerts-->
    <div id="root">
      <div class="relative bg-blueGray-50 dark:bg-gray-900">
        
        <!-- navigation menus -->
        @include('partials.navs.main-navs')
        <!-- end navigation menus -->

        <!-- body content -->
        @yield('content')
        <!--end body content -->
        
      </div>
    </div>

    <!-- plugins -->
    @include('partials.plugins.main-plugins')
    <!-- end plugins -->

    <!-- modals -->
    @include('partials.modals.add-catergories-modal')
    @include('partials.modals.add-products-modal')
    <!-- end modals -->
    
    <!-- footer -->
    @include('partials.footer.app')
    <!-- end footer -->

    <!-- scripts -->
    @include('partials.js scripts.app')
    <!-- end scripts -->
  </body>
</html>
