<?php

namespace App\Http\Controllers\Comments;

use App\Models\Event;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Comments\CommentsResource;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Event $event)
    {
        return CommentsResource::collection(
            $event->comments->sortByDesc('created_at')
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Event $event)
    {
        $request->validate([
            'content' => ['required', 'string', 'max:500']
        ]);

        $event->comments()->create([
            'content' => $request->content,
            'user_id' => $request->user()->id
        ]);

        return response()->json([
            'message' => 'Comment added successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event, Comment $comment)
    {
        $this->authorize('update', $comment);

        $request->validate([
            'content' => ['required', 'string', 'max:500']
        ]);

        $comment->update([
            'content' => $request->content,
            'user_id' => $request->user()->id,
            'event_id' => $event->id
        ]);

        return response()->json([
            'message' => 'Comment updated succesfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event, Comment $comment)
    {
        $this->authorize('update', $comment);

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully'
        ], 200);
    }
}
