<?php

namespace Tests\Feature\Authentications;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserLoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_login_verified_user()
    {
        $user = User::factory()->create();

        $r = $this->postJson(
            '/api/v1/login',
            [
                'email' => $user->email,
                'password' => 'password',
            ],
            [
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ]
        )->assertStatus(200);

        $r->assertJson([
            'data' => [
                'token' => $r->original['data']['token'],
                'token_type' => $r->original['data']['token_type'],
                'expires_in' => $r->original['data']['expires_in'],
            ]
        ]);
    }

    /** @test */
    public function it_validates_that_email_field_is_provided_when_logging_in_a_user()
    {
        $user = User::factory()->create();

        $this->postJson(
            '/api/v1/login',
            [
                'email' => '',
                'password' => 'password',
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
                            'email' => 'The email field is required.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_password_field_is_provided_when_logging_in_a_user()
    {
        $user = User::factory()->create();

        $this->postJson(
            '/api/v1/login',
            [
                'email' => $user->email,
                'password' => '',
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
                            'password' => 'The password field is required.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_a_user_logs_in_with_valid_credentials()
    {
        $user = User::factory()->create();

        $this->postJson(
            '/api/v1/login',
            [
                'email' => $user->email,
                'password' => 'passseds',
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
                            'email' => 'Invalid credentials.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_prevents_unverified_user_from_logging_in()
    {
        $user = User::factory()->create([
            'first_name'=> 'name',
            'last_name' => 'name',
            'email' => 'name@name.com',
            'password'=> Hash::make('name'),
            'email_verified_at' => null
        ]);

        $this->postJson(
            '/api/v1/login',
            [
                'email' => 'name@name.com',
                'password' => 'name',
            ],
            [
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ]
        )->assertStatus(403)
            ->assertJson([
                'error' => [
                    'title' => 'Authentication',
                    'details' => 'You need to verify your email.'
                ]
            ]);
    }
}
