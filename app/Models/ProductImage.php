<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'path'
    ];

    public function product()
    {
        return $this->belongsTo('App\Models\Product', 'product_id');
    } 
}
