<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Jeepney;
use App\Models\User;

class JeepneyTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->get('/api/jeepney');

        $response->assertStatus(200);
    }

    public function testShow()
    {
        $jeepney = Jeepney::factory()->create();

        $response = $this->get('/api/jeepney/' . $jeepney->id);

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $jeepney->id,
            // Add more assertions here for other Jeepney properties
        ]);
    }

    public function testLikeJeepney()
    {
        $user = User::factory()->create();
        $jeepney = Jeepney::factory()->create();

        $response = $this->actingAs($user)->post('/api/jeepney/' . $jeepney->id . '/like');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Jeepney added to favorites'
        ]);
    }

    public function testDislikeJeepney()
    {
        $user = User::factory()->create();
        $jeepney = Jeepney::factory()->create();

        $response = $this->actingAs($user)->delete('/api/jeepney/' . $jeepney->id . '/like');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Jeepney removed from favorites'
        ]);
    }

    public function testShowLikedJeepneys()
    {
        $user = User::factory()->create();
        $jeepney = Jeepney::factory()->create();
        $user->likedJeepneys()->attach($jeepney);

        $response = $this->actingAs($user)->get('/api/jeepney/liked');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Liked jeepneys fetched successfully'
        ]);
    }

    public function testUpdateLikedJeepneyName()
    {
        $user = User::factory()->create();
        $jeepney = Jeepney::factory()->create();
        $user->likedJeepneys()->attach($jeepney);

        $response = $this->actingAs($user)->put('/api/jeepney/' . $jeepney->id . '/liked', [
            'custom_name' => 'New Custom Name'
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Jeepney name updated successfully'
        ]);
    }
}
