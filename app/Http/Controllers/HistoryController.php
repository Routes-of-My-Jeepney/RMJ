<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;
use Carbon\Carbon;

class HistoryController extends Controller
{
  public function index(Request $request){

    $user_id = $request->input('user_id');
    // var_dump(History::where($user_id)->get()->toArray());
    // dieS();

    //maked by Sir Kynt
    $x = History::where('user_id', $user_id)->orderBy("id", "desc")->get();

    if ($x) {
      $x = $x->toArray();
      foreach($x as $i => $y) {
        $x[$i]['created_at'] = Carbon::parse($y['created_at'])->diffForHumans();
        $x[$i]['diff_for_humans'] = Carbon::parse($y['created_at'])->diffForHumans();
        //formatLocalized('%Y年%m月%d日')
      }
    }




    //$histories = json_encode(History::where($user_id)->get(), JSON_UNESCAPED_UNICODE);
    
    
    // ③ ②で取得してきたデータをJSON形式で返す
    return response()->json($x);
  }

  
  public function create(Request $request){
    //入力欄のnameを使って取得

    $history = new History();

    $history->user_id = $request->input('user_id');
    $history->origin = $request->input('origin');
    $history->destination = $request->input('destination');
    //$history->id = $request->input('id');
    $history->save();

    return response()->json(['messege'=>'OKOKOKOKOKOKOKOKOKOKOKKOK']);
  }

  public function delete(Request $request){

      $id = $request->input('id');
      History::destroy($id);

      $history = History::find($id);

      if($history == ""){
        return response()->json(["message" => "履歴データの削除が成功しました"]);
      }else{
        return response()->json(["message"=>"履歴データの削除が失敗しました"]);
      }
  }

 }