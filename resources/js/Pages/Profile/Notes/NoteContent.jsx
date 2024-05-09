import React, { useState,useRef } from 'react'
import {  router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFileImage, faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './note.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
import EditNote from './EditNote';
import { RiAddCircleLine ,RiDeleteBin3Line,RiImage2Line} from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BiEditAlt } from "react-icons/bi";
import getFileIcon from './FileIcons';import PermMediaTwoToneIcon from '@mui/icons-material/PermMediaTwoTone';
import FileIconSVG from './FileIconSVG';
const NoteContent = ({ notes}) => {
    const [showEditModal, setshowEditModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({
    note_title: "",
    note_desc: "",
    files:[],

});
  const fileInputRef = useRef(null);

  const handleNoteChange=(e)=>{
    const key = e.target.id;
    const value = e.target.value
    // Create a new object with the updated values
    const updatedValues = {
        ...values,
        [key]: value,
    };
    setValues(updatedValues);
  }

//---------if one file ----------//
//   const handleFileChange=(e)=>{
//     setValues(prevValues=>({
//         ...prevValues,
//         file:e.target.files[0],
//     }));
// };
const handleFileChange = (e) => {
    setValues(prevValues => ({
        ...prevValues,
        files: [...prevValues.files, ...e.target.files], // Append to the existing files array
    }));
};


//////-----BEFORE----///
  const handleNoteAdd=(e)=>{
    e.preventDefault()
    if (values.note_title.trim() !== '' || values.note_desc.trim() !== '' || values.files.length >0) {
        const formData = new FormData();
        formData.append('note_title', values.note_title);
        formData.append('note_desc', values.note_desc);
        values.files.forEach(file => {
            formData.append('files[]', file);
        });

       router.post('/add',formData)
       console.log("Submitting form data...");
       setValues({
            note_title: '',
            note_desc: '',
            files:[],
       });
       if (fileInputRef.current) fileInputRef.current.value = ''; // Reset the file input
       // Reset isValid state after submission
       setIsValid(false)
    }
  }


  const handleDelete = (noteId) => {
    console.log(`Delete note with ID: ${noteId}`);
    router.delete(`/note/${noteId}`)
 };

const handleEditClick=(note)=>{
    setEditingNote(note);
    setshowEditModal(true)
}
const handleEditSubmit=(updatedNote)=>{
    router.post('/note/' + updatedNote.id, updatedNote, {
        onSuccess: (page) => {
            console.log("Note updated successfully");
        },
        onError: (errors) => {
            console.log("Error updating note:", errors);
        }
    });
    setshowEditModal(false); // Close the modal after submission


}
const handleDeleteFile=(id_file,id_note)=>{
    router.delete(`/note/${id_note}/file/${id_file}`)

}

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
          placeholder='descreption...'
          onChange={handleNoteChange}
          />
        <input type='file' ref={fileInputRef} className='file-input'
        id='file' onChange={handleFileChange} multiple />
        <label htmlFor='file' className='upload-icon' style={{ fontSize: '25px' }}>
           <span title='add a file'>
              <RiImage2Line  className="react-icon"  style={{ color: 'gray' }} />
            </span>
        </label>
        <button type='submit' className='submit-button' style={{ fontSize: '25px' }}>
            <span title='add the note'>
            <RiAddCircleLine  className="react-icon" style={{ color: 'gray' }}/>
            </span>
        </button>
      </div>
      </form>

      <div className='notes-grid'>

        {[...notes].reverse().map((note,index)=>{
            return (<div key={index} className='note-item'>
                        <div className='note-content'>
                        <h1 > {note.title_note}</h1>
                        <p>{note.description}</p>
                        </div>
                        {/* Display the file if it exists */}
                        {note.files.length >0 && (

                            <div className="note-image-container">
                            {note.files.map((file, index) => (
                                <div key={index} className="note-image-wrapper" >
                                    {file.type_file.startsWith('image/') ? (
                                        <img src={`/storage/${file.chemin}`} alt="File" className='note-image' />
                                    ) : (
                                        <div className='fileContent'>
                                        <a href={`/storage/${file.chemin}`} download={file.name_file}>
                                        <FileIconSVG  width="50" height="50" /> </a>
                                        </div>
                                    )}
                                    <button  className='delete-file'   onClick={() => handleDeleteFile(file.id_file,note.id_note)}>
                                                <FontAwesomeIcon icon={faTrash} size={25} style={{ color: 'gray' }} />
                                    </button>
                                </div>
                            ))}
                            </div>


                         )}
                        <div className="note-actions">
                          <button  onClick={() => handleEditClick(note)} style={{ fontSize: '20px' }}>
                            <span title='Edit the note'>
                                <BiEditAlt   style={{ color: 'gray' }}/>
                            </span>
                          </button>
                          <button onClick={() => handleDelete(note.id_note)} style={{ fontSize: '20px' }}>
                            <span title='delete the note'>
                                <RiDeleteBin3Line  style={{ color: 'gray' }} />
                            </span>
                          </button>
                         </div>



                    </div>
                   );

        })}
        {showEditModal && <EditNote
                            note={editingNote}
                             onClose={() => setshowEditModal(false)}
                             onSubmit={handleEditSubmit} />}


      </div>



    </div>
  )
}

export default NoteContent




// import React, { useState,useRef } from 'react'
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Inertia } from '@inertiajs/inertia';
// import { Head, router } from '@inertiajs/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { InertiaLink } from '@inertiajs/inertia-react';
// import { faFileImage, faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faFileAlt } from '@fortawesome/free-solid-svg-icons';
// import './note.css';
// import EditNote from './EditNote';

