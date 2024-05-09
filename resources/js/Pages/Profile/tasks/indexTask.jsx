
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ListTask from './ListTask';
import './indextask.css';
import ModalEditTask from './ModalEditTask';

const IndexTask = ({ jobs }) => {
  const [formData, setFormData] = useState({
    title_job: '',
    date_job: '',
    tasks: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/job/store', formData);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      Inertia.delete(`/job/${id}`);
    }
  };

  return (
    <div>
      
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="title_job"
            name="title_job"
            placeholder='enter un titre ici .....'
            value={formData.title_job}
            onChange={handleChange}
            required
            className='text'
          /> <br /> <br />
          <ListTask formData={formData} setFormData={setFormData} />  <br />
          <input
            type="date"
            id="date_job"
            name="date_job"
            value={formData.date_job}
            onChange={handleChange}
            required
            className='date'
          /> <br /> <br />
          <button type="submit" className='button'>  <p className="submit">Add Work</p> </button>
        </form>
      </div>

      {/* submited form ---------- */}
      
      <div className="grid-container">
        {jobs.map(job => (
          <div className='job'>
          <ul key={job.id}>
            <li className='li'>
              <input type="text" className='titlejob' value={job.title_job} /> <br />
              <input type="date" className='datejob' value={job.date_job} />
              <ul className='tasks'>
                {job.tasks.map(task => (
                  
                  <li key={task.id}>
                    <input type="checkbox" checked={task.task_done} />
                    <input className='mapTask' type="text" value={task.title_task} />
                  </li>
                 
                ))}
              </ul>
    <button  onClick={() => handleDelete(job.id)}   className="btn-delete">
                   <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon">
                   <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                 </svg>
              </button>


              <ModalEditTask job={job} />
            </li>
          </ul>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default IndexTask;
