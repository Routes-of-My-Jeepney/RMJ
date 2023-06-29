<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ],
            'password_confirmation' => 'required_with:password|same:password'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'ユーザー名を入力してください',
            'name.string' => '正しい形式で入力してください',
            'name.max' => '文字数をオーバーしています。',
            'email.required' => 'メールアドレスを入力してください。',
            'email.email' => '正しい形式でメールアドレスを入力してください',
            'email.unique' => 'このメールアドレスはすでに登録されています',
            'password.required' => 'パスワードを入力してください',
            'password.min' => 'パスワードは8文字以上で入力してください。',
            'password.letters' => 'パスワードにアルファベットを含めてください。',
            'password.symbols' => 'パスワードに記号を含めてください。',
            'password.required_with' => '確認用パスワードを入力してください。',
            'password.same' => 'パスワードが一致しません。',
        ];
    }

    /**
     * [override] バリデーション失敗時ハンドリング
     *
     * @param Validator $validator
     * @throw HttpResponseException
     * @see FormRequest::failedValidation()
     */
    // protected function failedValidation(Validator $validator)
    // {
    //     $response['status'] = 422;
    //     $response['statusText'] = 'Failed validation.';
    //     $response['errors'] = $validator->errors();
    //     throw new HttpResponseException(
    //         response()->json($response, 200)
    //     );
    // }
}