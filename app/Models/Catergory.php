<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Catergory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'admin_id',
        'name',
        'banner_path',
        'banner_name',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function banner()
    {
        return $this->hasOne(CatergoryBanner::class, 'catergory_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'catergory_id');
    }

    public function models()
    {
        return $this->hasMany(ProductModel::class, 'catergory_id');
    }

    public function inStockProducts()
    {
        return $this->hasMany(Product::class, 'catergory_id')->orderBy('created_at', 'desc')->where('sold_out', '0');
    }

    public function brands()
    {
        return $this->hasMany(Brand::class, 'catergory_id');
    }
}
