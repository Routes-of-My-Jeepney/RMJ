<?php

namespace Tests\Unit\Requests;

use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UpdateProfileRequestTest extends TestCase
{

    public function setUp(): void
    {
        parent::setUp();
        // テスト用のデータをデータベースに追加する処理を書く
        User::create([
            'name' => 'existing_user',
            'email' => 'existing@example.com',
            'password' => bcrypt('Cunshangliaoma_1030'),
            'profile_img' => 'tests/img/IMG_9118.jpg',
        ]);
    }
    use RefreshDatabase;
    /**
     * カスタムリクエストのバリデーションテスト
     *
     * @param array 項目名の配列
     * @param array 値の配列
     * @param boolean 期待値(true:バリデーションOK、false:バリデーションNG)
     * @dataProvider dataUserUpdate
     */
    // public function testUserUpdate(array $keys, array $values, bool $expect)
    // {
    //     //入力項目の配列（$keys）と値の配列($values)から、連想配列を生成する
    //     $dataList = array_combine($keys, $values);

    //     $request = new UpdateProfileRequest();
    //     //フォームリクエストで定義したルールを取得
    //     $rules = $request->rules();
    //     //Validatorファサードでバリデーターのインスタンスを取得、その際に入力情報とバリデーションルールを引数で渡す
    //     $validator = Validator::make($dataList, $rules);
    //     //入力情報がバリデーショルールを満たしている場合はtrue、満たしていな場合はfalseが返る
    //     $result = $validator->passes();
    //     //期待値($expect)と結果($result)を比較
    //     $this->assertEquals($expect, $result);
    // }
    public function testUserUpdate()
{
    $dataList = [
        'name' => null,  // 名前がnullの場合
        'email' => 'test@example.com',
        'profile_img' => '../tests/img/IMG_9118.jpg',
    ];

    $request = new UpdateProfileRequest();
    $rules = $request->rules();
    $validator = Validator::make($dataList, $rules);
    $result = $validator->passes();
    $this->assertFalse($result);  // バリデーションが失敗することを確認
}

    public function dataUserUpdate()
    {
        return [
            'OK' => [
                ['name', 'email', 'profile_img'],
                ['testuser', 'test@example.com', '../tests/img/IMG_9118.jpg'],
                true
            ],
            '名前必須エラー' => [
                ['name', 'email', 'profile_img'],
                [null, 'test@example.com', 'tests/img/../IMG_9118.jpg'],
                false
            ],
            '名前形式エラー' => [
                ['name', 'email', 'profile_img'],
                [1, 'test@example.com', 'tests/img/../IMG_9118.jpg'],
                false
            ],
            '名前最大文字数エラー' => [
                ['name', 'email', 'profile_img'],
                [str_repeat('a', 56), 'test@example.com', '../tests/img/IMG_9118.jpg'],
                false
            ],
            'email必須エラー' => [
                ['name', 'email', 'profile_img'],
                ['testuser', null, 'tests/img/../IMG_9118.jpg'],
                false
            ],
            'email形式エラー' => [
                ['name', 'email', 'profile_img'],
                ['testuser', 'test@example.', '../tests/img/IMG_9118.jpg'],
                false
            ],
            '画像入力形式エラー' => [
                ['name', 'email', 'profile_img'],
                ['testuser', 'test@example.com', 'abc'],
                false
            ],
            '画像拡張子エラー' => [
                ['name', 'email', 'profile_img'],
                ['testuser', 'test@example.com', '../tests/img/test.mov'],
                false
            ],
            '画像サイズエラー' => [
                ['name', 'email', 'profile_img'],
                ['testuser', 'test@example.com', '../tests/img/IMG_9118.jpg'],
                false
            ],
        ];
    }

    public function testEmailUniqueError()
    {
        $dataList = [
            'name' => 'testuser',
            'email' => 'existing@example.com',  // 既存のメールアドレスを指定
            'profile_img' => '../tests/img/IMG_9118.jpg',
        ];
    
        $request = new UpdateProfileRequest();
        $rules = $request->rules();
        $validator = Validator::make($dataList, $rules);
        $result = $validator->passes();
        $this->assertFalse($result);  // バリデーションが失敗することを確認
    }
}