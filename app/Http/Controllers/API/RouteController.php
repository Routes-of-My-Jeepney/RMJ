<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use APP\Models\Route;

class RouteController extends Controller
{
    public function index()
    {
        return Route::all();
    }
}
