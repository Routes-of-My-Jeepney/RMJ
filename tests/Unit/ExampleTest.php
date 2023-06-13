<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use Illuminate\Http\Request;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_that_true_is_true()
    {
        $requestData = [
            'user_id' => 1,
            'origin' => 'Exsample Origin',
            'destination' => 'ExampleDest'
        ];

        $request = new Request($requestData);
        $response = $this->post('/api/history', $requestData);

        // // テストデータを削除
        $response = $this->post('/api/history', $requestData);
        $responseData = $response->json(); // レスポンスからデータを取得
        $historyId = $responseData['id']; // 履歴データのIDを取得

    // テストデータの削除
        $response = $this->delete('/api/history/' . $historyId);

        
        $response->assertStatus(200);

        $this->assertDatabaseHas('histories', $requestData);
        $this->assertDatabaseMissing('histories', ['id' => $historyId]);
    }
}
