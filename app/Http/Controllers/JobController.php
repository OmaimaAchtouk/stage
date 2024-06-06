<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use Inertia\Inertia;
use App\Models\Task;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $jobs = Job::all();
        $jobs = Job::with('tasks')->get();


        // $submittedJobs = Job::where('user_id', auth()->id())->with('tasks')->get();

        return Inertia::render('Profile/tasks/tasksE', [
            'jobs' => $jobs,
            // 'submittedJobs' => $submittedJobs,

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
        $request->validate([
            'title_job' => 'required|string',
            'date_job' => 'required|date',
            'tasks' => 'array',
            'tasks.*.title_task' => 'required|string',
            'tasks.*.task_done' => 'boolean',
        ]);

        $job = Job::create([
            'title_job' => $request->title_job,
            'date_job' => $request->date_job,
            'user_id' => auth()->id(),
        ]);

        foreach ($request->tasks as $taskData) {
            $job->tasks()->create([
                'title_task' => $taskData['title_task'],
                'task_done' => $taskData['task_done'] ?? false,
            ]);
        }

        return redirect()->back();
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
     */public function update(Request $request, string $id)
{
    $request->validate([
        'title_job' => 'required|string',
        'date_job' => 'required|date',
        'tasks' => 'array',
        'tasks.*.title_task' => 'required|string',
        'tasks.*.task_done' => 'boolean',
    ]);

    $job = Job::findOrFail($id);
    $job->update([
        'title_job' => $request->title_job,
        'date_job' => $request->date_job,
    ]);

    foreach ($request->tasks as $taskData) {
        if (isset($taskData['id'])) {
            // Update existing task
            $task = $job->tasks()->findOrFail($taskData['id']);
            $task->update([
                'title_task' => $taskData['title_task'],
                'task_done' => $taskData['task_done'] ?? false,
            ]);
        } else {
            // Create new task
            $job->tasks()->create([
                'title_task' => $taskData['title_task'],
                'task_done' => $taskData['task_done'] ?? false,
            ]);
        }
    }

    return redirect()->back();
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $job = Job::findOrFail($id);
        $job->delete();

        return redirect()->back();
    }

}
