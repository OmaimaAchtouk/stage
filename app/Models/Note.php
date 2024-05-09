<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['title_note', 'description', 'user_id'];

    // Specify the primary key for the model.
    protected $primaryKey = 'id_note';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function files()
    {
        return $this->hasMany(File::class, 'id_note');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'tagable');
    }
}
