import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import './note.css'
const NoteContent = ({ auth, data,cn,notes}) => {
    const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({
    note_title: "",
    note_desc: "",
})
  const handleNoteChange=(e)=>{
    const key = e.target.id;
    const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
        setIsValid(values.note_title.trim() !== '' && values.note_desc.trim() !== '');

  }
  const handleNoteAdd=(e)=>{
    e.preventDefault()
    if (values.note_title.trim() !== '' && values.note_desc.trim() !== ''){
    router.post('/add',values)
    setValues({
        note_title: '',
        note_desc: '',
      });
    }

  }
  const handleDelete = (noteId) => {
    console.log(`Delete note with ID: ${noteId}`);
    router.delete(`/note/${noteId}`)
 };

 const handleEdit = (noteId) => {
    console.log(`Edit note with ID: ${noteId}`);
    // Implement your edit logic here
 };


  return (
    <div>
     <form onSubmit={handleNoteAdd} className='note_form_title_descreption'>
     <div className='input_note_'>
        <input type='text' id='note_title'
          className='input_create_note'
          value={values.note_title}
          placeholder='title...'
          onChange={handleNoteChange}
          />
        <input type='text' id='note_desc'

          value={values.note_desc}
          placeholder='descreption'
          onChange={handleNoteChange}
          />
        <button >add</button>
      </div>
      <div className='notes-grid'>

        {notes.map((note,index)=>{
            return (<div key={index} className='note-item'>
                        <h1> {note.title_note}</h1>
                        <p>{note.description}</p>
                        <div className="note-actions">
                          <button onClick={() => handleEdit(note.id_note)}>
                                <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button onClick={() => handleDelete(note.id_note)}>
                                <FontAwesomeIcon icon={faTrash} />
                          </button>
                         </div>
                    </div>
                   );
        })}


      </div>
    </form>


    </div>
  )
}

export default NoteContent
