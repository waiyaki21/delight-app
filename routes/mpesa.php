<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MpesaController;
use App\Http\Controllers\NewMpesaController;
use App\Http\Controllers\MpesaSTKPUSHController;

Route::controller(MpesaController::class)->group(function () {
    // get AccessToken
    Route::get('/generateAccessToken', 'generateAccessToken')->name('token')->middleware(['auth']);
    // get order
    Route::get('/mpesa_register', 'mpesaRegisterUrls')->name('C2B')->middleware(['auth']);

    // c2b test or deposit funds
    Route::get('/add/funds/{user}', 'customerMpesaSTKPush')->name('Deposit')->middleware(['auth']);
    Route::get('/mpesa_c2b_test', 'ClientToBusinessTest')->name('C2BT')->middleware(['auth']);

    // c2b test
    Route::get('/get_bal_test', 'checkBalance')->name('GBT')->middleware(['auth']);

    // c2b test
    Route::get('/testmpesa', 'index')->name('test')->middleware(['auth']);
});

Route::post('/v1/mpesatest/stk/push', [MpesaSTKPUSHController::class, 'STKPush']);