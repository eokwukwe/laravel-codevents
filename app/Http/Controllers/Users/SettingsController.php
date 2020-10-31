<?php

namespace App\Http\Controllers\Users;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\ProfilePasswordUpdateRequest;

class SettingsController extends Controller
{
    /**
     * Update user profile
     *
     * @param Illuminate\Foundation\Http\FormRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(ProfilePasswordUpdateRequest $request)
    {
        $photo_url = '';

        if ($request->hasFile('image')) {
            $fileName = $request->file('image')->getClientOriginalName();

            $name = substr($fileName, 0, strrpos($fileName, '.'));
            $timeStamp = Carbon::now()->timestamp;

            $upload = $request->file('image')
                ->storeOnCloudinaryAs('laraevents', "{$name}-{$timeStamp}");

            $photo_url = $upload->getSecurePath();
        }

        $request->user()->update([
            'name' => $request->input('name', $request->user()->name),
            'phone' => $request->input('phone', $request->user()->phone),
            'photo_url' => $photo_url ?: $request->user()->photo_url,
            'bio' => $request->input('bio', $request->user()->bio),
        ]);

        return response()->json([
            'message' => 'Profile updated successfully'
        ], 200);
    }

    /**
     * Update user password
     *
     * @param Illuminate\Foundation\Http\FormRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(ProfilePasswordUpdateRequest $request)
    {
        $request->user()->update([
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'message' => 'Password updated successfully'
        ], 200);
    }
}
