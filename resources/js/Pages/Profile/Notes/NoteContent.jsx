import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RiAddCircleLine, RiDeleteBin3Line, RiImage2Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import EditNote from './EditNote';
import './note.css';
import { faTrash, faEdit, faUpload, faThumbtack,faFileAlt } from '@fortawesome/free-solid-svg-icons';

const NoteContent = ({ notes }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [values, setValues] = useState({
        note_title: "",
        note_desc: "",
        files: [],
    });
    const fileInputRef = useRef(null);

    const handleNoteChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        const updatedValues = { ...values, [key]: value };
        setValues(updatedValues);
    };

    const handleFileChange = (e) => {
        setValues(prevValues => ({
            ...prevValues,
            files: [...prevValues.files, ...e.target.files],
        }));
    };

    const handleNoteAdd = (e) => {
        e.preventDefault();
        if (values.note_title.trim() !== '' || values.note_desc.trim() !== '' || values.files.length > 0) {
            const formData = new FormData();
            formData.append('note_title', values.note_title);
            formData.append('note_desc', values.note_desc);
            values.files.forEach(file => {
                formData.append('files[]', file);
            });

            router.post('/add', formData);
            setValues({
                note_title: '',
                note_desc: '',
                files: [],
            });
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = (noteId) => {
        router.delete(`/note/${noteId}`);
    };

    const handleEditClick = (note) => {
        setEditingNote(note);
        setShowEditModal(true);
    };

    const handleEditSubmit = (updatedNote) => {
        router.post('/note/' + updatedNote.id, updatedNote);
        setShowEditModal(false);
    };

    const handleDeleteFile = (id_file, id_note) => {
        router.delete(`/note/${id_note}/file/${id_file}`);
    };

    const handlePinNote = (noteId) => {
        router.post(`/note/pin/${noteId}`);
    };

    // Check if there are any pinned notes
    const pinnedNotes = notes.filter(note => note.is_pinned);

    return (
        <div>
            <form onSubmit={handleNoteAdd} className='note_form_title_descreption'>
                <div className='input_note_'>
                    <input type='text' id='note_title'
                        className='input_create_note_title'
                        value={values.note_title}
                        placeholder='title...'
                        onChange={handleNoteChange}
                    />
                    <input type='text' id='note_desc'
                        className='input_create_note_desc'
                        value={values.note_desc}
                        placeholder='description...'
                        onChange={handleNoteChange}
                    />
                    <input type='file' ref={fileInputRef} className='file-input'
                        id='file' onChange={handleFileChange} multiple />
                    <label htmlFor='file' className='upload-icon' style={{ fontSize: '25px' }}>
                        <span title='add a file'>
                            <RiImage2Line className="react-icon icon-upload" />
                        </span>
                    </label>
                    <button type='submit' className='submit-button' style={{ fontSize: '25px' }}>
                        <span title='add the note'>
                            <RiAddCircleLine className="react-icon" style={{ color: 'gray' }} />
                        </span>
                    </button>
                </div>
            </form>

            {pinnedNotes.length > 0 && (
                <>
                    <h2>Les notes épinglées</h2>
                    <div className='notes-grid'>
                        {pinnedNotes.map((note, index) => (
                            <div key={index} className='note-item'>
                                <div className='note-content'>
                                    <h1>{note.title_note}</h1>
                                    <p>{note.description}</p>
                                </div>
                                {note.files.length > 0 && (
                                    <div className="note-image-container">
                                        {note.files.map((file, index) => (
                                            <div key={index} className="note-image-wrapper">
                                                {file.type_file.startsWith('image/') ? (
                                                    <img src={`/storage/${file.chemin}`} alt="File" className='note-image' />
                                                ) : (
                                                    <div className='fileContent'>
                                                        <a href={`/storage/${file.chemin}`} download={file.name_file}>
                                                            <FontAwesomeIcon icon={faFileAlt} size="2x" />
                                                        </a>
                                                    </div>
                                                )}
                                                <button className='delete-file' onClick={() => handleDeleteFile(file.id_file, note.id_note)}>
                                                 <FontAwesomeIcon icon={faTrash} size="25" style={{ color: 'gray' }} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="note-actions">
                                    <button onClick={() => handleEditClick(note)} style={{ fontSize: '20px' }}>
                                        <span title='Edit the note'>
                                            <BiEditAlt className="icon-edit" />
                                        </span>
                                    </button>
                                    <button onClick={() => handleDelete(note.id_note)} style={{ fontSize: '20px' }}>
                                        <span title='Delete the note'>
                                            <RiDeleteBin3Line className="icon-delete" />
                                        </span>
                                    </button>
                                    <button onClick={() => handlePinNote(note.id_note)} style={{ fontSize: '20px' }}>
                                        <span title='Pin the note'>
                                          <FontAwesomeIcon icon={faThumbtack} style={{ color: note.is_pinned ? 'red' : 'gray' }} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <h2>All Notes</h2>
            <div className='notes-grid'>
                {notes.filter(note => !note.is_pinned).map((note, index) => (
                    <div key={index} className='note-item'>
                        <div className='note-content'>
                            <h1>{note.title_note}</h1>
                            <p>{note.description}</p>
                        </div>
                        {note.files.length > 0 && (
                            <div className="note-image-container">
                                {note.files.map((file, index) => (
                                    <div key={index} className="note-image-wrapper">
                                        {file.type_file.startsWith('image/') ? (
                                            <img src={`/storage/${file.chemin}`} alt="File" className='note-image' />
                                        ) : (
                                            <div className='fileContent'>
                                                <a href={`/storage/${file.chemin}`} download={file.name_file}>
                                                    <FontAwesomeIcon icon={faFileAlt} size="2x" />
                                                </a>
                                            </div>
                                        )}
                                        <button className='delete-file' onClick={() => handleDeleteFile(file.id_file, note.id_note)}>
                                         <FontAwesomeIcon icon={faTrash} size="25" style={{ color: 'gray' }} />

                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="note-actions">
                            <button onClick={() => handleEditClick(note)} style={{ fontSize: '20px' }}>
                                <span title='Edit the note'>
                                    <BiEditAlt className="icon-edit" />
                                </span>
                            </button>
                            <button onClick={() => handleDelete(note.id_note)} style={{ fontSize: '20px' }}>
                                <span title='Delete the note'>
                                    <RiDeleteBin3Line className="icon-delete" />
                                </span>
                            </button>
                            <button onClick={() => handlePinNote(note.id_note)} style={{ fontSize: '20px' }}>
                                <span title='Pin the note'>
                                    <FontAwesomeIcon icon={faThumbtack} className={note.is_pinned ? 'icon-pin' : 'icon-upload'} />
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showEditModal && <EditNote note={editingNote} onClose={() => setShowEditModal(false)} onSubmit={handleEditSubmit} />}
        </div>
    );
};

export default NoteContent;


// ////////////////////----the new/////
// import React, { useState, useRef } from 'react';
// import { router } from '@inertiajs/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit, faUpload, faThumbtack,faFileAlt } from '@fortawesome/free-solid-svg-icons';
// import { RiAddCircleLine, RiDeleteBin3Line, RiImage2Line } from "react-icons/ri";
// import { BiEditAlt } from "react-icons/bi";
// import EditNote from './EditNote';
// import './note.css';

// const NoteContent = ({ notes }) => {
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [editingNote, setEditingNote] = useState(null);
//     const [isValid, setIsValid] = useState(false);
//     const [values, setValues] = useState({
//         note_title: "",
//         note_desc: "",
//         files: [],
//     });
//     const fileInputRef = useRef(null);

//     const handleNoteChange = (e) => {
//         const key = e.target.id;
//         const value = e.target.value;
//         const updatedValues = { ...values, [key]: value };
//         setValues(updatedValues);
//     };

//     const handleFileChange = (e) => {
//         setValues(prevValues => ({
//             ...prevValues,
//             files: [...prevValues.files, ...e.target.files],
//         }));
//     };

//     const handleNoteAdd = (e) => {
//         e.preventDefault();
//         if (values.note_title.trim() !== '' || values.note_desc.trim() !== '' || values.files.length > 0) {
//             const formData = new FormData();
//             formData.append('note_title', values.note_title);
//             formData.append('note_desc', values.note_desc);
//             values.files.forEach(file => {
//                 formData.append('files[]', file);
//             });

//             router.post('/add', formData);
//             setValues({
//                 note_title: '',
//                 note_desc: '',
//                 files: [],
//             });
//             if (fileInputRef.current) fileInputRef.current.value = '';
//             setIsValid(false);
//         }
//     };

//     const handleDelete = (noteId) => {
//         router.delete(`/note/${noteId}`);
//     };

//     const handleEditClick = (note) => {
//         setEditingNote(note);
//         setShowEditModal(true);
//     };

//     const handleEditSubmit = (updatedNote) => {
//         router.post('/note/' + updatedNote.id, updatedNote);
//         setShowEditModal(false);
//     };

//     const handleDeleteFile = (id_file, id_note) => {
//         router.delete(`/note/${id_note}/file/${id_file}`);
//     };

//     const handlePinNote = (noteId) => {
//         router.post(`/note/pin/${noteId}`);
//     };

//     // Check if there are any pinned notes
//     const pinnedNotes = notes.filter(note => note.is_pinned);

//     return (
//         <div>
//             <form onSubmit={handleNoteAdd} className='note_form_title_descreption'>
//                 <div className='input_note_'>
//                     <input type='text' id='note_title'
//                         className='input_create_note_title'
//                         value={values.note_title}
//                         placeholder='title...'
//                         onChange={handleNoteChange}
//                     />
//                     <input type='text' id='note_desc'
//                         className='input_create_note_desc'
//                         value={values.note_desc}
//                         placeholder='description...'
//                         onChange={handleNoteChange}
//                     />
//                     <input type='file' ref={fileInputRef} className='file-input'
//                         id='file' onChange={handleFileChange} multiple />
//                     <label htmlFor='file' className='upload-icon' style={{ fontSize: '25px' }}>
//                         <span title='add a file'>
//                             <RiImage2Line className="react-icon" style={{ color: 'gray' }} />
//                         </span>
//                     </label>
//                     <button type='submit' className='submit-button' style={{ fontSize: '25px' }}>
//                         <span title='add the note'>
//                             <RiAddCircleLine className="react-icon" style={{ color: 'gray' }} />
//                         </span>
//                     </button>
//                 </div>
//             </form>

//             {pinnedNotes.length > 0 && (
//                 <>
//                     <h2>Les notes épinglées</h2>
//                     <div className='notes-grid'>
//                         {pinnedNotes.map((note, index) => (
//                             <div key={index} className='note-item'>
//                                 <div className='note-content'>
//                                     <h1>{note.title_note}</h1>
//                                     <p>{note.description}</p>
//                                 </div>
//                                 {note.files.length > 0 && (
//                                     <div className="note-image-container">
//                                         {note.files.map((file, index) => (
//                                             <div key={index} className="note-image-wrapper">
//                                                 {file.type_file.startsWith('image/') ? (
//                                                     <img src={`/storage/${file.chemin}`} alt="File" className='note-image' />
//                                                 ) : (
//                                                     <div className='fileContent'>
//                                                         <a href={`/storage/${file.chemin}`} download={file.name_file}>
//                                                             <FontAwesomeIcon icon={faFileAlt} size="2x" />
//                                                         </a>
//                                                     </div>
//                                                 )}
//                                                 <button className='delete-file' onClick={() => handleDeleteFile(file.id_file, note.id_note)}>
//                                                     <FontAwesomeIcon icon={faTrash} size="25" style={{ color: 'gray' }} />
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                                 <div className="note-actions">
//                                     <button onClick={() => handleEditClick(note)} style={{ fontSize: '20px' }}>
//                                         <span title='Edit the note'>
//                                             <BiEditAlt style={{ color: 'gray' }} />
//                                         </span>
//                                     </button>
//                                     <button onClick={() => handleDelete(note.id_note)} style={{ fontSize: '20px' }}>
//                                         <span title='Delete the note'>
//                                             <RiDeleteBin3Line style={{ color: 'gray' }} />
//                                         </span>
//                                     </button>
//                                     <button onClick={() => handlePinNote(note.id_note)} style={{ fontSize: '20px' }}>
//                                         <span title='Pin the note'>
//                                             <FontAwesomeIcon icon={faThumbtack} style={{ color: note.is_pinned ? 'red' : 'gray' }} />
//                                         </span>
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}

//             <h2>All Notes</h2>
//             <div className='notes-grid'>
//                 {notes.filter(note => !note.is_pinned).map((note, index) => (
//                     <div key={index} className='note-item'>
//                         <div className='note-content'>
//                             <h1>{note.title_note}</h1>
//                             <p>{note.description}</p>
//                         </div>
//                         {note.files.length > 0 && (
//                             <div className="note-image-container">
//                                 {note.files.map((file, index) => (
//                                     <div key={index} className="note-image-wrapper">
//                                         {file.type_file.startsWith('image/') ? (
//                                             <img src={`/storage/${file.chemin}`} alt="File" className='note-image' />
//                                         ) : (
//                                             <div className='fileContent'>
//                                                 <a href={`/storage/${file.chemin}`} download={file.name_file}>
//                                                     <FontAwesomeIcon icon={faFileAlt} size="2x" />
//                                                 </a>
//                                             </div>
//                                         )}
//                                         <button className='delete-file' onClick={() => handleDeleteFile(file.id_file, note.id_note)}>
//                                             <FontAwesomeIcon icon={faTrash} size="25" style={{ color: 'gray' }} />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                         <div className="note-actions">
//                             <button onClick={() => handleEditClick(note)} style={{ fontSize: '20px' }}>
//                                 <span title='Edit the note'>
//                                     <BiEditAlt style={{ color: 'gray' }} />
//                                 </span>
//                             </button>
//                             <button onClick={() => handleDelete(note.id_note)} style={{ fontSize: '20px' }}>
//                                 <span title='Delete the note'>
//                                     <RiDeleteBin3Line style={{ color: 'gray' }} />
//                                 </span>
//                             </button>
//                             <button onClick={() => handlePinNote(note.id_note)} style={{ fontSize: '20px' }}>
//                                 <span title='Pin the note'>
//                                     <FontAwesomeIcon icon={faThumbtack} style={{ color: note.is_pinned ? 'red' : 'gray' }} />
//                                 </span>
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {showEditModal && <EditNote note={editingNote} onClose={() => setShowEditModal(false)} onSubmit={handleEditSubmit} />}
//         </div>
//     );
// };

// export default NoteContent;
