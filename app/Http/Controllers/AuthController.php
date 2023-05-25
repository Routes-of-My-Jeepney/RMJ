<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request) {
        // validate request data
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);
    
        // create a new user
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->save();
    
        return response()->json([
            'message' => 'Successfully registered!'
        ], 201);
    }
    
    public function login(Request $request) {
        // validate request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        // attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }
    
        $user = $request->user();
    
        // generate a token for the user
        $token = $user->createToken('TokenName')->accessToken;
    
        // return the token
        return response()->json([
            'token' => $token
        ]);
    }
    
    public function logout(Request $request) {
        // revoke the user's token
        $request->user()->token()->revoke();
    
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
