<?php

namespace App\Http\Controllers\Events;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Attendee;

use function PHPUnit\Framework\isEmpty;

class EventAttendeesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('throttle:6,1')->only('join', 'leave');
    }

    /**
     * Add user as an event attendee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function join(Request $request, Event $event)
    {
        // Check if the user is the host of the event
        if ($event->isHost($request->user()->id)) {
            return response()->json([
                'message' => 'You cannot join your event'
            ], 406);
        }

        // Check if the user has already joined the event
        if ($event->isAttendee($request->user()->id)) {
            return response()->json([
                'message' => 'You have already joined the event'
            ], 403);
        }

        $event->attendees()->create([
            'user_id' => $request->user()->id
        ]);

        return response()->json([
            'message' => 'You have successfully joined the event'
        ], 201);
    }

    /**
     * Remove user as an event attendee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function leave(Request $request, Event $event)
    {
        // Check if the user is the host of the event
        if ($event->isHost($request->user()->id)) {
            return response()->json([
                'message' => 'You cannot remove yourself from your event'
            ], 406);
        }

        if (is_null($event->isAttendee($request->user()->id))) {
            return response()->json([
                'message' => 'You are not an attendee to this event'
            ], 403);
        }

        Attendee::where([
            'event_id' => $event->id,
            'user_id' => $request->user()->id
        ])->delete();

        return response()->json([
            'message' => 'You have successfully removed yourself from the event'
        ], 200);
    }
}
