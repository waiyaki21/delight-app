<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('buyer_id');
            $table->string('delivery_id');
            $table->string('buyer_name');
            $table->string('shipping_items');
            $table->string('items_cost');
            $table->string('shipping_location');
            $table->string('delivery_cost');
            $table->string('shipping_total');
            $table->string('delivery_date');
            $table->string('delivered_on')->nullable();
            $table->boolean('shipping_delivered')->default(0);
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
        Schema::dropIfExists('shippings');
    }
}
