<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\CatergoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(CatergoryController::class)->middleware('api')->group(function () {
    // get Catergories info
    Route::get('/getCatergories','getCatergories');

    // get Catergories with Products info
    Route::get('/getCatergoriesMain','getCatergoriesMain');

    // get Catergories with Products info
    Route::get('/catergory/info/{catergory}', 'getCatergoryInfo');

    // store catergory banner
    Route::post('/catergory/banner/add/{catergory}', 'storeBanner')->name('Post Banner Catergory')->middleware(['admin']);
    
    // update catergory banner
    Route::post('/catergory/banner/edit/{catergory}', 'updateBanner')->name('Update Banner Catergory')->middleware(['admin']);

    // get brands info
    Route::get('/getBrands/{catergory}','getBrands');

    // get Catergory
    Route::get('/getCatergory/{catergory}','getCatergory');
});

Route::controller(BrandController::class)->middleware('api')->group(function () {
    // get Brand
    Route::get('/getBrand/{brand}','getBrand');
});

Route::controller(ProductController::class)->middleware('api')->group(function () {
    // get all products
    Route::get('/getProducts','getProducts');

    // get all products catergory
    Route::get('/getProducts/catergory/{catergory}', 'getCatergoryProducts');

    // get all products brand
    Route::get('/getProducts/brand/{brand}', 'getBrandProducts');

    // get all products latest
    Route::get('/getProducts/latest/{id}', 'getLatestProducts');

    // get all products favorites
    Route::get('/getProducts/favorites/{id}', 'getFavoritesProducts');

    // get a product
    Route::get('/getProduct/{product}','getProduct');
    
    // get new product
    Route::get('/getNewProduct','getNewProduct');

    // get latest product
    Route::get('/getLatestProducts','getLatestProduct');

    // get stock
    Route::get('/getStock/Admin','getStock');

    //get products by page
    Route::get('/all/getProducts/products', 'getAllProductsPage');
});

Route::controller(CartItemController::class)->middleware('api')->group(function () {
    // get Cart nav
    Route::get('/getCartNav/{user}','getCartNav');

    // get Cart info
    Route::get('/getCart/{user}','getCart');

    // get Cart info on Cart Page
    Route::get('/getCartIndex/{user}','getCartIndex');
});

Route::controller(ShippingController::class)->middleware('api')->group(function () {
    // get Cart info
    Route::get('/getShippings','getShippings');

    // get User Cart info
    Route::get('/getShippings/{user}','getUserShippings');
});

Route::controller(SearchController::class)->middleware('api')->group(function () {
    // get products
    Route::get('/search/getProducts','getProducts');

    // get catergory
    Route::get('/search/getCatergory/{catergory}','getCatergory');

    // get brand
    Route::get('/search/getBrand/{brand}','getBrand');

    //get products by page
    Route::get('/search/getProducts/products', 'getProductsPage');

    // search 
    Route::get('/search/{name?}', 'searchProducts');

    // search 
    Route::get('/search/{name?}/{min?}/{max?}', 'searchProductsPrice');

    // search price asc
    Route::get('/search/{name?}/{min?}/{max?}/asc', 'searchProductsPriceAsc');

    // search latest
    Route::get('/search/{name?}/{min?}/{max?}/newest', 'searchProductsPriceNewest');
});

// validation callback
Route::post('validate', function(Request $request){
    \Log::info($request->getContent());
});

// confirmation callback
Route::post('confirm', function(Request $request){
    \Log::info($request->getContent());
});

Route::get('call', function(Request $request){
    \Log::info($request->getContent());
});

// Mpesa STK Push Callback Route
Route::post('v1/confirm', [MpesaSTKPUSHController::class, 'STKConfirm'])->name('mpesa.confirm');
