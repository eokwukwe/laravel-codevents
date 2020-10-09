<?php

namespace Tests\Feature\Authentications;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserRegistrationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_register_a_new_user()
    {
        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@doe.com',
                'password' => 'password',
                'password_confirmation' => 'password',
            ],
            [
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ]
        )->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@doe.com',
        ]);
    }

    /** @test */
    public function it_validates_that_first_name_field_is_provided_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => '',
                'last_name' => 'doe',
                'email' => 'john@doe.com',
                'password' => 'password',
                'password_confirmation' => 'password',
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
                            'first_name' => 'The first name field is required.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_first_name_field_is_a_string_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 2222222,
                'last_name' => 'doe',
                'email' => 'john@doe.com',
                'password' => 'password',
                'password_confirmation' => 'password',
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
                            'first_name' => 'The first name must be a string.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_last_name_field_is_provided_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'john',
                'last_name' => '',
                'email' => 'john@doe.com',
                'password' => 'password',
                'password_confirmation' => 'password',
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
                            'last_name' => 'The last name field is required.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_last_name_field_is_a_string_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'john',
                'last_name' => 2222222,
                'email' => 'john@doe.com',
                'password' => 'password',
                'password_confirmation' => 'password',
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
                            'last_name' => 'The last name must be a string.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_email_field_is_provided_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => '',
                'password' => 'password',
                'password_confirmation' => 'password',
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
    public function it_validates_that_email_field_is_a_valid_email_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'johndoecom',
                'password' => 'password',
                'password_confirmation' => 'password',
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
                            'email' => 'The email must be a valid email address.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_email_provided_does_not_already_exists_when_registering_a_new_user()
    {
        $user = User::factory()->create();

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => $user->email,
                'password' => 'password',
                'password_confirmation' => 'password',
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
                            'email' => 'The email has already been taken.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_password_field_is_provided_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@doe.com',
                'password' => '',
                'password_confirmation' => 'password',
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
    public function it_validates_that_password_field_is_a_string_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@doe.com',
                'password' => 3333333,
                'password_confirmation' => 'password',
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
                            'password' => 'The password must be a string.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_password_field_is_a_string_of_at_least_8_characters_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@doe.com',
                'password' => 'john',
                'password_confirmation' => 'password',
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
                            'password' => 'The password must be at least 8 characters.'
                        ]
                    ]
                ]
            ]);
    }

    /** @test */
    public function it_validates_that_password_matches_password_confirmation_when_registering_a_new_user()
    {

        $this->postJson(
            '/api/v1/register',
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@doe.com',
                'password' => 'password',
                'password_confirmation' => 'passwor',
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
                            'password' => 'The password confirmation does not match.'
                        ]
                    ]
                ]
            ]);
    }
}
