<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'header',
        'body'
    ];

    public function product()
    {
        return $this->belongsTo('App\Models\Product', 'product_id');
    } 
}
