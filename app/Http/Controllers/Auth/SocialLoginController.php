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

        $newUser = $this->createUser($provider, $clientBaseUrl, $identity);

        $token = $this->auth->fromUser($newUser);

        return redirect("{$clientBaseUrl}/auth/{$provider}?token={$token}");
    }

    /**
     * Create a new user using social credentials
     * 
     * @param string $provider
     * @param string $clientBaseUrl 
     * @param \Laravel\Socialite\Two\User $identity
     * @return \App\Models\User  $user
     */
    public function createUser($provider, $clientBaseUrl, $identity)
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
                "{$clientBaseUrl}?error=Unable to login using {$provider}. Please try again"
            );
        }

        return $socialAccount ? $socialAccount->user : $user;
    }
}
