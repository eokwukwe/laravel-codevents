<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Users\UserEventsResource;

class UserEventsController extends Controller
{
    /**
     * Fetch all user events.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return UserEventsResource::collection($request->user()->events)
            ->additional(['meta' => [
                'totalEvents' => $request->user()->events->count()
            ]]);
    }
}
