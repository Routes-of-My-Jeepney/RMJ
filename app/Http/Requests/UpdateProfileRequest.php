<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
// use Illuminate\Support\Facades\Auth;


class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // 認証が必要な場合は適切な認証処理を行ってください
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // $user = Auth::user();
        return [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email,',
            'profile_img' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => '名前を入力してください。',
            'name.string' => '正しい形式で入力してください。',
            'name.max' => '文字数がオーバーしています。',
            'email.required' => 'メールアドレスを入力してください。',
            'email.email' => '正しい形式でメールアドレスを入力してください。',
            'email.unique' => '既に登録されているメールアドレスです。',
            'profile_img.image' => '画像を選択してください。',
            'profile_img.mimes' => 'jpeg, png, jpg, gif, svg形式の画像を選択してください。',
            'profile_img.max' => 'ファイルサイズが2048KBを超えています。',
        ];
    }

    /**
     * [override] バリデーション失敗時ハンドリング
     *
     * @param Validator $validator
     * @throw HttpResponseException
     * @see FormRequest::failedValidation()
     */
    protected function failedValidation(Validator $validator)
    {
        $response['status'] = 422;
        $response['statusText'] = 'Failed validation.';
        $response['errors'] = $validator->errors();
        throw new HttpResponseException(
            response()->json($response, 200)
        );
    }
}