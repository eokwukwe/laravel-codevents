<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attendees()
    {
        return $this->hasMany(Attendee::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Check is user is the event host
     * 
     * @param int $userId
     * @return bool
     */
    public function isHost($userId)
    {
        return $this->user_id === $userId;
    }

    /**
     * Check is user is the event host
     * 
     * @param int $userId
     * @return \App\Models\Attendee  $attendee
     */
    public function isAttendee($userId)
    {
        return Attendee::where([
            'event_id' => $this->id,
            'user_id' => $userId
        ])->first();
    }
}
