<?php

namespace App\Http\Controllers\Events;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\Events\EventsRequest;
use App\Http\Resources\Events\EventsResource;
use Carbon\Carbon;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $events = Event::filter($request)
            ->where('date', '>=', Carbon::now())
            ->latest()
            ->paginate(5);

        return EventsResource::collection($events);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventsRequest $request)
    {
        DB::beginTransaction();

        try {
            $event = Event::create(array_merge(
                ['user_id' => $request->user()->id],
                $request->all()
            ));

            DB::commit();
        } catch (\Throwable $ex) {
            Log::info($ex->getMessage());

            DB::rollback();

            return response()->json([
                'message' => $ex->getMessage()
            ], 409);
        }

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
