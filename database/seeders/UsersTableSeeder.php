<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $users = User::factory()->count(3)->hasEvents(3)->create();

    $users[0]->update([
      'email' => 'john@doe.com',
      'photo_url' => 'https://randomuser.me/api/portraits/men/20.jpg'
    ]);
  }
}
