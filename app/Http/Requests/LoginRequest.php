<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
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
            'email' => 'required|email:filter,dns|',
            'password' => [
                'required'
            ]
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'メールアドレスを入力してください。',
            'email.email' => '正しい形式でメールアドレスを入力してください',
            'password.required' => 'パスワードを入力してください',
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