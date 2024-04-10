<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MyTestController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function() {
    return redirect('/');
})->name('login');

Route::middleware('auth:api')->group(function () {
    Route::get('/test', [MyTestController::class, 'show']);
  });
  