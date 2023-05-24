<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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


Route::apiResource('history', 'HistorySample');
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/routes',[RouteController::class, 'index']);
Route::get('/history',[HistoryController::class, 'index']);
Route::get('/get-user-id',[UserController::class, 'getUserId']);

// ① postメソッドで、Historyのcreateメソッドを呼び出す

Route::post('/history',[HistoryController::class, 'create']);

// ② post or delete メソッドで、Historyのdeleteメソッドを呼び出す

// ③ post or delete メソッドで、HistoryのallDeleteメソッドを呼びだす