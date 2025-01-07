<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'catergory_id',
        'brand_id',
        'product_id',
        'name',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function catergory()
    {
        return $this->belongsTo(Catergory::class, 'catergory_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }
}
