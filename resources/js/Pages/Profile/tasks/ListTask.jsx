import React, { useState } from 'react';
import Task from './Task';
import './listtask.css';
import { CgAdd } from "react-icons/cg";

const ListTask = ({ formData, setFormData }) => {
  const [text, setText] = useState('');

  const addTask = () => {
    if (text.trim() !== '') {
      const newTask = {
        title_task: text,
        task_done: false,
      };

      setFormData({
        ...formData,
        tasks: [...formData.tasks, newTask],
      });

      setText('');
    }
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...formData.tasks];
    updatedTasks[index].task_done = !updatedTasks[index].task_done;




    setFormData({
      ...formData,
      tasks: updatedTasks,
    });
  };

  const setTaskChanged= (index, newTitle) => {
  const updatedTasks = [...formData.tasks];
  updatedTasks[index].title_task = newTitle;
 
  setFormData({
    ...formData,
    tasks: updatedTasks,
  });
}


  return (
    <div className="task-list">
     

      {formData.tasks.map((task, index) => (
        <div key={index}  className='spaceTask'>
        <Task
          
           task={task}
          toggleCompleted={() => toggleCompleted(index)}
         setTaskChanged={()=>setTaskChanged(index)}
        />
        </div>
      ))}

    <input type="checkbox"/>  

  

  
           <input className="text" type="text"  value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a task..." />
           
           


      <button type="button" onClick={addTask} className='icon-add'>
      <CgAdd />
      </button>
    </div>
  );
};

export default ListTask;
