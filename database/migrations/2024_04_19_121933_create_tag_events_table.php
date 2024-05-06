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
        Schema::create('tag_events', function (Blueprint $table) {
            $table->id('id_tag_events');
            $table->unsignedBigInteger('id_event');
            $table->foreign('id_event')->references('id_event')->on('events')->onDelete('cascade');
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
        Schema::dropIfExists('tag_events');
    }
};
