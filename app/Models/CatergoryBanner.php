<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatergoryBanner extends Model
{
    use HasFactory;

    protected $fillable = [
        'catergory_id',
        'name',
        'path'
    ];

    public function catergory()
    {
        return $this->belongsTo('App\Models\Catergory', 'catergory_id');
    }
}
