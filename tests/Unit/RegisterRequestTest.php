<?php

namespace Tests\Unit;

use Illuminate\Support\Facades\Validator;
use App\Http\Requests\RegisterRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class RegisterRequestTest extends TestCase
{

    public function setUp(): void
    {
        parent::setUp();
        // テスト用のデータをデータベースに追加する処理を書く
        User::create([
            'name' => 'existing_user',
            'email' => 'existing@example.com',
            'password' => bcrypt('password'),
        ]);
    }
    use RefreshDatabase;
    /**
     * カスタムリクエストのバリデーションテスト
     *
     * @param array 項目名の配列
     * @param array 値の配列
     * @param boolean 期待値(true:バリデーションOK、false:バリデーションNG)
     * @dataProvider dataUserRegistration
     */
    public function testUserRegistration(array $keys, array $values, bool $expect)
    {
        //入力項目の配列（$keys）と値の配列($values)から、連想配列を生成する
        $dataList = array_combine($keys, $values);

        $request = new RegisterRequest();
        //フォームリクエストで定義したルールを取得
        $rules = $request->rules();
        //Validatorファサードでバリデーターのインスタンスを取得、その際に入力情報とバリデーションルールを引数で渡す
        $validator = Validator::make($dataList, $rules);
        //入力情報がバリデーショルールを満たしている場合はtrue、満たしていな場合はfalseが返る
        $result = $validator->passes();
        //期待値($expect)と結果($result)を比較
        $this->assertEquals($expect, $result);
    }

    public function dataUserRegistration()
    {
        return [
            'OK' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'test@example.com', 'Cunshangliaoma_1030', 'Cunshangliaoma_1030'],
                true
            ],
            '名前必須エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                [null, 'test@example.com', 'Cunshangliaoma_1030', 'Cunshangliaoma_1030'],
                false
            ],
            '名前形式エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                [1, 'test@example.com', 'Cunshangliaoma_1030', 'Cunshangliaoma_1030'],
                false
            ],
            '名前最大文字数エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                [str_repeat('a', 56), 'test@example.com', 'Cunshangliaoma_1030', 'Cunshangliaoma_1030'],
                false
            ],
            'email必須エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', null, 'Cunshangliaoma_1030', 'Cunshangliaoma_1030'],
                false
            ],
            'email形式エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'test@example.', 'Cunshangliaoma_1030', 'Cunshangliaoma_1030'],
                false
            ],
            'password必須エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'test@example.com', '', ''],
                false
            ],
            'password最小文字数エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'test@example.com', 'Cun_10', 'Cun_10'],
                false
            ],
            'password一致エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'test@example.com', 'Cunshang@1030', 'Cunshang@103'],
                false
            ],
            'passwordにアルファベットが含まれていない' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'test@example', '909090_1030', '909090_1030'],
                false
            ],
            'password記号が含まれていない' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'test@example.com', 'Cunshangliaoma1030', 'Cunshangliaoma1030'],
                false
            ],
        ];
    }

    public function testEmailUniqueError()
    {
        $keys = ['name', 'email', 'password', 'password_confirmation'];
        $values = ['testuser', 'existing@example.com', 'Cunshangliaoma_1030', 'Cunshangliaoma_1030'];
        $this->testUserRegistration($keys, $values, false);
    }
}