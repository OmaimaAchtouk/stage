<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['tag_value'];

    public function tasks()
    {
        return $this->morphedByMany(Task::class, 'tagable');
    }

    public function notes()
    {
        return $this->morphedByMany(Note::class, 'tagable');
    }

    public function events()
    {
        return $this->morphedByMany(Event::class, 'tagable');
    }
}
