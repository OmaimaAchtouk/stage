<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 

     public function index()
     {
         $events = Event::where('user_id', Auth::id())->get();
         return Inertia::render('Profile/Events/CalendarEvent', [
             'events' => $events
         ]);
     }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return Inertia::render('Profile/Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(Request $request)
     {
         $request->validate([
             'title_event' => 'required|string|max:255',
             'date_debut' => 'required|date_format:Y-m-d\TH:i:s\Z',
             'date_fin' => 'required|date_format:Y-m-d\TH:i:s\Z|after:date_debut',
         ]);
 
         Event::create([
             'title_event' => $request->title_event,
             'date_debut' => $request->date_debut,
             'date_fin' => $request->date_fin,
             'user_id' => Auth::id(),
         ]);
 
         return redirect()->back();
     }
//----------



    
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
