<?php

use Illuminate\Support\Facades\Route;


Route::apiResource('events', 'Events\EventsController')
    ->only('index');

Route::middleware('auth:api')->group(function () {
    Route::get('me', 'Users\CurrentUsersController');

    Route::get('users/{user}/profile', 'Users\SingleUserController');
    Route::get('users/{user}/events', 'Users\UserEventsController');

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
        ->except('index');

    Route::apiResource('events.comments', 'Comments\CommentsController')
        ->only('index', 'store', 'update', 'destroy');

    Route::post('users/{user}/relationships', 'Users\RelationshipsController');
});

Route::middleware('guest:api')->group(function () {

    Route::get('login/{provider}', 'Auth\SocialLoginController@redirect');
    Route::get('login/{provider}/callback', 'Auth\SocialLoginController@callback');

    Route::post('register', 'Auth\RegisterController@register');

    Route::post(
        'verification/verify/{user}',
        'Auth\VerificationController@verify'
    )->name('verification.verify');

    Route::post('verification/resend', 'Auth\VerificationController@resend');
    Route::post('login', 'Auth\LoginController@login');

    Route::post(
        'password/reset-link',
        'Auth\ForgotPasswordController@sendResetLinkEmail'
    );

    Route::post('password/reset', 'Auth\ResetPasswordController@reset');

    // Route::apiResource('events', 'Events\EventsController')
    //     ->only('index', 'show');
});
