import './bootstrap';
import React,{ useEffect } from 'react';
import axios from "axios";

// プロフィール画像のプレビュー表示
$('#profile-img-change-btn, #profile-img-set-btn').click(function (event) {
    event.preventDefault(); // フォームの送信をキャンセル
    $('#profile-img').click(); // input[type="file"]をクリックしてファイル選択ダイアログを開く
});

// ファイルが選択されたときに発生するchangeイベントをリッスンします。
$('#profile-img').on('change', function () {
    var input = $(this)[0];

    // ファイルが選択された場合、ファイルを読み込みます。
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        // 読み込みが完了したら、画像をプレビュー表示します。
        reader.onload = function (e) {
            $('#preview-profile-img').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
});


// プロフィール画像の削除
// プロフィール画像の削除ボタンがクリックされたときに、確認メッセージを表示する
// プロフィール画像の削除
// $('#delete-profile-image-btn').click(function (e) {
//     e.preventDefault();
//     if (confirm('本当にプロフィール画像を削除しますか？')) {
//         // AJAXリクエストを送信する
//         $.ajax({
//             url: "/users/delete-profile-image",
//             type: 'post',
//             data: {
//                 _token: $('meta[name="csrf-token"]').attr('content')
//             },
//             success: function () {
//                 // 画像を削除する
//                 $('#preview-profile-img').attr('src', "/user-icon.png");
//             },
//             error: function () {
//                 alert('プロフィール画像の削除に失敗しました。');
//             }
//         });
//     }
// });


