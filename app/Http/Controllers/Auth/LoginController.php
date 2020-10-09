<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;


    /**
     * Attempt to log the user into the application.
     *
     * This is an overwrite of the attemptLogin method from the
     * AuthenticatesUsers trait to adapt it for API login
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        // Attempt to issue a token based on login credentials
        $token = $this->guard()->attempt($this->credentials($request));

        if (!$token) {
            return false;
        }

        // Get the authenticated user
        $user = $this->guard()->user();

        // Check the users has verified email
        if ($user instanceof MustVerifyEmail && !$user->hasVerifiedEmail()) {
            return false;
        }

        // Set user's token
        $this->guard()->setToken($token);

        return true;
    }

    /**
     * Send the response after the user was authenticated.
     *
     * This is an overwrite of the sendLoginResponse method from the
     * AuthenticatesUsers trait to adapt it for API
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        // Get the token from the authentication guard
        $token = (string) $this->guard()->getToken();

        // Extract the expiry date of the token
        $expiration = $this->guard()->getPayload()->get('exp');

        return response()->json([
            'data' => [
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => $expiration
            ]
        ], 200);
    }

    /**
     * Get the failed login response instance.
     *
     * his is an overwrite of the sendFailedLoginResponse method from
     * the AuthenticatesUsers trait to adapt it for API
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        // Get user
        $user = $this->guard()->user();

        if ($user instanceof MustVerifyEmail && !$user->hasVerifiedEmail()) {
            return response()->json([
                'error' => [
                    'title' => 'Authentication',
                    'details' => 'You need to verify your email.'
                ]
            ], 403);
        }

        throw ValidationException::withMessages([
            $this->username() => 'Invalid credentials.'
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
