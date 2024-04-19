<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = ['title_job', 'date_job', 'id_user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}