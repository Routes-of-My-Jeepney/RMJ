<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class HistoryFactory extends Factory
{

    public function definition()
    {
        return [
            'origin' => $this->faker->city(),
            'destination' => $this->faker->city(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the model's should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return [
            'origin' => $this->faker->city(),
            'definition' => $this->faker->city(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
