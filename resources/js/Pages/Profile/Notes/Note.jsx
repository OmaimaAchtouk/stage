import React, { useState } from 'react';
import Navbar from '../header/Navbar';
import SideBar from '../SideBar/SideBar';
import './note.css'
import NoteContent from './NoteContent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


const SideBarRoutes = ({notes,auth,content}) => {
 const [title, setTitle] = useState('Notes');

 const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
 };


 return (
    <div>
        <div className='melange'>
        <Navbar title={title} />
        <AuthenticatedLayout user={auth.user}  />
        </div>
        <hr/>

        <div className="layout-container">

        <div className="sidebar-container">
          <SideBar onTitleChange={handleTitleChange}/>
        </div>
        <div className="content-container">
          <div className="content">
            <NoteContent   notes={notes}/>
          </div>
        </div>
        </div>
    </div>
 );
};

export default SideBarRoutes;
