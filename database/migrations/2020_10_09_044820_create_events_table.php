<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->dateTime('date');
            $table->string('category');
            $table->text('description');
            $table->string('city');
            $table->decimal('city_lat', 8, 6);
            $table->decimal('city_lng', 9, 6);
            $table->text('venue');
            $table->decimal('venue_lat', 8, 6);
            $table->decimal('venue_lng', 9, 6);
            $table->timestamps();
            $table->foreignUuid('user_id')
                ->constrained()
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
