<?php

namespace App\Http\Resources\Comments;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentsResource extends JsonResource
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
            'id'   => $this->id,
            'content' => $this->content,
            'user' => [
                'id'   => $this->user->id,
                'name' => $this->user->name
            ],
            'createdAt' => [
                'forHuman'  => $this->created_at->diffForHumans(),
                'timestamp' => $this->created_at
            ]
        ];
    }
}
