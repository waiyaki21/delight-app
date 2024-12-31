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

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'admin',
        'google_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
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
}
