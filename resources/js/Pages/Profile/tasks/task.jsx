import React from 'react';
import { useState } from 'react';
import './listtask.css';

function Task({ task, toggleCompleted,setTaskChanged }) {
  // const [taskChanged,setTaskChanged]=useState(task.title_task)
 return (
    <div>
      <input className='checkTask'
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleted(task.id_task)}
      />  
        <input 
        type="text" className='textTask'
        value={task.title_task}
        onChange={() => setTaskChanged(task.title_task)}
      />  
    </div>
 );
}

export default Task;
