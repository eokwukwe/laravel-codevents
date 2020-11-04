<?php

namespace App\Http\Controllers\Users;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RelationshipsController extends Controller
{
    /**
     * Follow or unfollow a user
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, User $user)
    {
        $authUser = $request->user()->id;

        // Check if logged in user is already a follower
        if (!$user->isFollowedBy($authUser)) {
            $user->followers()->attach($authUser);

            return response()->json([
                'message' => 'You are now following the user'
            ], 201);
        }

        // Else unfollow the user
        $user->followers()->detach($authUser);

        return response()->json([
            'message' => 'You have unfollowed the user'
        ], 201);
    }
}
