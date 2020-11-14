<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use App\Models\User;
use Tymon\JWTAuth\JWTAuth;
use App\Models\SocialIdentity;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    protected $auth;

    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    public function redirect($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function callback($provider)
    {
        $clientBaseUrl = config('app.client_url');

        try {
            $identity = Socialite::driver($provider)->stateless()->user();
        } catch (\Throwable $ex) {
            return redirect(
                "{$clientBaseUrl}?error=Unable to login using {$provider}. Please try again"
            );
        }

        // create user record or retrieve already existing one
        $newUser = $this->findOrCreateUser($provider, $clientBaseUrl, $identity);

        $token = $this->auth->fromUser($newUser);

        $this->auth->setToken($token);

        $this->auth->authenticate();

        $expiration = $this->auth->getPayload()->get('exp');

        return redirect(
            "{$clientBaseUrl}/oauth/{$provider}?token={$token}&expiresIn={$expiration}"
        );
    }

    /**
     * Create a new user using social credentials
     * 
     * @param string $provider
     * @param string $clientBaseUrl 
     * @param \Laravel\Socialite\Two\User $identity
     * @return \App\Models\User  $user
     */
    public function findOrCreateUser($provider, $clientBaseUrl, $identity)
    {
        DB::beginTransaction();

        try {
            $socialAccount = SocialIdentity::where([
                'provider_id' => $identity->getId(),
                'provider_name' => $provider
            ])->first();

            if (!$socialAccount) {
                $user = User::firstOrCreate(
                    [
                        'email' => $identity->getEmail()
                    ],
                    [
                        'name' => $identity->getName(),
                        'photo_url' => $identity->getAvatar(),
                        'email_verified_at' => Carbon::now()
                    ]
                );

                $user->identities()->create([
                    'provider_id'   => $identity->getId(),
                    'provider_name' => $provider,
                ]);
            }

            DB::commit();
        } catch (\Throwable $ex) {
            Log::info($ex->getMessage());

            DB::rollback();

            return redirect(
                "{$clientBaseUrl}/oauth?error=Unable to login using {$provider}. Please try again"
            );
        }

        return $socialAccount ? $socialAccount->user : $user;
    }
}
