<div class="container w-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full">
        <div
          class="flex-col min-w-0 break-words bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-2">
            <div class="text-center mb-1">
              <h6 class="text-blueGray-500 text-sm font-normal">
                Sign up with
              </h6>
            </div>
            <div class="btn-wrapper text-center h-10">
              <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-normal text-xs ease-linear transition-all duration-150 cursor-not-allowed" title="This Feature is not yet ready!" type="button">
                <img alt="..." class="w-5 mr-1" src="/img/google.svg"/>
                Google
              </button>
            </div>
            <hr class="mt-1 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-4 py-1 pt-0">
            <form method="POST" action="{{ route('registerModal') }}">
              @csrf
              <div class="relative w-full mb-1">
                <label
                  class="block uppercase text-blueGray-600 text-sm font-normal underline mb-0"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  type="name" name="name"
                  class="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name"
                />
              </div>
  
              <div class="relative w-full mb-1">
                <label
                  class="block uppercase text-blueGray-600 text-sm font-normal underline mb-0"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email" name="email"
                  class="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>
  
              <div class="relative w-full mb-1">
                <label
                  class="block uppercase text-blueGray-600 text-sm font-normal underline mb-0"
                  htmlFor="grid-password">
                  Phone Number
                </label>
                <span class="z-10 leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-xs items-center justify-center px-2 pt-1" style="top: 35px;">
                  +254
                </span>
                <input
                  type="tel" name="phone_number"
                  class="px-10 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 outline-none focus:outline-none focus:shadow-outline w-full pl-10 shadow"
                  placeholder="Phone Number"
                />
              </div>
  
              <div class="relative w-full mb-1">
                <label
                  class="block uppercase text-blueGray-600 text-sm font-normal underline mb-0"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password" name="password"
                  class="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
  
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border-1 border-gray-100  rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span
                    class="ml-2 text-sm font-normal text-blueGray-600"
                  >
                    I agree with the
                    <a href="javascript:void(0)" class="text-gray-500">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
  
              <div class="text-center mt-1">
                <button
                  class="w-full block text-center uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-200 font-medium text-lg px-5 py-1.5 mr-2 mb-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer shadow"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            {{-- <div class="btn-wrapper text-start">
              <a
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150 cursor-pointer" data-tabs-target="#login">
                Already have an account?
              </a>
            </div> --}}
          </div>
        </div>
      </div>
    </div>
</div>