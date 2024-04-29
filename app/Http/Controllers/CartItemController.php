<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\Shipping;

use Illuminate\Http\Request;
use App\Models\ProductThumbnail;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{

    public function index()
    {
        return view('home');
    }

    public function cartCheck(Product $product)
    {
        $cartItems = CartItem::where([
                                ['buyer_id', Auth::user()->id],
                                ['product_id', $product->id],
                                ['bought', 0]
                            ])
                            ->count();

        $sum = CartItem::where([
                                ['buyer_id', Auth::user()->id],
                                ['product_id', $product->id],
                                ['bought', 0]
                            ])
                            ->sum('product_quantity');

        // return [$cartItems, $sum];
        if ($cartItems >= 1) {
            $message = true;
            return [$message,$cartItems,$sum];
        } else {
            $message = false;
            return [$message,$cartItems,$sum];
        }   
    }

    public function cartAdd(Request $request, Product $product)
    {
        // validate the request data
        request()->validate(
            ['product_quantity'   => 'required',]
        );

        $now = Carbon::now();

        if (Auth::check()) {
            $buyer_id = Auth::user()->id;
        } else {
            $buyer_id = 'Not Signed In';
        }

        $total = $request->product_quantity * $product->price;

        CartItem::create([
            'buyer_id'          => $buyer_id,
            'seller_id'         => $product->admin_id,
            'product_id'        => $product->id,
            'product_name'      => $product->name,
            'product_price'     => $product->price,
            'product_quantity'  => $request->product_quantity,
            'product_stock'     => $product->stock,
            'product_total'     => $total,
            'thumbnail_path'    => $product->thumbnail_path,
            'date_added'        => $now,
            'in_cart'           => 1,
            'in_transit'        => 0,
            'bought'            => 0,
        ]);

        Product::where('id', $product->id)->update([
            'in_cart'        => 0,
        ]);

        $cartItems = CartItem::get();

        return response()->json([null, 200, $cartItems]);
    }

    public function cartRemove(Product $product)
    {
        Product::where('id', $product->id)->update([
            'in_cart'        => 0,
        ]);

        $items = CartItem::where([
                            ['buyer_id', Auth::user()->id],
                            ['product_id', $product->id],
                            ['bought', 0],
                        ])
                        ->get();

        foreach ($items as $item) {
            $item = CartItem::where('id', $item->id)->first();
            $item->delete();
        }

        return response()->json([null, 200]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(CartItem $cartItem)
    {
        //
    }

    public function edit(CartItem $cartItem)
    {
        //
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $item = CartItem::where('id', $cartItem->id)
                        ->first();

        $total = $request->product_quantity * $item->product_price;

        //get the data and update
        CartItem::where('id', $cartItem->id)->update([
            'product_quantity'  => $request->product_quantity,
            'product_total'     => $total,
        ]);

        return response()->json([null, 200]);
    }

    public function destroy(CartItem $cartItem)
    {
        // get the CartItem 
        $cartItem    = CartItem::findOrFail($cartItem->id);
    }

    // api calls 
    public function getCartNav(User $user)
    {
        $items = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 1],
                            ['in_transit', 0],
                            ['bought', 0],
                        ])
                        ->count();

        return $items;
    }

    public function getCart(User $user)
    {
        $items = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 1],
                            ['in_transit', 0],
                            ['bought', 0],
                        ])
                        ->with('product:id,name,stock')
                        ->get();

        $transit_items = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 0],
                            ['in_transit', 1],
                            ['bought', 0],
                        ])
                        ->get();

        $bought_items = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 0],
                            ['in_transit', 0],
                            ['bought', 1],
                        ])
                        ->get();

        $total = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 1],
                            ['bought', 0],
                        ])
                        ->sum('product_total');

        $total_no = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 1],
                            ['bought', 0],
                        ])
                        ->sum('product_quantity');

        return [$items, $total, $total_no];
    }

    public function getCartIndex(User $user)
    {
        $items = CartItem::where([
                                ['buyer_id', $user->id],
                                ['in_cart', 1],
                                ['in_transit', 0],
                                ['bought', 0],
                            ])
                            ->get();

        $transit_items = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 0],
                            ['in_transit', 1],
                            ['bought', 0],
                        ])
                        ->get();

        $bought_items = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 0],
                            ['in_transit', 0],
                            ['bought', 1],
                        ])
                        ->get();

        $total = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 1],
                            ['bought', 0],
                        ])
                        ->sum('product_total');

        $total_no = CartItem::where([
                            ['buyer_id', $user->id],
                            ['in_cart', 1],
                            ['bought', 0],
                        ])
                        ->sum('product_quantity');

        return [$items, $total, $total_no, $transit_items, $bought_items];
    }

    public function getCartShip()
    {
        $items = CartItem::where([
                                ['buyer_id', Auth::user()->id],
                                ['in_cart', 1],
                                ['in_transit', 0],
                                ['bought', 0],
                            ])
                            ->get();

        $transit_items = CartItem::where([
                            ['buyer_id', Auth::user()->id],
                            ['in_cart', 0],
                            ['in_transit', 1],
                            ['bought', 0],
                        ])
                        ->get();

        $bought_items = CartItem::where([
                            ['buyer_id', Auth::user()->id],
                            ['in_cart', 0],
                            ['in_transit', 0],
                            ['bought', 1],
                        ])
                        ->get();

        $total = CartItem::where([
                            ['buyer_id', Auth::user()->id],
                            ['in_transit', 1],
                            ['bought', 0],
                        ])
                        ->sum('product_total');

        $total_no = CartItem::where([
                            ['buyer_id', Auth::user()->id],
                            ['in_transit', 1],
                            ['bought', 0],
                        ])
                        ->sum('product_quantity');

        return [$items, $total, $total_no, $transit_items, $bought_items];
    }

    public function getShippingOrder()
    {
        $shipping = Shipping::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->with('shippedproducts')->first();

        return $shipping;
    }
}
