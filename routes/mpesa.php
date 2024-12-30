<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MpesaController;
use App\Http\Controllers\MPESAB2CController;
use App\Http\Controllers\MPESAC2BController;
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

// Grouping routes by MpesaController
Route::controller(MpesaController::class)->group(function () {
    Route::get('/mpesa', 'index');
    Route::get('/mpesa/stkpush', 'stkpush');
    Route::get('/mpesa/c2b', 'c2b');
    Route::get('/mpesa/b2c', 'b2c');
    Route::get('/mpesa/balance', 'accountBalance');
    Route::get('/mpesa/status', 'transactionStatus');
    Route::get('/mpesa/reversals', 'reversals');
    Route::post('/mpesa/account-balance', 'simulate_balance');
    Route::post('/mpesa/transaction-status', 'simulate_status');
    Route::post('/mpesa/reversals', 'simulate_reversals');
});

// Grouping routes by MpesaSTKPUSHController
Route::controller(MpesaSTKPUSHController::class)->group(function () {
    Route::post('/v1/mpesatest/stk/push', 'STKPush');
});

// Grouping routes by MPESAB2CController
Route::controller(MPESAB2CController::class)->group(function () {
    Route::post('/v1/b2c/simulate', 'simulate');
});

// Grouping routes by MPESAC2BController
Route::controller(MPESAC2BController::class)->group(function () {
    Route::post('/c2b/register-urls', 'registerURLS');
    Route::post('/c2b/simulate', 'simulate');
});