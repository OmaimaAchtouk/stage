<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $primaryKey='id_file';
    protected $fillable = ['name_file', 'chemin', 'type_file', 'taille', 'user_id', 'id_note'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function note()
    {
        return $this->belongsTo(Note::class, 'id_note');
    }
}

