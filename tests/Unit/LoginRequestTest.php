<?php

namespace Tests\Unit\Requests;

use Illuminate\Support\Facades\Validator;
use App\Http\Requests\LoginRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;
use App\Models\User;

class LoginRequestTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        // テスト用のデータをデータベースに追加する処理を書く
        User::create([
            'name' => 'existing_user',
            'email' => 'existing@example.com',
            'password' => bcrypt('Cunshangliaoma_1030'),
        ]);
    }

    /**
     * カスタムリクエストのバリデーションテスト
     *
     * @dataProvider dataUserLogin
     */
    public function testUserLogin(array $keys, array $values, bool $expect)
    {
        //入力項目の配列（$keys）と値の配列($values)から、連想配列を生成する
        $dataList = array_combine($keys, $values);
        $request = new LoginRequest();
        //フォームリクエストで定義したルールを取得
        $rules = $request->rules();
        //Validatorファサードでバリデーターのインスタンスを取得、その際に入力情報とバリデーションルールを引数で渡す
        $validator = Validator::make($dataList, $rules);
        //入力情報がバリデーショルールを満たしている場合はtrue、満たしていない場合はfalseが返る
        $result = $validator->passes();

        $user = User::where('email', $values[0])->first();
        $passwordMatches = $user && password_verify($values[1], $user->password);
        $emailMatches = $user && $user->email === $values[0];
        
        //期待値($expect)と結果($result)を比較
        $this->assertEquals($expect, $result && $passwordMatches && $emailMatches, "Failed with email: $values[0] and password: $values[1]");
        // $this->assertEquals($expect, !$result && $passwordRequested && $emailRequested && $passwordMatches && $emailMatches, "Failed with email: $values[0] and password: $values[1]");
    }

    public function dataUserLogin()
    {
        return [
            'OK' => [
                ['email', 'password'],
                ['existing@example.com', 'Cunshangliaoma_1030'],
                true
            ],
            'email必須エラー' => [
                ['email', 'password'],
                ['', 'Cunshangliaoma_1030'],
                false
            ],
            'email一致エラー' => [
                ['email', 'password'],
                ['tes@example.com', 'Cunshangliaoma_1030'],
                false
            ],
            'password必須エラー' => [
                ['email', 'password'],
                ['existing@example.com', ''],
                false
            ],
            'password一致エラー' => [
                ['email', 'password'],
                ['existing@example.com', 'Cunshangliaoma_103'],
                false
            ]
        ];
    }
}