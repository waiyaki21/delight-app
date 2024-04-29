<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'buyer_id',
        'delivery_id',
        'buyer_name',
        'shipping_items',
        'items_cost',
        'shipping_location',
        'delivery_cost',
        'shipping_total',
        'delivery_date',
        'shipping_delivered',
        'delivered_on'
    ];

    public function buyer() {
        return $this->belongsTo(Buyer::class, 'buyer_id');
    }

    public function delivery() {
        return $this->belongsTo(Delivery::class, 'delivery_id');
    }

    public function shippedproducts() {
        return $this->hasMany(ShippedProduct::class, 'shipping_id');
    }

    public function cartitems() {
        return $this->hasMany(CartItem::class, 'shipping_id');
    }
}
