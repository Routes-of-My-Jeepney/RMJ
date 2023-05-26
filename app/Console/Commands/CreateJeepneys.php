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
            'name' => '01B',
            'originlat' => 10.3527,
            'originlng' => 123.912829,
            'destinationlat' => 10.299586,
            'destinationlng' => 123.910356,
        ]);
        Jeepney::create([
            'name' => '01C',
            'originlat' => 10.298503,
            'originlng' => 123.908032,
            'destinationlat' => 10.312346,
            'destinationlng' => 123.886167,
        ]);
        Jeepney::create([
            'name' => '02B',
            'originlat' => 10.298503,
            'originlng' => 123.908032,
            'destinationlat' => 10.29795,
            'destinationlng' => 123.89209,
        ]);
        Jeepney::create([
            'name' => '03A',
            'originlat' => 10.291927,
            'originlng' => 123.89943,
            'destinationlat' => 10.327436,
            'destinationlng' => 123.92099,
        ]);
        Jeepney::create([
            'name' => '03B',
            'originlat' => 10.295899,
            'originlng' => 123.898262,
            'destinationlat' => 10.320774,
            'destinationlng' => 123.916827,
        ]);
        Jeepney::create([
            'name' => '03L',
            'originlat' => 10.317945,
            'originlng' => 123.909745,
            'destinationlat' => 10.291927,
            'destinationlng' => 123.89943,
        ]);
        Jeepney::create([
            'name' => '03Q',
            'originlat' => 10.3175,
            'originlng' => 123.9057,
            'destinationlat' => 10.3104,
            'destinationlng' => 123.9182,
        ]);







        Jeepney::create([
            'name' => '04L',
            'originlat' => 10.3338,
            'originlng' => 123.8941,
            'destinationlat' => 10.3104,
            'destinationlng' => 123.9182,
        ]);
        


        $this->info('Jeepneys created successfully');
    }
}
