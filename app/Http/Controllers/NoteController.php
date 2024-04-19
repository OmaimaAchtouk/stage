<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Validator;


class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():response
    {
        return Inertia::render('Profile/Notes/Note',[
            'content'=>'this is content test ',
            'notes'=> Note ::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'note_title' => 'nullable|string',
            'note_desc' => 'nullable|string',
        ];

        // Validate the request data
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
        //if data passes
        $note=Note::create([
            'title_note' => $request->input('note_title'),
            'description' => $request->input('note_desc'),
            'user_id'=>auth()->id(),

        ]);
        return to_route('note.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
