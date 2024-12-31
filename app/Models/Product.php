<?php

namespace App\Models;

use App\Models\CartItem;
use App\Models\Catergory;
use App\Models\ProductImage;
use App\Models\ProductFeature;
use App\Models\ProductThumbnail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'admin_id',
        'catergory_id',
        'brand_id',
        'client_id',
        'name',
        'price',
        'stock',
        'sold_out',
        'sold_out_date',
        'in_cart',
        'thumbnail_name',
        'thumbnail_path',
    ];

    // protected $appends = [
    //     // 'is_favorited',
    // ];

    public function admin() {
        return $this->belongsTo('/App/Models/Admin', 'admin_id');
    }

    public function catergory() {
        return $this->belongsTo(Catergory::class, 'catergory_id');
    }

    public function brand() {
        return $this->belongsTo(Brand::class, 'brand_id');
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

    public function cartitems() {
        return $this->hasMany(CartItem::class, 'product_id');
    }

    public function descriptions() {
        return $this->hasMany(ProductDescription::class, 'product_id');
    }

    public function soldunits() {
        return $this->hasMany(ShippedProduct::class, 'product_id')->where('delivered', 1);
    }

    public function favorites() {
        return $this->hasMany(Favorite::class, 'product_id');
    }

    public function getIsFavoritedAttribute()
    {
        $user = auth()->user();  // Check if a user is authenticated

        if (!$user) {
            return false;  // If no user is logged in, return false
        }

        // If a user is logged in, check if the product is favorited by them
        return $this->favorites()->where('user_id', $user->id)->exists();
    }
}
