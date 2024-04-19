import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, router } from '@inertiajs/react';

const NoteContent = ({ auth, data,cn,notes}) => {

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
  }
  const handleNoteAdd=(e)=>{
    e.preventDefault()
    router.post('/add',values)
    setValues({
        note_title: '',
        note_desc: '',
      });


  }


  return (
    <div>
     <form onSubmit={handleNoteAdd}>
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
      <div>
      <ul>
        {notes.map((note,index)=>{
            return <li key={index}>{note.title_note} {note.description}</li>
        })}
      </ul>

      </div>
    </form>
      <div>

            {cn}

      </div>

    </div>
  )
}

export default NoteContent
