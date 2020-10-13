<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Resources\Json\JsonResource;

class UsersProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'       => $this->id,
            'name'     => $this->name,
            'email'    => $this->email,
            'phone'    => $this->phone,
            'bio'      => $this->bio,
            'photoURL' => $this->photo_url,
            'followersCount' => $this->followers->count(),
            'followers' => $this->followers->map(function ($item, $key) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'photoURL' => $item->photo_url,
                ];
            }),
            'followingsCount' => $this->followings->count(),
            'followings' => $this->followings->map(function ($item, $key) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'photoURL' => $item->photo_url,
                ];
            }),
            'createdAt' => [
                'forHuman'  => $this->created_at->diffForHumans(),
                'timestamp' => $this->created_at
            ],
        ];
    }
}
