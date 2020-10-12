<?php

namespace App\Http\Resources\Users;

use App\Http\Resources\Events\EventsResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
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
            'events'   => EventsResource::collection(
                $this->whenLoaded('events')
            ),
            'createdAt' => [
                'forHuman'  => $this->created_at->diffForHumans(),
                'timestamp' => $this->created_at
            ],
        ];
    }
}
