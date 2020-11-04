<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Event;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $users = User::all();

        Event::all()->each(function (Event $event) use ($users, $faker) {
            $otherUsers = $users
                ->filter(fn ($val, $key) => $val->id !== $event->user->id);

            $event->attendees()
                ->create(['user_id' => $otherUsers->pluck('id')->random()]);

            $event->comments()
                ->create([
                    'content' => $faker->sentence(15),
                    'user_id' => $users->pluck('id')->random()
                ]);
        });
    }
}
