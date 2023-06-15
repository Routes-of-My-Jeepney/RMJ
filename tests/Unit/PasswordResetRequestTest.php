<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Models\User;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    /** @test */
    public function it_resets_password_successfully()
    {
        // テスト用のユーザーを作成します
        $user = User::factory()->create([
            'password' => Hash::make('Password@123'),
        ]);

        // モックされた認証を使用して、テスト用のユーザーを認証します
        $this->actingAs($user);

        // 新しいパスワード
        $newPassword = $this->faker->password(8);

        // リクエストを送信します
        $response = $this->postJson('/api/reset-password', [
            'currentPassword' => 'Password@123',
            'newPassword' => $newPassword,
        ]);

        // レスポンスを検証します
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Successfully updated password!',
            ]);

        // パスワードが実際に変更されたことを確認します
        $this->assertTrue(Hash::check($newPassword, $user->fresh()->password));
    }

    /** @test */
    public function it_returns_error_if_current_password_is_incorrect()
    {
        // テスト用のユーザーを作成します
        $user = User::factory()->create([
            'password' => Hash::make('Password@123'),
        ]);

        // モックされた認証を使用して、テスト用のユーザーを認証します
        $this->actingAs($user);
        // 新しいパスワード
        $newPassword = $this->faker->password(8);

        // リクエストを送信します（現在のパスワードが異なる）
        $response = $this->postJson('/api/reset-password', [
            'currentPassword' => 'wrongpassword',
            'newPassword' => $newPassword,
        ]);

        // レスポンスを検証します
        $response->assertStatus(400)
            ->assertJson([
                'message' => '現在のパスワードが正しくありません。',
            ]);

        // パスワードが変更されていないことを確認します
        $this->assertTrue(Hash::check('Password@123', $user->fresh()->password));
    }
}




?>