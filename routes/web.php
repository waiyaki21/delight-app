<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\MpesaController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\CatergoryController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductFeatureController;
use App\Http\Controllers\ProductDescriptionController;

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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

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
    // store 
    Route::post('/catergory/add', 'store')->name('Post Catergory')->middleware(['admin']);
    // edit 
    Route::put('/catergory/edit/{catergory}', 'update')->name('Edit Catergory')->middleware(['admin']);
    // delete 
    Route::delete('/catergory/delete/{catergory}', 'destroy')->name('Delete Catergory')->middleware(['admin']);
    // store catergory banner
    Route::post('/catergory/banner/add/{catergory}', 'storeBanner')->name('Post Banner')->middleware(['admin']);
    // update catergory banner
    Route::post('/catergory/banner/edit/{catergory}', 'storeBanner')->name('Update Banner')->middleware(['admin']);
    // show Catergory
    Route::get('/catergory/{catergory}', 'show')->name('View Catergory');
    // show Catergory Latest
    Route::get('/latest', 'showLatest')->name('View Latest');
});

Route::controller(BrandController::class)->group(function () {
    // store brand
    Route::post('/brand/add/{catergory}', 'store')->name('Post Brand')->middleware(['admin']);
    // edit brand
    Route::put('/brand/edit/{brand}', 'update')->name('Edit brand')->middleware(['admin']);
    // delete brand
    Route::delete('/brand/delete/{brand}', 'destroy')->name('Delete brand')->middleware(['admin']);
    // show Brand
    Route::get('/brand/{brand}', 'show')->name('View Brand');
});

Route::controller(ProductController::class)->group(function () {

    // store product 
    Route::post('/product/add', 'store')->name('Post Product')->middleware(['admin']);

    // update product 
    Route::put('/product/edit/{product}', 'update')->name('Update Product')->middleware(['admin']);

    // store product thumbnail
    Route::post('/product/thumbnail/add/{product}', 'storeThumbnail')->name('Post Thumbnail Product')->middleware(['admin']);

    // update product thumbnail
    Route::post('/product/thumbnail/edit/{product}', 'storeThumbnail')->name('Update Thumbnail Product')->middleware(['admin']);

    Route::get('/product/thumbnail/delete/{product}', 'deleteThumbnail')->name('Delete Thumbnail Product')->middleware(['admin']);

    // store product pictures
    Route::post('/product/files/add/{product}', 'storeImages')->name('Post Files Product')->middleware(['admin']);

    // delete product pictures
    Route::delete('/product/files/delete/{product}', 'deleteImages')->name('Delete Product Files')->middleware(['admin']);

    //show product
    Route::get('/product_show/{product}', 'index')->name('View Product');

    // delete product
    Route::delete('/product/delete/{product}', 'destroy')->name('Delete Product')->middleware(['admin']);

    //show product stock
    Route::get('/stock/admin/{user}', 'productStock')->name('View Product Stock')->middleware(['admin']);
});

Route::controller(ProductFeatureController::class)->group(function () {
    // store product features
    Route::post('/product/features/add/{product}', 'store')->name('Post Product Features')->middleware(['admin']);

    // delete product feature
    Route::delete('/feature/delete/{productFeature}', 'destroy')->name('Delete Product Feature')->middleware(['admin']);
});

Route::controller(ProductDescriptionController::class)->group(function () {
    // store product Description
    Route::post('/product/description/add/{product}', 'store')->name('Post Product Description')->middleware(['admin']);

    // delete product Description
    Route::delete('/description/delete/{productDescription}', 'destroy')->name('Delete Product Description')->middleware(['admin']);

    // delete product Description
    Route::delete('/description/delete/{productDescription}', 'destroy')->name('Delete Product description')->middleware(['admin']);
});

Route::controller(ProductImageController::class)->group(function () {
    // delete product image
    Route::delete('/image/delete/{productImage}', 'destroy')->name('Delete Product Image')->middleware(['admin']);

    // delete all product images
    Route::delete('/images/delete/{product}', 'deleteImages')->name('Delete All Product Image')->middleware(['admin']);
});

Route::controller(CartItemController::class)->group(function () {
    // add to cart
    Route::post('/cart/add/{product}', 'cartAdd')->name('Add To Cart')->middleware(['auth']);

    // remove from cart
    Route::get('/cart/remove/{product}', 'cartRemove')->name('Remove From Cart')->middleware(['auth']);

    // get cart Items
    Route::get('/cart/{user}', 'index')->name('View Cart')->middleware(['auth']);

    // edit cart
    Route::put('/cart/edit/{cartItem}', 'update')->name('Update Cart Item')->middleware(['auth']);

    // get Cart info on Cart Page
    Route::get('/getCartShip','getCartShip')->middleware(['auth']);

    // get Shipping Order
    Route::get('/getShippingOrder','getShippingOrder')->middleware(['auth']);

    // get Shipping Order
    Route::get('/cartCheck/{product}','cartCheck')->middleware(['auth']);
});

Route::controller(CheckoutController::class)->group(function () {
    // get checkout
    Route::get('/checkout/{user}', 'index')->name('Checkout')->middleware(['auth']);
});

Route::controller(DeliveryController::class)->group(function () {
    // store 
    Route::post('/delivery/add', 'store')->name('Post Delivery')->middleware(['auth']);
    // edit 
    Route::put('/delivery/edit/{delivery}', 'update')->name('Edit Delivery')->middleware(['auth']);
    // delete 
    Route::get('/delivery/remove/{delivery}', 'destroy')->name('Delete Delivery')->middleware(['auth']);
});

Route::controller(ShippingController::class)->group(function () {
    // index route
    Route::get('/shipping/{user}', 'index')->name('Orders Shipping')->middleware(['auth']);
    // index 
    Route::get('/shipping/admin/{user}', 'index')->name('Orders Shipping Admin')->middleware(['admin']);
    // store 
    Route::post('/shipping/add', 'store')->name('Post Shipping')->middleware(['auth']);
    // edit 
    Route::put('/shipping/edit/{shipping}', 'update')->name('Edit Shipping')->middleware(['auth']);
    // delete 
    Route::delete('/shipping/delete/{shipping}', 'destroy')->name('Delete Shipping')->middleware(['auth']);
    // deliver 
    Route::get('/shipping/deliver/{shipping}', 'deliverShipping')->name('Deliver Shipping')->middleware(['auth']);
    // get Shipping Order
    Route::get('/getShippingNotification','getShippingNotification')->middleware(['auth']);
});

Route::controller(SearchController::class)->group(function () {
    Route::get('/search/{name?}', 'search')->name('Search');
    // Route::get('searchTest/{name?}', function($name)
    // {
    //     return $name;
    // });
});

Route::controller(NotificationController::class)->group(function () {
    // get Nofications
    Route::get('/api/allnotifications', 'getAllNofications')->middleware(['auth']);
    
    // mark as read
    Route::get('/notification/{id}', 'markAsRead')->name('Mark As Read')->middleware(['auth']);

    // mark cycle as read
    Route::get('/cycle_notification/{id}', 'markCycleAsRead')->name('Mark Cycle As Read')->middleware(['auth']);

    // mark reject as read
    Route::get('/reject_notification/{id}', 'markRejectAsRead')->name('Mark Reject As Read')->middleware(['auth']);

    // mark all as read
    Route::get('/notifications/{user}', 'markAllAsRead')->name('Mark All as Read')->middleware(['auth']);
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

require __DIR__.'/auth.php';
require __DIR__.'/googleauth.php';
require __DIR__.'/mpesa.php';