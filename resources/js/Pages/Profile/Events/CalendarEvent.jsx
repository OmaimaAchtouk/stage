import React, { useState } from 'react';
// import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { InertiaHead } from '@inertiajs/inertia-react';
import Navbar from '../header/Navbar';
import SideBar from '../SideBar/SideBar';
import '../Notes/note.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import CalendarE from './Calendar';
import { Inertia } from '@inertiajs/inertia';

const CalendarEvent = ({events ,auth}) => {
    const [title, setTitle] = useState('Calendar');

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
       <CalendarE  events={ events }/>
      </div>
    </div>
    </div>
 </>
 );
};

export default CalendarEvent ;

