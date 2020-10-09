<?php

namespace Tests\Feature\Users;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProfilePasswordUpdateTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_update_user_profile()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $this->postJson(
            '/api/v1/settings/profile',
            [
                'first_name' => 'mark',
                'last_name' => 'blue'
            ],
            [
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ]
        )->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'first_name' => 'mark',
            'last_name' => 'blue'
        ]);
    }

    /** @test */
    public function it_validates_that_included_field_is_not_blank()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $this->postJson(
            '/api/v1/settings/profile',
            [
                'first_name' => 'mark',
                'last_name' => 'blue',
                'phone' => ''
            ],
            [
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ]
        )->assertStatus(422)
        ->assertJson([
            'errors' => [
                'title' => 'Validation Error',
                'details' => [
                    [
                        'phone' => 'The phone field is required.'
                    ]
                ]
            ]
        ]);
    }
}
