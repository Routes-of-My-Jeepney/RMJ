<?php

namespace Database\Seeders;

use App\Models\Jeepney;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::factory()
            ->count(50)
            ->hasAttached(Jeepney::factory()->count(3))
            ->create();
    }
}
