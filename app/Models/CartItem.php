<?php

namespace App\Models;

use App\Models\ProductThumbnail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'product_id',
        'shipping_id',
        'thumbnail_path',
        'product_name',
        'product_price',
        'product_quantity',
        'product_stock',
        'product_total',
        'date_added',
        'in_cart',
        'in_transit',
        'bought',
    ];

    public function product() {
        return $this->belongsTo('App\Models\Product', 'product_id');
    }

    public function seller() {
        return $this->belongsTo('App\Models\Admin', 'seller_id');
    }

    public function thumbnail() {
        return $this->hasOne(ProductThumbnail::class, 'id');
    }

    public function shipping() {
        return $this->belongsTo(Shipping::class, 'shipping_id');
    }



    // public function buyer()
    // {
    //     return $this->belongsTo('App\Models\Buyer', 'buyer_id');
    // }
}
