<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    Route::post('logout', 'Auth\LoginController@logout');
    Route::post('settings/profile', 'Users\SettingsController@updateProfile');
    Route::put('settings/password', 'Users\SettingsController@updatePassword');

    Route::post(
        'events/{event}/attendees',
        'Events\EventAttendeesController@join'
    );

    Route::delete(
        'events/{event}/attendees',
        'Events\EventAttendeesController@leave'
    );

    Route::apiResource('events', 'Events\EventsController')
        ->except('index', 'show');

    Route::apiResource('events.comments', 'Comments\CommentsController')
        ->only('store', 'update', 'destroy');
});

Route::middleware('guest:api')->group(function () {
    Route::post('register', 'Auth\RegisterController@register');

    Route::post(
        'verification/verify/{user}',
        'Auth\VerificationController@verify'
    )->name('verification.verify');

    Route::post('verification/resend', 'Auth\VerificationController@resend');
    Route::post('login', 'Auth\LoginController@login');

    Route::post(
        'password/resetEmail',
        'Auth\ForgotPasswordController@sendResetLinkEmail'
    );

    Route::post('password/reset', 'Auth\ResetPasswordController@reset');

    Route::apiResource('events', 'Events\EventsController')
        ->only('index', 'show');
});
