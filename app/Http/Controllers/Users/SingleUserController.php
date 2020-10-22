<?php

namespace App\Http\Controllers\Users;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\Users\UsersProfileResource;

class SingleUserController extends Controller
{
    /**
     * Fetch user profile data.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        return new UsersProfileResource($user);
    }
}
