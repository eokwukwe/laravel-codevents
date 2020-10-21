<?php

namespace App\Http\Resources\Events;

use App\Http\Resources\Users\UsersResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Comments\CommentsResource;
use App\Http\Resources\Attendees\AttendeesResource;

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
            'id'          => $this->id,
            'title'       => $this->title,
            'date'        => $this->date,
            'category'    => $this->category,
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
            'hostedBy' => new UsersResource($this->user),
            'attendees'   => AttendeesResource::collection($this->attendees),
            'comments'    => CommentsResource::collection($this->comments),
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
