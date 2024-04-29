<!-- Main modal -->
<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-md md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="px-6 py-2 lg:px-2">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white uppercase underline">Create Account / Sign in.</h3>

                <div class="mb-2 border-b border-gray-200 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li class="mr-2" role="presentation">
                            <button class="inline-block p-4 py-2 border-b-2 rounded-t-lg uppercase" id="login-tab" data-tabs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="false">Login</button>
                        </li>
                        <li class="mr-2" role="presentation">
                            <button class="inline-block p-4 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 uppercase" id="signup-tab" data-tabs-target="#signup" type="button" role="tab" aria-controls="signup" aria-selected="false">Sign Up</button>
                        </li>
                    </ul>
                </div>
                <div id="myTabContent">
                    <div class="hidden rounded-lg bg-white dark:bg-gray-800" id="login" role="tabpanel" aria-labelledby="login-tab">
                        @include('partials.forms.login-modal')
                    </div>
                    <div class="hidden rounded-lg bg-white dark:bg-gray-800" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                        @include('partials.forms.register-modal')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
  