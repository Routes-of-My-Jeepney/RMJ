<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
namespace App\Models\History;

class HistoryController extends Controller
{
 //public function index(){
    // ① ログインしているユーザーのIDを取得する
    // ② ①で取得したuser_idを持っているHistroyのデータを全て取得する
    
    //$userId = $modx->getLoginUserID('web');
    
    // ③ ②で取得してきたデータをJSON形式で返す
 //   return response()->json(["userId" => $userId]);
  //}

  // ④ createメソッドを作る
  
  public function create(Request $request){
    //入力欄のnameを使って取得

    $history = new History();

    $history->user_id = $request->input('user_id');
    $history->origin = $request->input('origin');
    $history->destination = $request->input('destination');

    $history->save();
  }
  //   if ($history->id == null) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // ⑤ deleteメソッドを作る

  // ⑥ allDeleteメソッドを作る

 }