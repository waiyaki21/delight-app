<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone_number'
    ];

    public function catergories() {
        return $this->hasMany('/App/Models/Catergory', 'admin_id');
    }

    public function products() {
        return $this->hasMany('/App/Models/Product', 'admin_id');
    }
}
