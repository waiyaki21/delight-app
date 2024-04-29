<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Admin;
use App\Models\Buyer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return view('auth.register');
    }


    public function createAdmin()
    {
        return view('auth.register-admin');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => 'required|string|max:9',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'phone_number'  => $request->phone_number,
            // 'admin'      => 'false',
        ]);

        $new = User::where('email', $request->email)->first();

        $buyer = Buyer::create([
            'user_id' => $new->id,
            'name' => $new->name,
            'email' => $new->email,
            'phone_number' => $new->phone_number,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    public function storeAdmin(Request $request)
    {
        // return $request;
        $request->validate([
            'name'          => 'required|string|max:255',
            'email'         => 'required|string|email|max:255|unique:users',
            'phone_number'  => 'required',
            'password'      => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'phone_number'  => $request->phone_number,
            'password'      => Hash::make($request->password),
            'admin'         => true,
        ]);

        $new = User::where('email', $request->email)->first();

        $admin = Admin::create([
            'user_id'       => $new->id,
            'name'          => $new->name,
            'email'         => $new->email,
            'phone_number'  => $new->phone_number,
        ]);

        $buyer = Buyer::create([
            'user_id'       => $new->id,
            'name'          => $new->name,
            'email'         => $new->email,
            'phone_number'  => $new->phone_number,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::ADMIN_HOME);
    }

    public function storeModal(Request $request)
    {
        $request->validate([
            'name'          => 'required|string|max:255',
            'email'         => 'required|string|email|max:255|unique:users',
            'phone_number'  => 'required|string|max:9',
            'password'      => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'phone_number'  => $request->phone_number,
            // 'admin'      => 'false',
        ]);

        $new = User::where('email', $request->email)->first();

        $buyer = Buyer::create([
            'user_id'       => $new->id,
            'name'          => $new->name,
            'email'         => $new->email,
            'phone_number'  => $new->phone_number,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return back();
    }
}
