<?php

use App\Http\Controllers\API\JeepneyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Jeepney;
use App\Models\User;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;

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



Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        return response()->json(Auth::user(), 200);
    }

    return response()->json(['error' => 'Invalid email or password.'], 401);
});

Route::post('/logout', function () {
    Auth::logout();

    return response()->json('Logged out successfully', 200);
});

Route::post('/register', [AuthController::class, 'register']);
