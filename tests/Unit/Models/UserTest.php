<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function a_user_id_is_a_uuid_instead_of_an_integer()
    {
        $user = User::factory()->create();

        $this->assertFalse(is_integer($user->id));

        $this->assertEquals(36, strlen($user->id));
    }
}
