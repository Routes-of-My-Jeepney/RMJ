<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Jeepney;
use Illuminate\Http\Request;

class JeepneyController extends Controller
{
    public function index()
    {
        return Jeepney::all();
    }

    public function show($id)
    {
        // Use the 'find' method on the Jeepney model to fetch the jeepney with this id
        $jeepney = Jeepney::find($id);

        // If a jeepney with this id cannot be found, return an error response
        if (!$jeepney) {
            return response()->json([
                'message' => 'Jeepney not found',
            ], 404);
        }

        // If a jeepney was found, return it as a JSON response
        return response()->json($jeepney, 200);
    }
}
