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

            Schema::create('files', function (Blueprint $table) {
                $table->id('id_file');
                $table->string('name_file');
                $table->string('chemin');
                $table->string('type_file');
                $table->integer('taille');
                $table->unsignedBigInteger('user_id');
                $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
                $table->unsignedBigInteger('id_note')->nullable();
                $table->foreign('id_note')->references('id_note')->on('notes')->onDelete('cascade');
                $table->timestamps();
            });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
