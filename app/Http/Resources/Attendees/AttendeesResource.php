<?php

namespace App\Http\Resources\Attendees;

use Illuminate\Http\Resources\Json\JsonResource;

class AttendeesResource extends JsonResource
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
            'id' => $this->user->id,
            'name'       => $this->user->name,
            'photoURL'   => $this->user->photo_url,
        ];
    }
}
