import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, router } from '@inertiajs/react';
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
        setIsValid(value.trim() !== '');
  }
  const handleNoteAdd=(e)=>{
    e.preventDefault()
    if (isValid){
    router.post('/add',values)
    setValues({
        note_title: '',
        note_desc: '',
      });
    }

  }


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
                    </div>
                   );
        })}


      </div>
    </form>


    </div>
  )
}

export default NoteContent
