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
            'origin' => '消えろ',
            'destination' => 'ExampleDest'
        ];

        $request = new Request($requestData);
        $response = $this->post('/api/history', $requestData);
        $historyId = $response['id'];

        // // テストデータを削除
        //$historyId = $response['id']; // 履歴データのIDを取得

        $requestData2 = [
            'id' => $historyId,
             ];

        $request2 = new Request($requestData2);

    // テストデータの削除
        $response = $this->delete('/api/history/', $requestData2);

        
        $response->assertStatus(200);

        $this -> assertDatabaseMissing('histories',['id'=>$historyId]);
        // $this->assertDatabaseHas('histories', $requestData);
        // $this->assertDatabaseMissing('histories', ['id' => $historyId]);
    }
}
