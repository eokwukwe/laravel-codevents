<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
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
        return [
            'title' => $this->faker->sentence(),
            'date' => $this->faker->dateTime(),
            'category' => $this->faker->randomElement([
                'drink', 'culture', 'food'
            ]),
            'description' => $this->faker->sentence(15),
            'city_address' => $this->faker->city(),
            'city_lat' => $this->faker->latitude(),
            'city_lng' => $this->faker->longitude(),
            'venue_address' => $this->faker->streetAddress(),
            'venue_lat' => $this->faker->latitude(),
            'venue_lng' => $this->faker->longitude(),
            'user_id' => User::factory(),
        ];
    }
}
