<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        // Add the event owner as an attendee when event is created
        static::created(function ($model) {
            $model->attendees()->create([
                'user_id' => $model->user->id
            ]);
        });
    }

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
     * Check is user is an attendee
     * 
     * @param int $userId
     * @return \App\Models\Attendee  $attendee
     */
    public function isAttendee($userId)
    {
        return $this->attendees()->where('user_id', $userId)->exists();
    }
}
