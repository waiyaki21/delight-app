<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'catergory_id',
        'name',
    ];

    public function catergory() {
        return $this->belongsTo(Catergory::class, 'catergory_id');
    }

    public function products() {
        return $this->hasMany(Product::class, 'brand_id');
    }

    public function inStockProducts() {
        return $this->hasMany(Product::class, 'brand_id')->orderBy('created_at','desc')->with('brand', 'favorites')->where('sold_out', '0');
    }
}
