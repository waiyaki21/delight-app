<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\User;
use App\Models\Admin;
use App\Models\Buyer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use SocialiteProviders\Manager\Config;
use App\Providers\RouteServiceProvider;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function redirectToGoogleAdmin()
    {
        return Socialite::driver('google')->redirect();

        // return $test;

        // $googleUser = Socialite::driver('google')->user();
        
        // return $googleUser;

        // $user = User::updateOrCreate([
        //     'google_id' => $googleUser->id,
        // ], [
        //     'name'  => $googleUser->name,
        //     'email' => $googleUser->email,
        //     'admin' => true
        // ]);

        // Auth::login($user);

        // return redirect('/');
        
    }

    public function handleGoogleCallback()
    {
        try {
      
            $user = Socialite::driver('google')->user();
       
            $finduser = User::where('google_id', $user->id)->first();
       
            if($finduser){
       
                Auth::login($finduser);
      
                return redirect(RouteServiceProvider::HOME);
       
            }else{
                // random number to generate order_id
                $random     = rand(1000,100000);

                $pass       = 'delightpassword'. $random;
                
                $newUser    = User::create([
                                'name'      => $user->name,
                                'email'     => $user->email,
                                'google_id' => $user->id,
                                'password'  => encrypt($pass)
                            ]);

                $new = User::where('email', $user->email)->first();

                if ($new->id == '1' || $new->id == '2') {
                    // create admin conditional 
                    Admin::create([
                        'user_id'       => $new->id,
                        'name'          => $new->name,
                        'email'         => $new->email,
                        'phone_number'  => $random,
                    ]);

                    User::where('id', $new->id)
                    ->update([
                        'admin' => true
                    ]);
                }

                $buyer = Buyer::create([
                                'user_id'       => $new->id,
                                'name'          => $new->name,
                                'email'         => $new->email,
                                'phone_number'  => $new->phone_number,
                            ]);
      
                Auth::login($newUser);

                if ($new->id == '1' || $new->id == '2') {
                    return redirect(RouteServiceProvider::ADMIN_HOME);
                } else {
                    return redirect(RouteServiceProvider::HOME);
                }
            }
      
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }

    public function handleGoogleCallbackAdmin()
    {
        try {
      
            $user = Socialite::driver('google')->user();
       
            $finduser = User::where('google_id', $user->id)->first();
       
            if($finduser){
       
                Auth::login($finduser);
      
                return redirect(RouteServiceProvider::HOME);
       
            }else{
                // random number to generate order_id
                $random     = rand(1000,100000);

                $pass       = 'delightpassword'. $random;
                
                $newUser    = User::create([
                                'name'      => $user->name,
                                'email'     => $user->email,
                                'google_id' => $user->id,
                                'password'  => encrypt($pass)
                            ]);

                $new = User::where('email', $user->email)->first();

                $admin = Admin::create([
                            'user_id'       => $new->id,
                            'name'          => $new->name,
                            'email'         => $new->email,
                            'phone_number'  => $random,
                        ]);

                $buyer = Buyer::create([
                                'user_id'       => $new->id,
                                'name'          => $new->name,
                                'email'         => $new->email,
                                'phone_number'  => $random,
                            ]);
      
                Auth::login($newUser);
      
                return redirect(RouteServiceProvider::HOME);
            }
      
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}