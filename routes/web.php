<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\CurrentPasswordController;


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
    return view('welcome');
});

Auth::routes();
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::resource('users', UserController::class,['except' => ['destroy']]);
Route::delete('/delete-account/{user}', [UserController::class, 'deleteAccount'])->name('delete-account');
Route::post('/users/delete-profile-image', [UserController::class,'deleteProfileImage'])->name('delete-profile-image');
Route::get('/current-password/edit', [CurrentPasswordController::class, 'edit'])->name('password.edit');
Route::put('/current-password/update', [CurrentPasswordController::class, 'update'])->name('current_password.update');