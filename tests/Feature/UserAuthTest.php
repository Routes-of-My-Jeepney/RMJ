<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Models\User;

class UserAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_register()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => 'Password@123',
            'password_confirmation' => 'Password@123',
        ];

        $response = $this->post('/api/register', $userData);

        $response->assertStatus(201);
        $response->assertJson(['message' => 'Successfully registered!']);
        $this->assertDatabaseHas('users', ['email' => 'test@test.com']);
    }

    public function test_register_with_non_existing_column()
    {
        // Arrange
        $user = User::factory()->make()->toArray();
        $user['non_existing_column'] = 'Some data';

        // Act
        $response = $this->json('POST', '/api/register', $user);

        // Assert
        $response->assertStatus(422);  // 422 is for Unprocessable Entity, meaning there was a validation error
    }

    public function test_login()
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => Hash::make('Password@123'),
        ]);

        $loginData = [
            'email' => 'test@test.com',
            'password' => 'Password@123',
        ];

        $response = $this->post('/api/login', $loginData);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Logged in successfully']);
    }

    public function test_logout()
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => Hash::make('Password@123'),
        ]);

        $this->actingAs($user);

        $response = $this->post('/api/logout');

        $response->assertStatus(200);
        // $response->assertJson(['message' => 'Successfully logged out']);
    }
}
