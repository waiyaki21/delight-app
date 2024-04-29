<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'buyer_id',
        'first_name',
        'second_name',
        'email',
        'phone_number',
        'city',
        'estate',
        'apartment'
    ];

    public function buyer() {
        return $this->belongsTo('/App/Models/Buyer', 'buyer_id');
    }
}
