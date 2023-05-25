<?php

namespace App\Console\Commands;

use App\Models\Jeepney;
use Illuminate\Console\Command;

class CreateJeepneys extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:jeepneys';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create jeepneys data';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Jeepney::create([
            'name' => '01K',
            'originlat' => 10.3248,
            'originlng' => 123.9348,
            'destinationlat' => 10.3027,
            'destinationlng' => 123.891,
        ]);
        Jeepney::create([
            'name' => '04L',
            'originlat' => 10.3338,
            'originlng' => 123.8941,
            'destinationlat' => 10.3104,
            'destinationlng' => 123.9182,
        ]);
        Jeepney::create([
            'name' => '03Q',
            'originlat' => 10.3175,
            'originlng' => 123.9057,
            'destinationlat' => 10.3104,
            'destinationlng' => 123.9182,
        ]);

        $this->info('Jeepneys created successfully');
    }
}
