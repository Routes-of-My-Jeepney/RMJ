<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jeepney extends Model
{
    use HasFactory;
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'jeepney_user');
    }

        public function getIsLikedAttribute()
    {
        // Check if currently authenticated user is in the list of users that liked this jeepney.
        return $this->likedByUsers()->where('users.id', auth()->id())->exists();
    }

    protected $fillable = [
         'name', 
         'originlat', 
         'originlng', 
         'destinationlat', 
         'destinationlng',
    ];

    protected $appends = ['isLiked'];
}
