<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class userLogout extends TestCase
{
    
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLogout()
    {
        // Create a user to attempt a login
        $user = User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
        ]);
    
        // Login first
        $this->actingAs($user);
    
        // Now, logout
        $response = $this->post('/api/logout');
    
        // Assert logout was successful
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Successfully logged out']);
    }
}
