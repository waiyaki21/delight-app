<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //pass through all products
        view()->composer(['layouts.app','partials.modals.search-products-modal','home','search','partials.js_scripts.app'],
            function ($view){
                if (Auth::check()) {
                    $view->with('user', \App\Models\User::where('id', Auth::user()->id)
                    ->first());
                }

                $view->with('products', \App\Models\Product::orderBy('created_at', 'desc')
                                            ->get());

                $view->with('catergories', \App\Models\Catergory::orderBy('created_at', 'asc')
                                            ->with('brands.inStockProducts:id,brand_id')
                                            ->get()); 
                                            
                $view->with('routename', Route::currentRouteName()); 

                // $view->with('notifications', auth()->user()->unreadnotifications);
            }
        );
        
        //pass through all catergories
        view()->composer(['partials.navs.main-navs','partials.modals.add-products-modal','partials.modals.search-products-modal'],
            function ($view){
                $view->with('catergories', \App\Models\Catergory::orderBy('created_at', 'asc')
                                            ->with('brands')
                                            ->get());

                $view->with('brands', \App\Models\Brand::orderBy('created_at', 'asc')
                                            ->get());

                if (Auth::check()) {
                    $view->with('user', \App\Models\User::where('id', Auth::user()->id)
                    ->first());
                }
            }
        );
    }
}
