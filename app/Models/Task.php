<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title_task', 'task_done', 'id_job'];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'tagable');
    }
}
