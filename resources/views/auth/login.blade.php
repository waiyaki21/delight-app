@extends('layouts.auth')

@section('content')
<div class="container mx-auto px-4 h-full">
  <div class="flex content-center items-center justify-center h-full">
    <div class="w-full lg:w-6/12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
      >
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="text-center mb-3">
            <h6 class="text-blueGray-500 text-sm font-bold">
              Sign in with
            </h6>
          </div>
          <div class="btn-wrapper text-center">
            <a href="{{ route('Google Auth') }}"
              class="bg-white active:bg-blueGray-50 text-blueGray-700 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150 cursor-not-allowed" title="Login with Google!" type="button">
              <img alt="Delight Electronics Google Auth Login" class="w-5 mr-1" src="{{ asset('/img/google.svg') }}"/>
              Google
            </a>
            {{-- <a href="#"
              class="bg-white active:bg-blueGray-50 text-blueGray-700 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150 cursor-not-allowed" title="Login with Google Not yet ready!" type="button">
              <img alt="Delight Electronics Google Auth Login" class="w-5 mr-1" src="{{ asset('/img/google.svg') }}"/>
              Google
            </a> --}}
          </div>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div class="text-blueGray-400 text-center mb-3 font-bold">
            <small>Or sign up with credentials</small>
          </div>
          <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                type="email" name="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Email"
              />
            </div>

            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                type="password" name="password"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
              />
            </div>

            <div class="min-h-6 pl-6.92 mb-0.5 block">
              <input id="remember" name="remember" class="w-4.92 h-4.92 ease-soft -ml-6.92 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['fas fa-check'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" value="" checked />
              <label class="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700" for="terms">
                <a href="javascript:;" class="font-bold text-slate-700">Remember Me?</a>
              </label>
            </div>

            <div class="text-center mt-6">
              <button
                class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div class="btn-wrapper text-start">
            <a
              class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150 cursor-pointer" href="/register">
              Don't have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection