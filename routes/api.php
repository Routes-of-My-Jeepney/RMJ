<?php

use App\Http\Controllers\API\JeepneyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Jeepney;
use App\Models\User;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HistoryController;


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


Route::get('/sanctum/csrf-cookie', function (Request $request) {
    return response('CSRF cookie set')->withCookie(cookie('XSRF-TOKEN', $request->session()->token()));
});
Route::apiResource('history', 'HistorySample');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/jeepneys', [JeepneyController::class, 'index']);
Route::get('/jeepneys/{id}', [JeepneyController::class, 'show']);
Route::post('/favorites', function (Request $request) {
    $user = User::find($request->user_id);
    $jeepney = Jeepney::find($request->jeepney_id);

    $user->jeepneys()->attach($jeepney);

    return response()->json(['message' => 'Jeepney added to favorites']);
});


Route::delete('/favorites/{user}/{jeepney}', function ($userId, $jeepneyId) {
    $user = User::find($userId);
    $jeepney = Jeepney::find($jeepneyId);

    $user->jeepneys()->detach($jeepney);

    return response()->json(['message' => 'Jeepney removed from favorites']);
});

Route::post('/logout', function () {
    Auth::logout();

    return response()->json('Logged out successfully', 200);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/routes',[RouteController::class, 'index']);
Route::get('/history',[HistoryController::class, 'index']);
Route::get('/get-user-id',[UserController::class, 'getUserId']);

// ① postメソッドで、Historyのcreateメソッドを呼び出す

Route::post('/history',[HistoryController::class, 'create']);

// ② post or delete メソッドで、Historyのdeleteメソッドを呼び出す

// ③ post or delete メソッドで、HistoryのallDeleteメソッドを呼びだす

