<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\CatergoryController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductFeatureController;
use App\Http\Controllers\ProductDescriptionController;
use App\Http\Controllers\ProductModelController;

// Routes requiring 'admin' middleware
// CatergoryController routes
Route::middleware(['admin'])->controller(CatergoryController::class)->group(function () {
    Route::post('/catergory/add', 'store')->name('Post Catergory');
    Route::put('/catergory/edit/{catergory}', 'update')->name('Edit Catergory');
    Route::delete('/catergory/delete/{catergory}', 'destroy')->name('Delete Catergory');
    Route::post('/catergory/banner/add/{catergory}', 'storeBanner')->name('Post Banner');
    Route::post('/catergory/banner/edit/{catergory}', 'storeBanner')->name('Update Banner');
    Route::delete('/catergory/media/delete/{catergory}', 'deleteMedia')->name('Delete Catergory Media');
});

// BrandController routes
Route::middleware(['admin'])->controller(BrandController::class)->group(function () {
    Route::post('/brand/add/{catergory}', 'store')->name('Post Brand');
    Route::put('/brand/edit/{brand}', 'update')->name('Edit brand');
    Route::delete('/brand/delete/{brand}', 'destroy')->name('Delete brand');
});

// ProductController routes
Route::middleware(['admin'])->controller(ProductController::class)->group(function () {
    Route::post('/product/add', 'store')->name('Post Product');
    Route::put('/product/edit/{product}', 'update')->name('Update Product');
    Route::post('/product/thumbnail/add/{product}', 'storeThumbnail')->name('Post Thumbnail Product');
    Route::post('/product/thumbnail/edit/{product}', 'storeThumbnail')->name('Update Thumbnail Product');
    Route::get('/product/thumbnail/delete/{product}', 'deleteThumbnail')->name('Delete Thumbnail Product');
    Route::post('/product/files/add/{product}', 'storeImages')->name('Post Files Product');
    Route::delete('/product/files/delete/{product}', 'deleteImages')->name('Delete Product Files');
    Route::delete('/product/delete/{product}', 'destroy')->name('Delete Product');
    Route::get('/stock/admin/{user}', 'productStock')->name('View Product Stock');
});

// ProductFeatureController routes
Route::middleware(['admin'])->controller(ProductFeatureController::class)->group(function () {
    Route::post('/product/features/add/{product}', 'store')->name('Post Product Features');
    Route::delete('/feature/delete/{productFeature}', 'destroy')->name('Delete Product Feature');
});

// ProductDescriptionController routes
Route::middleware(['admin'])->controller(ProductDescriptionController::class)->group(function () {
    Route::post('/product/description/add/{product}', 'store')->name('Post Product Description');
    Route::delete('/description/delete/{productDescription}', 'destroy')->name('Delete Product Description');
});

// ProductModelController routes
Route::middleware(['admin'])->controller(ProductModelController::class)->group(function () {
    Route::post('/product/model/add/{product}', 'store')->name('Post Product Model');
    Route::delete('/model/delete/{productModel}', 'destroy')->name('Delete Product Model');
});

// ProductImageController routes
Route::middleware(['admin'])->controller(ProductImageController::class)->group(function () {
    Route::delete('/image/delete/{productImage}', 'destroy')->name('Delete Product Image');
    Route::delete('/images/delete/{product}', 'deleteImages')->name('Delete All Product Image');
});


Route::middleware(['admin'])->controller(ShippingController::class)->group(function () {
    Route::get('/shipping/admin/{user}', 'index')->name('Orders Shipping Admin');
});