<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jeepney>
 */
class JeepneyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'origin' => $this->faker->city(),
            'destination' => $this->faker->city(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
