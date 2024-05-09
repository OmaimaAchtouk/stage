
import React from 'react';
import { useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { Head, router } from '@inertiajs/react';
import { Button, Modal, TextInput } from "flowbite-react";
import './note.css'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { RiAddCircleLine ,RiDeleteBin3Line,RiImage2Line} from "react-icons/ri";


const EditNote = ({ note, onClose,onSubmit }) => {
    const [values, setValues] = useState({
        note_title: note.title_note,
        note_desc: note.description,
        files:[],
    });
    const fileInputRef = useRef(null);

    // const handleFileChange = (e) => {
    //     setValues(prevValues => ({
    //         ...prevValues,
    //         file: e.target.files[0],
    //     }));
    // };
    const handleFileChange = (e) => {
        // Append new files to the existing files array
        setValues(prevValues => ({
            ...prevValues,
            files: [...prevValues.files, ...e.target.files],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {

        const updatedNote = {
            id: note.id_note,
            note_title: values.note_title,
            note_desc: values.note_desc,
            files: values.files,
        };
        if (fileInputRef.current) fileInputRef.current.value = ''; // Reset the file input
        onSubmit(updatedNote);
        onClose();
    };






    return (
        <Modal show={true}  onClose={onClose} popup className='modal-view '  >
        <div className='modal-container'>
        <div  className='modal-content'>
        <Modal.Header />

        <Modal.Body>
            <input  className='input-update'   type="text" name="note_title" value={values.note_title} onChange={handleChange} placeholder="Title" /><br/>
            <input className='input-update' type='text' name="note_desc" value={values.note_desc} onChange={handleChange} placeholder="Description" />
            <input   className='file-input' type="file" id="fileInput" name="files" ref={fileInputRef} onChange={handleFileChange} multiple />
            <div className="file-upload-container">

            <label  htmlFor="fileInput" style={{ fontSize: '25px' }}>
            <span title='add files'>
            <RiImage2Line    />
            </span>
           </label>
           <button  className='btn_update'   onClick={handleSubmit} type="button">
                 <span title='update'>
                    Update
                 </span>
          </button>
           </div>

        </Modal.Body>
        </div>
        </div>
    </Modal>



    );
};


export default EditNote

// import React from 'react';
// import { useState,useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes} from '@fortawesome/free-solid-svg-icons';
// import { Head, router } from '@inertiajs/react';
// import { Button, Modal, TextInput } from "flowbite-react";



// const EditNote = ({ note, onClose,onSubmit }) => {
//     const [values, setValues] = useState({
//         note_title: note.title_note,
//         note_desc: note.description,
//         files:[],
//     });
//     const fileInputRef = useRef(null);

//     // const handleFileChange = (e) => {
//     //     setValues(prevValues => ({
//     //         ...prevValues,
//     //         file: e.target.files[0],
//     //     }));
//     // };
//     const handleFileChange = (e) => {
//         // Append new files to the existing files array
//         setValues(prevValues => ({
//             ...prevValues,
//             files: [...prevValues.files, ...e.target.files],
//         }));
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setValues({ ...values, [name]: value });
//     };

//     const handleSubmit = () => {

//         const updatedNote = {
//             id: note.id_note,
//             note_title: values.note_title,
//             note_desc: values.note_desc,
//             files: values.files,
//         };
//         if (fileInputRef.current) fileInputRef.current.value = ''; // Reset the file input
//         onSubmit(updatedNote);
//         onClose();
//     };






//     return (
//         <Modal show={true}  onClose={onClose} popup  style={{ }}>
//         <Modal.Header />

//         <Modal.Body>
//             <TextInput type="text" name="note_title" value={values.note_title} onChange={handleChange} placeholder="Title" />
//             <TextInput type='text' name="note_desc" value={values.note_desc} onChange={handleChange} placeholder="Description" />
//             <input type="file" name="files" ref={fileInputRef} onChange={handleFileChange} multiple/>

//             <Modal.Footer>
//             <button onClick={handleSubmit} type="button">Update</button>
//         </Modal.Footer>
//                 </Modal.Body>
//     </Modal>



//     );
// };


// export default EditNote





// import React from 'react';
// import { useState,useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes} from '@fortawesome/free-solid-svg-icons';
// import { Head, router } from '@inertiajs/react';
// import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";


// const EditNote = ({ note, onClose,onSubmit }) => {
//     const [values, setValues] = useState({
//         note_title: note.title_note,
//         note_desc: note.description,
//     });
//     const fileInputRef = useRef(null);

//     const handleFileChange = (e) => {
//         setValues(prevValues => ({
//             ...prevValues,
//             file: e.target.files[0],
//         }));
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setValues({ ...values, [name]: value });
//     };

//     const handleSubmit = () => {

//         const updatedNote = {
//             id: note.id_note,
//             note_title: values.note_title,
//             note_desc: values.note_desc,
//             file: values.file, // Ensure file is included
//             // Include any other fields you need to update
//         };
//         if (fileInputRef.current) fileInputRef.current.value = ''; // Reset the file input
//         onSubmit(updatedNote);
//         onClose();
//     };






//     return (
//         <div className="edit-note-modal">
//         <div className="modal-content">
//             <FontAwesomeIcon icon={faTimes} onClick={onClose} />
//             <div >
//             <input type="text" name="note_title" value={values.note_title} onChange={handleChange} placeholder="Title" />
//             <input type='text' name="note_desc" value={values.note_desc} onChange={handleChange} placeholder="Description" />
//             <input type="file" name="file" ref={fileInputRef} onChange={handleFileChange} />
//             <button onClick={handleSubmit} type="button">Update</button>
//             </div>
//         </div>
//         </div>



//     );
// };


// export default EditNote

