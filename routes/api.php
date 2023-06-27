<?php

use App\Http\Controllers\API\JeepneyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Jeepney;
use App\Models\User;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\UserController;


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


// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', fn(Request $request) => $request->user());

    Route::post('/jeepney/{jeepney}/like', [JeepneyController::class, 'likeJeepney']);
    Route::delete('/jeepney/{jeepney}/dislike', [JeepneyController::class, 'dislikeJeepney']);
    Route::get('/user/liked-jeepneys', [JeepneyController::class, 'showLikedJeepneys']);
    Route::post('/jeepney/{jeepneyId}/update', [JeepneyController::class, 'updateLikedJeepneyName']);
    Route::delete('/user/{user}', [UserController::class, 'delete']);
    Route::post('/user/logout', [AuthController::class, 'logout']);
    Route::put('/user/{user}', [UserController::class, 'update']);


    Route::get('/user/history',[HistoryController::class, 'index']);
    Route::post('/history',[HistoryController::class, 'create']);
    Route::delete('/history', [HistoryController::class, 'delete']);
});

// Unauthenticated routes
Route::get('/sanctum/csrf-cookie', fn(Request $request) => response('CSRF cookie set')->withCookie(cookie('XSRF-TOKEN', $request->session()->token())));

Route::get('/jeepneys', [JeepneyController::class, 'index']);
Route::get('/jeepneys/{id}', [JeepneyController::class, 'show']);
Route::get('/routes',[RouteController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/reset-password', [UserController::class, 'resetPassword']);