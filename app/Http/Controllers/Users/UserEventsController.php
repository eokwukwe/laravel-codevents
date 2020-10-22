<?php

namespace App\Http\Controllers\Users;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Users\UserEventsResource;

class UserEventsController extends Controller
{
    /**
     * Fetch all user events.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        return UserEventsResource::collection($user->events)
            ->additional(['meta' => [
                'totalEvents' => $user->events->count()
            ]]);
    }
}
