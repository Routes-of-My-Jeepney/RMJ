<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class userRegister extends TestCase
{
    use RefreshDatabase; // Use the RefreshDatabase trait 
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_register()
    
    {
        $data = [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => 'Password@123',
            'password_confirmation' => 'Password@123',
        ];
    
        // Make a post request to the register method
        $response = $this->post('/api/register', $data);
    
        // Assert the response status is 201 (created) and the response contains 'Successfully registered!'
        $response->assertStatus(201);
        $response->assertJson(['message' => 'Successfully registered!']);
        $this->assertTrue(true);
    
        // Assert the user was created in the database
        $this->assertDatabaseHas('users', [
            'email' => 'test@test.com'
        ]);
    }
}
