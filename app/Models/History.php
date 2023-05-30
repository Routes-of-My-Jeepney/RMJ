<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class History extends Model
{
    use HasFactory;
    public function setDateAttribute( $value ) {
        $this->attributes['created_at'] = Carbon::createFromFormat('m/d/Y', $this->created_at)->diffForHumans();
      }
    // public function getDateDiffForHumans(){
    //     return Carbon::createFromFormat('m/d/Y', $this->created_at)->diffForHumans();
    // }
}
