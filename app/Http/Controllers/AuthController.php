<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        // validate request data
        $request->validate([
            'name' => 'required|string|max:55',
            'email' => 'required|email:filter,dns|unique:users,email',
            'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ],
            'password_confirmation' => 'required_with:password|same:password'
        ]);

        // create a new user
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->save();

        Auth::login($user);

        return response()->json([
            'message' => 'Successfully registered!',
            'user' => $user,
        ], 201);
    }


    // Sanctum based authentication
    public function login(LoginRequest $request)
    {
        // validate request data
        $credentials = $request->validate([
            'email' => 'required|email:filter,dns|',
            'password' => ['required'],
        ]);

        // attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            // generate a token for the user
            $request->session()->regenerate();
            $user = $request->user();

            return response()->json([
                'message' => 'Logged in successfully',
                'user' => $user,
            ], 200);
        }
        return response()->json([
            'message' => 'メールアドレスかパスワードが正しくありません。または登録されていません。',
        ], 403);
    }


    public function logout(Request $request)
    {
        // revoke the user's token


        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}