<?php

namespace App\Http\Controllers;

use App\Models\Catergory;
use App\Models\Delivery;
use App\Models\Product;
use App\Models\ProductThumbnail;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $catergories = Catergory::orderBy('created_at', 'desc')
                            ->with('brands')
                            ->get();

        // return $products;
        return view('home', compact('catergories'));
    }

    // api calls 
    public function getUser()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $logged = true;
            $admin = Auth::user()->admin;
        } else {
            $user = null;
            $logged = false;
            $admin = 0;
        }

        return [$user, $logged, $admin];  
    }

    public function getUserDelivery()
    {
        // get user
        $user = Auth::user();
        // get delivery
        $delivery = Delivery::where('user_id', $user->id)->first();
        // get deliveries
        $deliveries = Delivery::where('user_id', $user->id)->get();

        return [$user, $delivery, $deliveries];  
    }
}
