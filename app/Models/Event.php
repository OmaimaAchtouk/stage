<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['title_event', 'date_debut', 'date_fin', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'tagable');
    }

   

//     public function scopeByDate($query, $date)
//     {
//     return $query->whereBetween('date_debut', [$date. ' 00:00:00', $date. ' 23:59:59']);
//    }

}




