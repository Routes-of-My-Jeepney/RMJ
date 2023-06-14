<?php

namespace Database\Factories;

use App\Models\Jeepney;
use Illuminate\Database\Eloquent\Factories\Factory;

class JeepneyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Jeepney::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'originlat' => $this->faker->latitude,
            'originlng' => $this->faker->longitude,
            'destinationlat' => $this->faker->latitude,
            'destinationlng' => $this->faker->longitude,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
