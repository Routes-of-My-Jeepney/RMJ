<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Carbon\Carbon;

class History extends Model
{
    use HasFactory;
    public function setDateAttribute( $value ) {
        $this->attributes['created_at'] = Carbon::createFromFormat('m/d/Y', $this->created_at)->diffForHumans();
      }

      public function user()
      {
          return $this->belongsTo(User::class);
      }

    // public function getData (){
    //   return $this->orderBy('id', 'desc')->get();
    // }

    
}
