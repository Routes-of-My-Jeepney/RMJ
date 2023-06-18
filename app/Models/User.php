<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    const DEFAULT_PROFILE_IMAGE = 'user-icon.png';
    use HasApiTokens, HasFactory, Notifiable;

    public function likedJeepneys()
    {
        return $this->belongsToMany(Jeepney::class, 'jeepney_user');
    }

    public function isLikedJeepneys()
    {
        return $this->belongsToMany(Jeepney::class, 'jeepney_user')->wherePivot('user_id', $this->id)->exists();
    }

    public function histories()
    {
        return $this->hasMany(History::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'profile_img',
        'email',
        'password',

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
}
