<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('authorized/google/admin', [GoogleAuthController::class, 'redirectToGoogleAdmin'])
                ->name('Google Auth Admin');

Route::get('authorized/google', [GoogleAuthController::class, 'redirectToGoogle'])
                ->name('Google Auth');
    
Route::get('authorized/google/callback', [GoogleAuthController::class, 'handleGoogleCallback'])
                ->name('Google Auth Callback');

Route::get('authorized/google/callback/admin', [GoogleAuthController::class, 'handleGoogleCallbackAdmin'])
                ->name('Google Auth Callback Admin');