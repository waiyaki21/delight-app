<?php

namespace App\Models;

use App\Models\CartItem;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'admin',
        'google_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function deliveries() {
        return $this->hasMany('/App/Models/Delivery', 'user_id');
    }

    public function shippingNotifications()
    {
        return $this->hasMany('App\Models\Notification', 'notifiable_id')->where('type', 'App\\Notifications\\ShippingOrder')->where('read_at', null);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'buyer_id')->where([
            ['in_cart', 1],
            ['in_transit', 0],
            ['bought', 0],
        ]);
    }

    public function transitCartItems()
    {
        return $this->hasMany(CartItem::class, 'buyer_id')->where([
            ['in_cart', 1],
            ['in_transit', 1],
            ['bought', 0],
        ]);
    }

    public function allCartItems()
    {
        return $this->hasMany(CartItem::class, 'buyer_id');
    }
}
