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

////----with search----//
     public function index(Request $request)
     {
         $searchQuery = $request->input('search');

         $notes = Note::with('files');

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


//-------store before---------//
    // public function store(Request $request)
    // {
    //     if ($request->hasFile('file')){
    //         $rules = [
    //             'note_title' => 'nullable|string',
    //             'note_desc' => 'nullable|string',
    //             'file'=>'nullable|image|mimes:jpeg,jpg,png,gif,svg|max:2048',
    //         ];
    //     } else {
    //         $rules = [
    //             'note_title' => 'nullable|string',
    //             'note_desc' => 'nullable|string',
    //         ];
    //     }


    //     // Validate the request data
    //     $validator = Validator::make($request->all(), $rules);
    //     $validator->after(function ($validator) use ($request) {
    //         if (!$request->has('note_title') && !$request->has('note_desc') && !$request->hasFile('file')) {
    //             $validator->errors()->add('note_title', 'At least one field is required.');
    //         }
    //     });
    //     if ($validator->fails()) {
    //         return back()->withErrors($validator)->withInput();
    //     }

    //     //create a note
    //     $note=Note::create([
    //         'title_note' => $request->input('note_title'),
    //         'description' => $request->input('note_desc'),
    //         'user_id'=>auth()->id(),

    //     ]);
    //     // Handle file upload if a file was provided
    //     if ($request->hasFile('file')) {
    //         $file = $request->file('file');
    //         $filename = time() . '_' . $file->getClientOriginalName();
    //         $path = $file->storeAs('files', $filename, 'public');

    //         // Create a new File model instance and associate it with the note
    //         $fileModel = new File;
    //         $fileModel->name_file = $filename;
    //         $fileModel->chemin = $path;
    //         $fileModel->type_file = $file->getClientMimeType();
    //         $fileModel->taille = $file->getSize();
    //         $fileModel->user_id = Auth::id();
    //         $fileModel->id_note = $note->id_note;
    //         $fileModel->save();
    //     }
    //     return to_route('note.index');
    // }

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
        ///////---------before/////
// public function update(Request $request, string $id_note)
// {
//     $note = Note::findOrFail($id_note);

//     $rules = [
//         'note_title' => 'nullable|string',
//         'note_desc' => 'nullable|string',
//         'files.*' => 'nullable|file|max:2048',
//     ];

//     $validator = Validator::make($request->all(), $rules);
//     if ($validator->fails()) {
//         return back()->withErrors($validator)->withInput();
//     }

//     $note->update([
//         'title_note' => $request->input('note_title'),
//         'description' => $request->input('note_desc'),
//     ]);

//     // Fetch the file associated with the note
//     $fileModel = File::where('id_note', $note->id_note)->first();

//     // If a file is uploaded, handle the update
//     if ($request->hasFile('file')) {
//         $file = $request->file('file');
//         $filename = time() . '_' . $file->getClientOriginalName();
//         $path = $file->storeAs('files', $filename, 'public');

//         // Correctly delete the existing file using the stored path if it exists
//         if ($fileModel && $fileModel->chemin) {
//             Storage::disk('public')->delete($fileModel->chemin);
//         }

//         // Update or create the File model with the new file information
//         if ($fileModel) {
//             $fileModel->update([
//                 'name_file' => $filename,
//                 'chemin' => $path,
//                 'type_file' => $file->getClientMimeType(),
//                 'taille' => $file->getSize(),
//             ]);
//         } else {
//             $fileModel = new File;
//             $fileModel->name_file = $filename;
//             $fileModel->chemin = $path;
//             $fileModel->type_file = $file->getClientMimeType();
//             $fileModel->taille = $file->getSize();
//             $fileModel->user_id = Auth::id();
//             $fileModel->id_note = $note->id_note;
//             $fileModel->save();
//         }
//     }

//     return redirect()->route('note.index');
// }

public function update(Request $request, string $id_note)
{
    $note = Note::findOrFail($id_note);

    $rules = [
        'note_title' => 'nullable|string',
        'note_desc' => 'nullable|string',
        'files.*' => 'nullable|file|max:2048', // Allow multiple files
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



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id_note)
    {
    // Find the note by its ID
    $note = Note::find($id_note);
    // Check if the note exists and belongs to the authenticated user
    if ($note && $note->user_id == Auth::id()) {
           // Delete the note
           $note->delete();
            // If the note has associated files, delete them as well

           // Redirect back to the notes index page
           return redirect()->route('note.index');
    }

    // If the note does not exist or does not belong to the authenticated user, redirect with an error message
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


}




