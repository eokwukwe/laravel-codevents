<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $eventDate = Carbon::now();

        return [
            'title' => $this->faker->sentence(),
            'date' => $eventDate->addMonths(
                $this->faker->unique()->numberBetween($min = 0, $max = 10)
            ),
            'category' => $this->faker->randomElement([
                'drinks', 'culture', 'food'
            ]),
            'description' => $this->faker->sentence(15),
            'venue' => $this->faker->streetAddress(),
            'venue_lat' => $this->faker->latitude(),
            'venue_lng' => $this->faker->longitude(),
            'user_id' => User::factory(),
        ];
    }
}
