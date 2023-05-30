<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Jeepney;
use Illuminate\Http\Request;

class JeepneyController extends Controller
{
    public function index()
    {
        $jeepneys = Jeepney::with('likedByUsers')->get()->append('isLiked');

        return response()->json($jeepneys);
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

    public function likeJeepney(Request $request, Jeepney $jeepneyId)
    {
        $user = $request->user();
        $jeepney = Jeepney::find($jeepneyId);
        $user->likedJeepneys()->attach($jeepney);
        $jeepneys = Jeepney::with('likedByUsers')->get()->append('isLiked');

        return response()->json([
            'message' => 'Jeepney added to favorites',
            'jeepneys' => $jeepneys,
        ], 200);
    }
    
    public function dislikeJeepney(Request $request, Jeepney $jeepneyId)
    {
        $user = $request->user();
        $jeepney = Jeepney::find($jeepneyId);
        $user->likedJeepneys()->detach($jeepney);
        $jeepneys = Jeepney::with('likedByUsers')->get()->append('isLiked');

        return response()->json([
            'message' => 'Jeepney removed from favorites',
            'jeepneys' => $jeepneys,
        ], 200);
    }

    public function showLikedJeepneys(Request $request)
{
    $user = $request->user(); // Get the currently authenticated user

    $likedJeepneys = $user->likedJeepneys; // Get the liked jeepneys

    // Return a view or JSON response with the liked jeepneys...
    return response()->json([
        'message' => 'Liked jeepneys fetched successfully',
        'data' => $likedJeepneys,
    ], 200);
}
}
