<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\NoteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/





Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('note', [NoteController::class, 'index'])->name('note.index');
    Route::post('add', [NoteController::class, 'store'])->name('note.store');
    Route::delete('/note/{id_note}', [NoteController::class, 'destroy'])->name('note.destroy');
    Route::get('/note/edit/{id_note}', [NoteController::class, 'edit'])->name('note.edit');
    Route::post('/note/{id_note}', [NoteController::class, 'update'])->name('note.update');
    Route::delete('/note/{id_note}/file/{id_file}', [NoteController::class, 'deleteFile'])->name('note.deleteFile');
    Route::post('/note/pin/{id_note}', [NoteController::class, 'pin'])->name('note.pin');


    Route::post('/profile/add', [ProfileController::class, 'add'])->name('profile.add');
    Route::get('/profile/test', [ProfileController::class, 'test'])->name('profile.test');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');




      //  create tasks route

      Route::get('/job', [JobController::class, 'index'])->name('job.index');
      Route::post('/job/store', [JobController::class, 'store'])->name('job.store');
      Route::delete('/job/{id}', [JobController::class, 'destroy'])->name('job.destroy');
      Route::put('/job/{id}', [JobController::class, 'update'])->name('job.update');

      //
      Route::get('/events', [EventController::class, 'index'])->name('events.index');
    //   Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
      Route::post('/events', [EventController::class, 'store'])->name('events.store');
//


// routes/web.php



// Route::get('/events/date/{date}', [EventController::class, 'eventsByDate'])->name('events.date');








});



require __DIR__.'/auth.php';
