<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippedProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipped_products', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('admin_id');
            $table->string('catergory_id');
            $table->string('brand_id');
            $table->string('buyer_id');
            $table->string('shipping_id');
            $table->string('product_id');
            $table->string('name');
            $table->string('thumbnail_path');
            $table->string('price');
            $table->string('quantity');
            $table->string('delivery_date');
            $table->string('total_price');
            $table->boolean('delivered')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shipped_products');
    }
}
