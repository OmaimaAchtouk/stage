<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tag_tasks', function (Blueprint $table) {
            $table->id('id_tag_tasks');
            $table->unsignedBigInteger('id');
            $table->foreign('id')->references('id')->on('tasks')->onDelete('cascade');
            $table->unsignedBigInteger('tag_id');
            $table->foreign('tag_id')->references('tag_id')->on('tags')->onDelete('cascade');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tag_tasks');
    }
};
