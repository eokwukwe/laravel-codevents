<?php

namespace App\Http\Controllers\Events;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Events\EventsRequest;
use App\Http\Resources\Events\EventsResource;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return EventsResource::collection(Event::paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventsRequest $request)
    {
        $event = Event::create([
            'title' => $request->title,
            'date' => $request->date,
            'category' => $request->category,
            'description' => $request->description,
            'city_address' => $request->city_address,
            'city_lat' => $request->city_lat,
            'city_lng' => $request->city_lng,
            'venue_address' => $request->venue_address,
            'venue_lat' => $request->venue_lat,
            'venue_lng' => $request->venue_lng,
            'user_id' => $request->user()->id,

        ]);

        return new EventsResource($event);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        return new EventsResource($event);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(EventsRequest $request, Event $event)
    {
        $this->authorize('update', $event);

        $event->update($request->all());

        return response()->json([
            'message' => 'Event updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        $this->authorize('delete', $event);

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ], 200);
    }
}