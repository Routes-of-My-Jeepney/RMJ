<?php

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Jeepney;

class FavoriteController extends Controller
{
    public function store(Request $request, User $user)
    {
        $jeepney = Jeepney::find($request->jeepney_id);
        $user->favorites()->attach($jeepney);

        return response()->json(['message' => 'Jeepney favorited.']);
    }

    public function destroy(User $user, $jeepneyId)
    {
        $jeepney = Jeepney::find($jeepneyId);
        $user->favorites()->detach($jeepney);

        return response()->json(['message' => 'jeepney unfavorited.']);
    }
}