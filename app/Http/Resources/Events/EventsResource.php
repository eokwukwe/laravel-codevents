<?php

namespace App\Http\Resources\Events;

use App\Http\Resources\Users\UsersResource;
use Illuminate\Http\Resources\Json\JsonResource;

class EventsResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->title,
            'date' => $this->date,
            'category' => $this->category,
            'description' => $this->description,
            'city' => [
                'address' => $this->city_address,
                'latLng' => [
                    'lat' => $this->city_lat,
                    'lng' => $this->city_lng,
                ]
            ],
            'venue' => [
                'address' => $this->venue_address,
                'latLng' => [
                    'lat' => $this->venue_lat,
                    'lng' => $this->venue_lng,
                ]
            ],
            // 'hostedBy' => new UsersResource($this->whenLoaded('host')),
            'hostedBy' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'photoURL' => $this->user->photo_url,

            ],
        ];
    }
}