<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\CatergoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(AdminController::class)->group(function () {
    Route::get('/updateBuyer', 'updateBuyer');
});

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('Delight ELectronics Home');
    
    // get User info
    Route::get('/getUser','getUser');

    // get User info
    Route::get('/getUser/delivery','getUserDelivery');
});

Route::controller(CatergoryController::class)->group(function () {
    // show Catergory
    Route::get('/catergory/{catergory}', 'show')->name('View Catergory');
    // show Catergory Latest
    Route::get('/latest', 'showLatest')->name('View Latest');
});

Route::controller(BrandController::class)->group(function () {
    // show Brand
    Route::get('/brand/{brand}', 'show')->name('View Brand');
});

Route::controller(ProductController::class)->group(function () {
    //show product
    Route::get('/product_show/{product}', 'index')->name('View Product');
});

Route::middleware(['auth'])->controller(CartItemController::class)->group(function () {
    // add to cart
    Route::post('/cart/add/{product}', 'cartAdd')->name('Add To Cart');

    // remove from cart
    Route::get('/cart/remove/{product}', 'cartRemove')->name('Remove From Cart');

    // get cart Items
    Route::get('/cart/{user}', 'index')->name('View Cart');

    // edit cart
    Route::put('/cart/edit/{cartItem}', 'update')->name('Update Cart Item');

    // get Cart info on Cart Page
    Route::get('/getCartShip','getCartShip');

    // get Shipping Order
    Route::get('/getShippingOrder','getShippingOrder');

    // get Shipping Order
    Route::get('/cartCheck/{product}','cartCheck');
});

Route::middleware(['auth'])->controller(CheckoutController::class)->group(function () {
    // get checkout
    Route::get('/checkout/{user}', 'index')->name('Checkout');
});

Route::middleware(['auth'])->controller(DeliveryController::class)->group(function () {
    // store 
    Route::post('/delivery/add', 'store')->name('Post Delivery');
    // edit 
    Route::put('/delivery/edit/{delivery}', 'update')->name('Edit Delivery');
    // delete 
    Route::get('/delivery/remove/{delivery}', 'destroy')->name('Delete Delivery');
});

Route::middleware(['auth'])->controller(ShippingController::class)->group(function () {
    Route::get('/shipping/{user}', 'index')->name('Orders Shipping');
    Route::post('/shipping/add', 'store')->name('Post Shipping');
    Route::put('/shipping/edit/{shipping}', 'update')->name('Edit Shipping');
    Route::delete('/shipping/delete/{shipping}', 'destroy')->name('Delete Shipping');
    Route::get('/shipping/deliver/{shipping}', 'deliverShipping')->name('Deliver Shipping');
    Route::get('/getShippingNotification', 'getShippingNotification');
});

Route::middleware(['auth'])->controller(NotificationController::class)->group(function () {
    // get Nofications
    Route::get('/api/allnotifications', 'getAllNofications');

    // mark as read
    Route::get('/notification/{id}', 'markAsRead')->name('Mark As Read');

    // mark cycle as read
    Route::get('/cycle_notification/{id}', 'markCycleAsRead')->name('Mark Cycle As Read');

    // mark reject as read
    Route::get('/reject_notification/{id}', 'markRejectAsRead')->name('Mark Reject As Read');

    // mark all as read
    Route::get('/notifications/{user}', 'markAllAsRead')->name('Mark All as Read');
});

Route::controller(SearchController::class)->group(function () {
    Route::get('/search/{name?}', 'search')->name('Search');
    // Route::get('searchTest/{name?}', function($name)
    // {
    //     return $name;
    // });
});

Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    // return what you want
    return redirect('/');
});

Route::controller(ImageUploadController::class)->group(function () {
    // get order
    Route::get('/upload-image', 'index');

    // c2b test or deposit funds
    Route::post('/upload-image', 'store')->name('image.store');

    Route::get('/resizeImage', 'resizeImage');

    Route::post('/resizeImagePost', 'resizeImagePost')->name('resizeImagePost');
});

Route::middleware(['auth'])->controller(FavoriteController::class)->group(function () {

    Route::get('/favorites/{id}', 'show')->name('View Favorites');

    Route::get('/favorites/switch/{id}', 'store')->name('favorites.store');

    Route::delete('/favorites/{id}', 'destroy')->name('favorites.delete');
});

require __DIR__.'/auth.php';
require __DIR__.'/googleauth.php';
require __DIR__.'/mpesa.php';
require __DIR__ .'/admin.php';