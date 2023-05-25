<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jeepneys', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('originlat', 10, 8)->nullable();
            $table->decimal('originlng', 11, 8)->nullable();
            $table->decimal('destinationlat', 10, 8)->nullable();
            $table->decimal('destinationlng', 11, 8)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jeepneys');
    }
};
