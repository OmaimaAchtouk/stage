<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;
use App\Models\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File as FileFacade;


class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */


     public function index(Request $request)
{
    $searchQuery = $request->input('search');

    $notes = Note::with('files')
        ->orderBy('is_pinned', 'desc') // Pinned notes first
        ->orderBy('created_at', 'desc'); // Then by creation date

    if ($searchQuery) {
        $notes->where(function ($query) use ($searchQuery) {
            $query->where('title_note', 'like', '%' . $searchQuery . '%')
                ->orWhere('description', 'like', '%' . $searchQuery . '%');
        });
    }

    $notes = $notes->get();
    return Inertia::render('Profile/Notes/Note', [
        'notes' => $notes,
    ]);
}

////----with search----//
    //  public function index(Request $request)
    //  {
    //      $searchQuery = $request->input('search');

    //      $notes = Note::with('files');

    //      if ($searchQuery) {
    //          $notes->where(function ($query) use ($searchQuery) {
    //              $query->where('title_note', 'like', '%' . $searchQuery . '%')
    //                  ->orWhere('description', 'like', '%' . $searchQuery . '%');
    //          });
    //      }
    //      $notes = $notes->get();
    //      return Inertia::render('Profile/Notes/Note', [
    //          'notes' => $notes,
    //      ]);


    //  }

    //--old index---///
    // public function index():response
    // {
    //     // Eager load the 'files' relationship for each note
    //      $notes = Note::with('files')->get();
    //     return Inertia::render('Profile/Notes/Note',[
    //         'content'=>'this is content test ',
    //         'notes'=> $notes,
    //     ]);
    // }

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
        'files.*' => 'nullable|file|max:2048', // Allow any file type for each file
    ];

    $validator = Validator::make($request->all(), $rules);
    $validator->after(function ($validator) use ($request) {
            if (!$request->has('note_title') && !$request->has('note_desc') && !$request->hasFile('files')) {
                $validator->errors()->add('note_title', 'At least one field is required.');
            }
        });
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

    // Create a note
    $note = Note::create([
        'title_note' => $request->input('note_title'),
        'description' => $request->input('note_desc'),
        'user_id' => auth()->id(),
    ]);

    // Handle file upload if files were provided
    if ($request->hasFile('files')) {
        foreach ($request->file('files') as $file) {
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('files', $filename, 'public');

            // Create a new File model instance and associate it with the note
            $fileModel = new File;
            $fileModel->name_file = $filename;
            $fileModel->chemin = $path;
            $fileModel->type_file = $file->getClientMimeType();
            $fileModel->taille = $file->getSize();
            $fileModel->user_id = Auth::id();
            $fileModel->id_note = $note->id_note;
            $fileModel->save();
        }
    }

    return redirect()->route('note.index');
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id_note)
    {
        $note=Note::with('files')->findOrFail($id_note);
        return inertia('Profile/Notes/EditNote', ['note' => $note]);

    }


public function update(Request $request, string $id_note)
{
    $note = Note::findOrFail($id_note);

    $rules = [
        'note_title' => 'nullable|string',
        'note_desc' => 'nullable|string',
        'files.*' => 'nullable|file|max:2048',
    ];

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    $note->update([
        'title_note' => $request->input('note_title'),
        'description' => $request->input('note_desc'),
    ]);

    // Handle file uploads if files were provided
    if ($request->hasFile('files')) {
        foreach ($request->file('files') as $file) {
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('files', $filename, 'public');

            // Create a new File model instance and associate it with the note
            $fileModel = new File;
            $fileModel->name_file = $filename;
            $fileModel->chemin = $path;
            $fileModel->type_file = $file->getClientMimeType();
            $fileModel->taille = $file->getSize();
            $fileModel->user_id = Auth::id();
            $fileModel->id_note = $note->id_note;
            $fileModel->save();
        }
    }

    return redirect()->route('note.index');
}
//    ////  --- the new store and update----/////
//    public function store(Request $request)
//    {
//        $rules = [
//            'note_title' => 'nullable|string',
//            'note_desc' => 'nullable|string',
//            'files.*' => 'nullable|file|max:2048',
//            'note_color' => 'required|string',

