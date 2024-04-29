<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->string('buyer_id')->nullable();
            $table->string('seller_id');
            $table->string('product_id');
            $table->string('shipping_id')->nullable();
            $table->string('product_name');
            $table->string('product_quantity')->default(1);
            $table->string('product_price');
            $table->string('product_stock');
            $table->string('product_total');
            $table->string('thumbnail_path');
            $table->string('date_added');
            $table->boolean('in_cart')->default(0);
            $table->boolean('in_transit')->default(0);
            $table->boolean('bought')->default(0);
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
        Schema::dropIfExists('cart_items');
    }
}
