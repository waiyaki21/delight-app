<?php

namespace App\Models;

use App\Models\Catergory;
use App\Models\ProductImage;
use App\Models\ProductFeature;
use App\Models\ProductThumbnail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShippedProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'admin_id',
        'catergory_id',
        'brand_id',
        'buyer_id',
        'shipping_id',
        'product_id',
        'name',
        'thumbnail_path',
        'price',
        'quantity',
        'delivery_date',
        'total_price',
        'delivered',
    ];

    public function admin() {
        return $this->belongsTo('/App/Models/Admin', 'admin_id');
    }

    public function catergory() {
        return $this->belongsTo(Catergory::class, 'catergory_id');
    }

    public function brand() {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function shipping() {
        return $this->belongsTo(Shipping::class, 'shipping_id');
    }

    public function thumbnail() {
        return $this->hasOne(ProductThumbnail::class, 'product_id');
    }

    public function images() {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function features() {
        return $this->hasMany(ProductFeature::class, 'product_id');
    }
}
