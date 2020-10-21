<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Resources\Json\JsonResource;

class UserEventsResource extends JsonResource
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
                'address' => $this->city,
                'latLng'  => [
                    'lat' => $this->city_lat,
                    'lng' => $this->city_lng,
                ]
            ],
            'venue' => [
                'address' => $this->venue,
                'latLng'  => [
                    'lat' => $this->venue_lat,
                    'lng' => $this->venue_lng,
                ]
            ],
            'createdAt'   => [
                'forHuman'  => $this->created_at->diffForHumans(),
                'timestamp' => $this->created_at
            ],
            'updatedAt'   => [
                'forHuman'  => $this->updated_at->diffForHumans(),
                'timestamp' => $this->updated_at
            ],
        ];
    }
}
