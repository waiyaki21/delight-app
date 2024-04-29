<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Admin;
use App\Models\Buyer;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\Delivery;
use App\Models\Shipping;
use Illuminate\Http\Request;
use App\Models\ShippedProduct;
use App\Notifications\ShippingOrder;
use Illuminate\Support\Facades\Auth;
use App\Notifications\ShippingDelivery;
use Illuminate\Support\Facades\Notification;

class ShippingController extends Controller
{

    public function index()
    {
        return view('home');
    }

    public function store(Request $request)
    {   
        // validate the request data
        request()->validate(
            [
                'delivery_id'            => 'required',
            ],
            [
                'delivery_id.required'   => 'Delivery Location is required',
            ]
        );

        // get buyer 
        $buyer = Buyer::where('user_id', Auth::user()->id)->first();

        // get delivery 
        $delivery = Delivery::where('id', $request->delivery_id)->first();

        // get name 
        $fullname = $delivery->first_name .' '. $delivery->second_name;

        // get location 
        $location = $delivery->city .': '. $delivery->estate . ': ' .$delivery->apartment;

        // cart items 
        $items = CartItem::where([
                            ['buyer_id', Auth::user()->id],
                            ['bought', 0],
                            ['in_cart', 1]
                        ])
                        ->get();

        // cart total 
        $total = CartItem::where([
                            ['buyer_id', Auth::user()->id],
                            ['bought', 0],
                            ['in_cart', 1]
                        ])
                        ->sum('product_total');

        // total quantity
        $total_no = CartItem::where([
                            ['buyer_id', Auth::user()->id],
                            ['bought', 0],
                            ['in_cart', 1]
                        ])
                        ->sum('product_quantity');

        // Delivery Cost 
        $cost = '150';

        // total cost 
        $total_cost = $total + $cost;

        // delete cart items
        // $payment = new MpesaSTKPUSHController();
        // $payment->STKPushApp($total_cost, Auth::user()->phone_number); 

        // Delivery date 
        $date = Carbon::now()->addDays(3);
        $now = Carbon::now();

        // create the record
        Shipping::create([
                'user_id'                   => Auth::user()->id,
                'buyer_id'                  => $buyer->id,
                'delivery_id'               => $request->delivery_id,
                'buyer_name'                => $fullname,
                'shipping_items'            => $total_no,
                'items_cost'                => $total,
                'shipping_location'         => $location,
                'delivery_cost'             => $cost,
                'shipping_total'            => $total_cost,
                'delivery_date'             => $date,
                'shipping_delivered'        => 0,
        ]);

        // get buyer 
        $shipping = Shipping::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->first();

        foreach ($items as $item) {
            // get the product 
            $product = Product::where('id', $item->product_id)->with('thumbnail')->first();

            // create the record
            ShippedProduct::create([
                'user_id'                   => Auth::user()->id,
                'admin_id'                  => $product->admin_id,
                'catergory_id'              => $product->catergory_id,
                'brand_id'                  => $product->brand_id,
                'buyer_id'                  => $buyer->id,
                'shipping_id'               => $shipping->id,
                'product_id'                => $product->id,
                'name'                      => $item->product_name,
                'thumbnail_path'            => $product->thumbnail['path'],
                'quantity'                  => $item->product_quantity,
                'price'                     => $item->product_price,
                'delivery_date'             => $date,
                'total_price'               => $item->product_total,
                'delivered'                 => 0
            ]);

            // update cart item
            CartItem::where('id', $item->id)->update([
                'shipping_id'              => $shipping->id,
                'in_cart'                  => 0,
                'in_transit'               => 1,
                'bought'                   => 0,
            ]);

            // update product item
            $new = $product->stock - $item->product_quantity;

            if ($new <= 0) {
                Product::where('id', $item->product_id)->update([
                    'stock'                   => $new,
                    'sold_out'                => '1',
                    'sold_out_date'           => $now,
                    'in_cart'                 => 0
                ]);
            } else {
                Product::where('id', $item->product_id)->update([
                    'stock'                   => $new,
                ]);
            }  
        }

        $shipping = Shipping::where('user_id', Auth::user()->id)
                            ->orderBy('created_at', 'desc')
                            ->with('buyer')
                            ->first();

        $products = ShippedProduct::where('shipping_id', $shipping->id)->get();

        $admins = User::where('admin', 1)->get();

        foreach ($admins as $admin) { 
            Notification::send($admin, new ShippingOrder($shipping));
        }

        return response()->json([null, 200, $shipping, $products]);
        // return response()->json([null, 500]);
    }

    public function deliverShipping(Shipping $shipping)
    {
        // get current time 
        $now = Carbon::now();

        // update shipping 
        Shipping::where('id', $shipping->id)
                ->update([
                    'shipping_delivered'        => 1,
                    'delivered_on'              => $now,
                ]); 
                
        // get cart items 
        $items = CartItem::where('shipping_id', $shipping->id)->get();

        // update shipped products 
        ShippedProduct::where('shipping_id', $shipping->id)
                ->update([
                    'delivered'        => 1,
                ]);
                
        // update each cart item 
        foreach ($items as $item) {
            // update cart item
            CartItem::where('id', $item->id)
                    ->update([
                        'in_cart'                  => 0,
                        'in_transit'               => 0,
                        'bought'                   => 1,
                    ]);

            // get product 
            $product = Product::where('id', $item->product_id)
                                ->first();

            // get new stock 
            $new = $product->stock - $item->product_stock;

            // update product
            Product::where('id', $item->product_id)
                    ->update([
                        'in_cart'        => 0,
                        'stock'          => $new
                    ]);
        }

        $user = User::where('id', $shipping->user_id)->first();

        Notification::send($user, new ShippingDelivery($shipping));

        return response()->json([null, 200]);
    }

    // API CALLS 
    public function getShippingNotification()
    {
        $shipping = Shipping::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->first();

        $products = ShippedProduct::where('shipping_id', $shipping->id)->get();

        return [$shipping, $products];
    }

    public function getShippings()
    {
        $all = Shipping::orderBy('created_at', 'desc')
                            ->with('buyer','delivery','shippedproducts','cartitems')
                            ->get();

        $shippings = Shipping::where('shipping_delivered', 0)
                            ->orderBy('created_at', 'desc')
                            ->with('buyer','delivery','shippedproducts')
                            ->get();

        $deliveredShippings = Shipping::where('shipping_delivered', 1)
                            ->orderBy('created_at', 'desc')
                            ->with('buyer','delivery','shippedproducts')
                            ->get();

        $today = Carbon::today();
        $todayShippings = Shipping::where('shipping_delivered', 0)
                            ->whereDate('delivery_date', $today)
                            ->orderBy('created_at', 'desc')
                            ->with('buyer','delivery','shippedproducts')
                            ->get();

        return [$all, $shippings, $deliveredShippings, $todayShippings];
    }

    public function getUserShippings(User $user)
    {
        $all = Shipping::where('user_id', $user->id)
                            ->orderBy('created_at', 'desc')
                            ->with('buyer','delivery','shippedproducts','cartitems')
                            ->get();

        $shippings = Shipping::where('user_id', $user->id)
                            ->where('shipping_delivered', 0)
                            ->orderBy('created_at', 'desc')
                            ->with('buyer','delivery','shippedproducts')
                            ->get();

        $deliveredShippings = Shipping::where('user_id', $user->id)
                            ->where('shipping_delivered', 1)
                            ->orderBy('created_at', 'desc')
                            ->with('buyer','delivery','shippedproducts')
                            ->get();

        return [$all, $shippings, $deliveredShippings];
    }
}
