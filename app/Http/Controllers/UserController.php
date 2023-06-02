<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function likedJeepneys(Request $request)
{
    $jeepneys = $request->user()->likedJeepneys();

    return response()->json($jeepneys, 200);
}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();
        $profileImage = $user->profile_img ? asset($user->profile_img) : asset('images/' . User::DEFAULT_PROFILE_IMAGE);
        return response()->view('users.show', compact('user', 'profileImage'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request)
{
    // Validate the request...
    $user=$request->user();
    dd($user);
    $request->validate([
        'email' => 'required|email|unique:users,email,'.$user->id,
        'profile_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Handle profile image upload...
    if ($request->hasFile('profile_image')) {
        $image = $request->file('profile_image');
        $name = time().'.'.$image->getClientOriginalExtension();
        $destinationPath = public_path('/images');
        $image->move($destinationPath, $name);
        $user->profile_image = $name;
    }

    // Update email...
    $user->email = $request->email;

    // Save the changes...
    $user->save();

    return response()->json([
        'message' => 'Successfully updated user!',
        'user' => $user,
    ], 200);
}
    // public function update(Request $request, $id)
    // {
    //     // ログイン中のユーザの情報を取得し、$userに代入
    //     $user = Auth::user();

    //     // リクエストデータを取得し、$updateUserに代入
    //     $updateUser = $request->all();

    //     // プロフィール画像の変更があった場合
    //     if ($request->hasFile('profile-img')) {
    //         // storeメソッドで一意のファイル名を自動生成しつつstorage/app/public/profilesに保存し、そのファイル名（ファイルパス）を$profileImagePathとして生成
    //         $profileImagePath = $request->file('profile-img')->store('public/profiles');
    //         // $updateUserのprofile_imgカラムに$profileImagePath（ファイルパス）を保存
    //         $updateUser['profile_img'] = $profileImagePath;
    //         // プロフィール画像を更新した場合は、$user 変数を更新する
    //         $user->profile_img = $profileImagePath;
    //     }
    //     // // プロフィール画像が削除される場合
    //     elseif ($request->input('delete-profile-img')) {
    //         // プロフィール画像の削除がリクエストされた場合
    //         $this->deleteProfileImage($user); // プロフィール画像を削除するメソッドを呼び出す
    //         // プロフィール画像を削除した場合は、$user 変数を更新する
    //         $user->profile_img = null;
    //     }
    //     // // ユーザー情報を更新
    //     $user->fill($updateUser)->save();
    //     return redirect()->route('home', Auth::user())->with('status', __('Mypage has been updated.'));

    // }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(User $user)
    {
        $user->delete();
        return response()->json(null,204);
    }
    public function deleteProfileImage()
    {
        $user = Auth::user();
        if ($user->profile_img !== null) {
            Storage::delete('public/profiles' . $user->profile_img); // ファイルをストレージから削除
            $user->profile_img = null; // プロフィール画像のパスをnullに更新
            $user->save(); // ユーザーモデルを保存
            return redirect()->route('users.show',compact('user'))->with('success', 'プロフィール画像を削除しました。');
        } else {
            return redirect()->back()->with('error', 'プロフィール画像が存在しません。');
        }

    }

    public function getUserId()
    {
        //$user= Auth::user();
        //$userId= $user->id;

        $user_id = Auth::id();
        return response()->json(['user_id' => $user_id]);
    }

}