<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class CurrentPasswordController extends Controller
{
    /**
     * Show the form for editing the current password.
     *
     * @return \Illuminate\Http\Response
     */


    public function edit()
    {
        $user = Auth::user();
        return response()->view('auth.passwords.current-password', compact('user'));
    }

    /**
     * Update the user's current password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'current-password' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!Hash::check($value, Auth::user()->password)) {
                        $fail(__('The :attribute is incorrect.'));
                    }
                }
            ],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        Auth::user()->update([
            'password' => Hash::make($request->input('password')),
        ]);
        return redirect()->route('home')->with('status', __('Your password has been updated.'));
    }
}
?>