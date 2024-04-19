import React, { useState } from 'react';
// import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { InertiaHead } from '@inertiajs/inertia-react';
import Navbar from '../header/Navbar';
import SideBar from '../SideBar/SideBar';
import './note.css'
import NoteContent from './NoteContent';
import { Inertia } from '@inertiajs/inertia';

const SideBarRoutes = ({content,notes}) => {
 const [title, setTitle] = useState('Notes');

 const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
 };

 return (

      <div className="app">
        <div className="navbar_content">
          <Navbar title={title} />
        </div>
        <div className="sidebar-container">
          <SideBar onTitleChange={handleTitleChange} />
        </div>
        <div className="content-container">
          <div className="content">
            <NoteContent  cn={content} notes={notes}/>

            {/* Your page components will be rendered here by Inertia.js */}
          </div>
        </div>
      </div>
 );
};

export default SideBarRoutes;
