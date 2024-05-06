import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ListTask from './ListTask';
import './modal.css';
import { CiEdit } from "react-icons/ci";
import { MdFileDownloadDone } from "react-icons/md";

function ModalEditTask({ job }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title_job: job.title_job,
    date_job: job.date_job,
    tasks: job.tasks.map((task) => ({
      id: task.id,
      title_task: task.title_task,
      task_done: task.task_done,
    })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (modalOpen) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(`/job/${job.id}`, formData);
    toggleModal();
  };

  return (
    <>
      <button onClick={toggleModal} className='btn-modal'>
      <CiEdit />
      </button>
      {modalOpen && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal}></div>
          <div className='modal-content'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                id='title_job'
                name='title_job'
                value={formData.title_job}
                onChange={handleChange}
                required
                className='text'
              />{' '}
              <br /> <br />
              <ListTask formData={formData} setFormData={setFormData} /> <br />
              <input
                type='date'
                id='date_job'
                name='date_job'
                value={formData.date_job}
                onChange={handleChange}
                required
                className='date'
              />{' '}
              <br /> <br />
              <button type='submit' className='close-modal'>
              <MdFileDownloadDone />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalEditTask;
