<?php

namespace App\Http\Controllers;

use App\Models\Task;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   

   

    public function index()
        {
            $tasks = Task::all();
            return Inertia::render('Profile/tasks/ListTask', [
                'tasks' => $tasks
            ]);
        }
     

    
    

    public function toggle(Task $tasks)
    {
    $tasks->update(['task_done' => !$tasks->task_done]);
    return redirect()->route('task.index');
    }


    
public function create()
{
    // return Inertia::render('Profile/tasks/createTask');
    
}

    
public function store(Request $request)
{
    // 
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
    
    // public function destroyTask(string $taskId)
    // {
    //     $task = Task::findOrFail($taskId);
    //     $task->delete();

    //     return redirect()->back();
    // }

}
