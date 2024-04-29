<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone_number'
    ];

    public function deliveries() {
        return $this->hasMany('/App/Models/Delivery', 'buyer_id');
    }

    // public function orders() {
    //     return $this->hasMany('/App/Models/Order', 'buyer_id');
    // }
}
