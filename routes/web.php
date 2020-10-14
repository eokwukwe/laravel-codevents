<?php

use App\Http\Resources\Events\EventsResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('home');
});

Route::get('/{any}', 'HomeController@index')->where('any', '.*');

Route::get('/test/{id}', function (Request $request) {
    return new EventsResource(Event::find($request->id));
});