// const NoteContent = ({ auth, data,notes,note}) => {
//     const [showEditModal, setshowEditModal] = useState(false);
//     const [editingNote, setEditingNote] = useState(null);
//   const [isValid, setIsValid] = useState(false);
//   const [values, setValues] = useState({
//     note_title: "",
//     note_desc: "",
//     file:null,

// });
//   const fileInputRef = useRef(null);

//   const handleNoteChange=(e)=>{
//     const key = e.target.id;
//     const value = e.target.value
//     // Create a new object with the updated values
//     const updatedValues = {
//         ...values,
//         [key]: value,
//     };
//     setValues(updatedValues);
//   }

// //---------if one file ----------//
//   const handleFileChange=(e)=>{
//     setValues(prevValues=>({
//         ...prevValues,
//         file:e.target.files[0],
//     }));
// };



// //////-----BEFORE----///
//   const handleNoteAdd=(e)=>{
//     e.preventDefault()
//     if (values.note_title.trim() !== '' || values.note_desc.trim() !== '' || values.file !== null) {
//         const formData = new FormData();
//       Object.keys(values).forEach(key => {
//         formData.append(key, values[key]);
//       });
//        router.post('/add',formData)
//        console.log("Submitting form data...");
//        setValues({
//             note_title: '',
//             note_desc: '',
//             file:null,
//        });
//        if (fileInputRef.current) fileInputRef.current.value = ''; // Reset the file input

//        // Reset isValid state after submission
//        setIsValid(false)
//     }
//   }


//   const handleDelete = (noteId) => {
//     console.log(`Delete note with ID: ${noteId}`);
//     router.delete(`/note/${noteId}`)
//  };

// const handleEditClick=(note)=>{
//     setEditingNote(note);
//     setshowEditModal(true)
// }
// const handleEditSubmit=(updatedNote)=>{
//     router.post('/note/' + updatedNote.id, updatedNote, {
//         onSuccess: (page) => {
//             console.log("Note updated successfully");
//         },
//         onError: (errors) => {
//             console.log("Error updating note:", errors);
//         }
//     });

// }



// const getFileIcon = (fileType) => {
//     switch (fileType) {
//         case 'image/jpeg':
//         case 'image/png':
//         case 'image/gif':
//             return <FontAwesomeIcon icon={faFileImage} style={{ color: 'blue' }} />;
//         case 'application/pdf':
//             return <FontAwesomeIcon icon={faFilePdf} style={{ color: 'red' }} />;
//         case 'application/msword':
//         case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//             return <FontAwesomeIcon icon={faFileWord} style={{ color: 'green' }} />;
//         case 'application/vnd.ms-excel':
//         case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
//             return <FontAwesomeIcon icon={faFileExcel} style={{ color: 'orange' }} />;
//         case 'application/vnd.ms-powerpoint':
//         case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
//             return <FontAwesomeIcon icon={faFilePowerpoint} style={{ color: 'purple' }} />;
//         default:
//             return <FontAwesomeIcon icon={faFileAlt} style={{ color: 'black' }} />;
//     }
// };
// const [openModal, setOpenModal] = useState(true);
// const [email, setEmail] = useState('');

// function onCloseModal() {
//   setOpenModal(false);
//   setEmail('');
// }

// const handleEditAndOpenModal = (note) => {
//     setOpenModal(true);
//     handleEditClick(note);
// };


//   return (
//     <div>

//      <form onSubmit={handleNoteAdd} className='note_form_title_descreption'>
//      <div className='input_note_'>
//         <input type='text' id='note_title'
//           className='input_create_note'
//           value={values.note_title}
//           placeholder='title...'
//           onChange={handleNoteChange}
//           />
//         <input type='text' id='note_desc'

//           value={values.note_desc}
//           placeholder='descreption...'
//           onChange={handleNoteChange}
//           />
//         <input type='file' ref={fileInputRef}
//         id='file' onChange={handleFileChange} multiple />
//         <button type='submit' >add a note</button>
//       </div>

//       <div className='notes-grid'>

//         {[...notes].reverse().map((note,index)=>{
//             return (<div key={index} className='note-item'>
//                         <h1> {note.title_note}</h1>
//                         <p>{note.description}</p>
//                         {/* Display the file if it exists */}
//                         {note.files.length >0 && (

//                             <div>
//                             {note.files.map((file, index) => (
//                                 <div key={index}>
//                                     {file.type_file.startsWith('image/') ? (
//                                         <img src={`/storage/${file.chemin}`} alt="File" className='note-image' />
//                                     ) : (
//                                         <a href={`/storage/${file.chemin}`} download={file.name_file}>
//                                         {getFileIcon(file.type_file)}                                    </a>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>


//                          )}
//                         <div className="note-actions">
//                           <button  onClick={() => handleEditAndOpenModal(note)} >
//                                 <FontAwesomeIcon icon={faEdit} />
//                           </button>
//                           <button onClick={() => handleDelete(note.id_note)}>
//                                 <FontAwesomeIcon icon={faTrash} />
//                           </button>
//                          </div>



//                     </div>
//                    );

//         })}
//         {showEditModal && <EditNote
//                             note={editingNote}
//                              onClose={() => setshowEditModal(false)}
//                              onSubmit={handleEditSubmit} />}


//       </div>
//     </form>


//     </div>
//   )
// }

// export default NoteContent

