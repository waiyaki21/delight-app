<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function show()
    {
        return view('home');
    }

    // Display a list of the user's favorite products
    public function index()
    {
        $user = Auth::user();
        $favorites = $user->favorites()->with('product')->get();

        return response()->json([
            'success' => true,
            'favorites' => $favorites,
        ]);
    }

    // Add a product to the user's favorites
    public function store($id)
    {
        $user       = Auth::user();
        $product    = Product::find($id);

        // Check if already favorited
        if ($user->favorites()->where('product_id', $product->id)->exists()) {
            // if favorited remove it 
            $favorite = $user->favorites()->where('product_id', $product->id)->first();
            $this->destroy($favorite->id);
            $message = $product->name . ' :Removed from Wishlist.';
            $body = 'danger';
        } else {
            // Add to favorites
            $favorite = new Favorite();
            $favorite->user_id = $user->id;
            $favorite->product_id = $product->id;
            $favorite->save();

            $message = $product->name. ' :Added to wishlist.';
            $body = 'success';
        }

        $favorites = Favorite::where('user_id', $user->id)->get();
        return [$message, $favorites, $body];
    }

    // Remove a product from the user's favorites
    public function destroy($id)
    {
        $user = Auth::user();
        $favorite = $user->favorites()->where('id', $id)->first();

        if (!$favorite) {
            return response()->json([
                'success' => false,
                'message' => 'Favorite not found.',
            ], 404);
        }

        $favorite->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product removed from favorites.',
        ]);
    }
}
