<?php

namespace Database\Seeders;

use App\Models\Route;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\History;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class HistoryTableSeeder extends Seeder
{
        /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            History::factory()->create([
                'user_id' => $user->id,
            ]);    
        }
    }
}