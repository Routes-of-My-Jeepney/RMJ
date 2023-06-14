<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Jeepney;

class JeepneyControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function testLikeJeepney()
    {
        $this->withoutExceptionHandling();

        // Create a user and a jeepney
        $user = User::factory()->create();
        $jeepney = Jeepney::factory()->create();

        // Acting as the user, make a post request to the likeJeepney route
        $response = $this->actingAs($user)->post('/api/jeepney/' . $jeepney->id . '/like');

        // Assert that the response was successful
        $response->assertStatus(200);

        // Assert that the user has liked the jeepney
        $this->assertTrue($user->likedJeepneys->contains($jeepney));
    }

    public function testDislikeJeepney()
    {
        $user = User::factory()->create();
        $jeepney = Jeepney::factory()->create();
        $user->likedJeepneys()->attach($jeepney);

        $response = $this->actingAs($user)
            ->json('DELETE', '/api/jeepney/'.$jeepney->id.'/dislike'); // Replace with the actual route you have defined for this

        $response
            ->assertStatus(200)
            ->assertJson([
                'message' => 'Jeepney removed from favorites',
            ]);

        $this->assertDatabaseMissing('jeepney_user', [
            'user_id' => $user->id,
            'jeepney_id' => $jeepney->id,
        ]);
    }

    // Test the updateLikedJeepneyName method
    public function testUpdateLikedJeepneyName()
    {
        $user = User::factory()->create();
        $jeepney = Jeepney::factory()->create();
        $user->likedJeepneys()->attach($jeepney);

        $response = $this->actingAs($user)
            ->json('POST', '/api/jeepney/'.$jeepney->id.'/update', ['custom_name' => 'New Name']); // Replace with the actual route you have defined for this

        $response
            ->assertStatus(200)
            ->assertJson([
                'message' => 'Jeepney name updated successfully',
            ]);

        $this->assertDatabaseHas('jeepney_user', [
            'user_id' => $user->id,
            'jeepney_id' => $jeepney->id,
            'custom_name' => 'New Name',
        ]);
    }
}