//        ];

//        $validator = Validator::make($request->all(), $rules);
//        $validator->after(function ($validator) use ($request) {
//            if (!$request->has('note_title') && !$request->has('note_desc') && !$request->hasFile('files')) {
//                $validator->errors()->add('note_title', 'At least one field is required.');
//            }
//        });
//        if ($validator->fails()) {
//            return back()->withErrors($validator)->withInput();
//        }

//        $note = Note::create([
//            'title_note' => $request->input('note_title'),
//            'description' => $request->input('note_desc'),
//            'user_id' => auth()->id(),
//           'note_color'=> $request->input('note_color'),

//        ]);

//        if ($request->hasFile('files')) {
//            foreach ($request->file('files') as $file) {
//                $filename = time() . '_' . $file->getClientOriginalName();
//                $path = $file->storeAs('files', $filename, 'public');

//                $fileModel = new File;
//                $fileModel->name_file = $filename;
//                $fileModel->chemin = $path;
//                $fileModel->type_file = $file->getClientMimeType();
//                $fileModel->taille = $file->getSize();
//                $fileModel->user_id = Auth::id();
//                $fileModel->id_note = $note->id_note;
//                $fileModel->save();
//            }
//        }

//        return redirect()->route('note.index');
//    }
//     public function edit(string $id_note)
//     {
//         $note=Note::with('files')->findOrFail($id_note);
//         return inertia('Profile/Notes/EditNote', ['note' => $note]);

//     }
//    public function update(Request $request, string $id_note)
//    {
//        $note = Note::findOrFail($id_note);

//        $rules = [
//            'note_title' => 'nullable|string',
//            'note_desc' => 'nullable|string',
//            'files.*' => 'nullable|file|max:2048',
//            'note_color' => 'required|string',

//        ];

//        $validator = Validator::make($request->all(), $rules);
//        if ($validator->fails()) {
//            return back()->withErrors($validator)->withInput();
//        }

//        $note->update([
//            'title_note' => $request->input('note_title'),
//            'description' => $request->input('note_desc'),
//            'note_color'=> $request->input('note_color'),

//        ]);

//        if ($request->hasFile('files')) {
//            foreach ($request->file('files') as $file) {
//                $filename = time() . '_' . $file->getClientOriginalName();
//                $path = $file->storeAs('files', $filename, 'public');

//                $fileModel = new File;
//                $fileModel->name_file = $filename;
//                $fileModel->chemin = $path;
//                $fileModel->type_file = $file->getClientMimeType();
//                $fileModel->taille = $file->getSize();
//                $fileModel->user_id = Auth::id();
//                $fileModel->id_note = $note->id_note;
//                $fileModel->save();
//            }
//        }

//        return redirect()->route('note.index');
//    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id_note)
    {
    $note = Note::find($id_note);
    // Check if the note exists and belongs to the authenticated user
    if ($note && $note->user_id == Auth::id()) {
           // Delete the note
           $note->delete();
           return redirect()->route('note.index');
    }
    return redirect()->route('note.index')->with('error', 'Note not found or you do not have permission to delete this note.');
    }

    public function deleteFile(string $id_note, string $id_file)
    {
        $note = Note::find($id_note);
        $file = $note->files()->find($id_file);
        // Delete the file from storage
        Storage::delete($file->chemin);
        // Remove the file association from the note
         $file->delete();
    }

    public function pin($id_note)
{
    $note = Note::find($id_note);
    if ($note->user_id === auth()->id()) {
        $note->is_pinned = !$note->is_pinned;
        $note->save();
    }
    return redirect()->route('note.index');
}

}




