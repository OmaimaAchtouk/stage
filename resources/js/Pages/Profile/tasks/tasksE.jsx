import React, { useState } from 'react';
// import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { InertiaHead } from '@inertiajs/inertia-react';
import Navbar from '../header/Navbar';
import SideBar from '../SideBar/SideBar';
import '../Notes/note.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import IndexTask from './indexTask';
import { Inertia } from '@inertiajs/inertia';

const TasksE = ({jobs,auth}) => {
    const [title, setTitle] = useState('Tasks');

    const handleTitleChange = (newTitle) => {
       setTitle(newTitle);
    };


 return (


<>
    <div className='melange'>
    <Navbar title={title} />
    <AuthenticatedLayout user={auth.user}  />
    </div>
    <hr/>

    <div className="layout-container">

    <div className="sidebar-container">
      <SideBar  onTitleChange={handleTitleChange} />
    </div>
    <div className="content-container">
      <div className="content">
       <IndexTask jobs= {jobs} />
      </div>
    </div>
    </div>
 </>
 );
};

export default TasksE ;
 //   <div className="app">
    //     <div className="navbar_content">
    //      <Navbar />
    //     </div>
    //     <div className="sidebar-container">
    //       <SideBar onTitleChange={handleTitleChange} />
    //     </div>
    //     <div className="content-container">
    //       <div className="content">
    //         <IndexTask jobs= {jobs} />

    //         {/* Your page components will be rendered here by Inertia.js */}
    //       </div>
    //     </div>
    //   </div>
