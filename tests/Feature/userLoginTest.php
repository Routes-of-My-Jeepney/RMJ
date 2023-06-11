<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class userLogin extends TestCase
{
    
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLogin()
{
    // Create a user to attempt a login
    $user = User::factory()->create([
        'email' => 'test@test.com',
        'password' => bcrypt('password'),
    ]);

    // Attempt a login
    $response = $this->post('/api/login', [
        'name' => 'Test User',
        'email' => 'test@test.com',
        'password' => 'password',
    ]);

    // Assert the login was successful
    $response->assertStatus(200);
    $response->assertJson(['message' => 'Logged in successfully']);
}

    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
