<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
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
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = Auth::user();
        $product = Product::find($request->product_id);

        // Check if already favorited
        if ($user->favorites()->where('product_id', $product->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Product is already in favorites.',
            ], 400);
        }

        // Add to favorites
        $favorite = new Favorite();
        $favorite->user_id = $user->id;
        $favorite->product_id = $product->id;
        $favorite->save();

        return response()->json([
            'success' => true,
            'message' => 'Product added to favorites.',
            'favorite' => $favorite,
        ]);
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
