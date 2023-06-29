<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Jeepney;
use Illuminate\Http\Request;

class JeepneyController extends Controller
{
    public function index()
    {
        $jeepneys = Jeepney::with(['likedByUsers' => function ($query) {
            $query->withPivot('custom_name');
        }])->get()->append('isLiked');

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

    public function likeJeepney(Request $request, Jeepney $jeepney)
    {
        $user = $request->user();
        $user->likedJeepneys()->attach($jeepney);

        // Load likedByUsers relationship for the liked jeepney
        $jeepney->load(['likedByUsers' => function ($query) {
            $query->withPivot('custom_name');
        }]);

        // Append isLiked attribute
        $jeepney->append('isLiked');

        return response()->json([
            'message' => 'Jeepney added to favorites',
            'jeepney' => $jeepney,
        ], 200);
    }

    public function dislikeJeepney(Request $request, Jeepney $jeepney)
    {
        $user = $request->user();
        $user->likedJeepneys()->detach($jeepney);

        // Load likedByUsers relationship for the disliked jeepney
        $jeepney->load(['likedByUsers' => function ($query) {
            $query->withPivot('custom_name');
        }]);

        // Append isLiked attribute
        $jeepney->append('isLiked');

        return response()->json([
            'message' => 'Jeepney removed from favorites',
            'jeepney' => $jeepney,
        ], 200);
    }


    public function updateLikedJeepneyName(Request $request, $jeepneyId)
    {
        $user = $request->user();
        $jeepney = Jeepney::find($jeepneyId);
        $user->likedJeepneys()->updateExistingPivot($jeepneyId, ['custom_name' => $request->custom_name]);
        $jeepneys = Jeepney::with(['likedByUsers' => function ($query) {
            $query->withPivot('custom_name');
        }])->get()->append('isLiked');

        return response()->json([
            'message' => 'Jeepney name updated successfully',
            'jeepneys' => $jeepneys,
            'user_id' => $user->id,
        ], 200);
        dd($jeepneys);
    }
}
