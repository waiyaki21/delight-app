<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('admin_id');
            $table->string('catergory_id');
            $table->string('brand_id');
            $table->string('client_id')->nullable();
            $table->string('name');
            $table->string('price');
            $table->string('stock');
            $table->boolean('in_cart')->default(0);
            $table->string('sold_out')->default('0');
            $table->string('sold_out_date')->nullable();
            $table->string('thumbnail_name')->nullable();
            $table->string('thumbnail_path')->nullable();
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
        Schema::dropIfExists('products');
    }
}
