<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;


class UserController extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUserUpdate()
{
    $user = User::factory()->create();
    $updatedName = 'Updated Name';
    $updatedEmail = 'updatedemail@example.com';

    // Assumes that you're using Sanctum for API authentication
    $response = $this->actingAs($user, 'api')
        ->json('PUT', '/api/user/' . $user->id, [
            'name' => $updatedName,
            'email' => $updatedEmail,
        ]);

    $response
        ->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully updated user!',
            'user' => [
                'name' => $updatedName,
                'email' => $updatedEmail,
            ],
        ]);

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => $updatedName,
        'email' => $updatedEmail,
    ]);
}
public function testDeleteUser()
{
    // Create a new user
    $user = User::factory()->create();

    // Act as user
    $this->actingAs($user);

    // Delete user
    $response = $this->delete('/api/users/' . $user->id);

    // Assert user was deleted
    $response->assertStatus(204);

    // Check that the user was deleted from the database
    $this->assertDatabaseMissing('users', ['id' => $user->id]);
}

// public function testResetPassword()
// {
//     // Create a new user
//     $user = User::factory()->create();

//     // Act as user
//     $this->actingAs($user);

//     // Request to reset password
//     $newPassword = "newpassword";
//     $response = $this->post('/api/resetPassword', [
//         'currentPassword' => 'password', // Default password set in UserFactory
//         'newPassword' => $newPassword,
//     ]);

//     // Assert request was successful
//     $response->assertStatus(200);

//     // Check if password was updated
//     $user->refresh();
//     $this->assertTrue(Hash::check($newPassword, $user->password));
// }

// public function testDeleteProfileImage()
// {
//     // Create a new user
//     $user = User::factory()->create();

//     // Act as user
//     $this->actingAs($user);

//     // Mock image upload
//     Storage::fake('public');
//     $user->profile_img = UploadedFile::fake()->image('avatar.jpg');
//     $user->save();

//     // Request to delete profile image
//     $response = $this->delete('/users/deleteProfileImage');

//     // Assert request was successful
//     $response->assertRedirect(route('users.show', compact('user')));

//     // Check if image was deleted
//     $user->refresh();
//     $this->assertNull($user->profile_img);
// }

}
