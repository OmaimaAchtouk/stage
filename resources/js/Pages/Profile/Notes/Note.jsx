import React, { useState } from 'react';
import Navbar from '../header/Navbar';
import SideBar from '../SideBar/SideBar';
import './note.css';
import NoteContent from './NoteContent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

const SideBarRoutes = ({ notes, auth, user, content }) => {
  const [title, setTitle] = useState('Notes');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handleSearch = () => {
    router.get(route('note.index'), { search: searchQuery });
  };

  return (
    <div>
      <div className='melange'>
        <Navbar
          title={title}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <AuthenticatedLayout user={auth.user} />
      </div>
      <hr />
      <div className="layout-container">
        <div className="sidebar-container">
          <SideBar onTitleChange={handleTitleChange} />
        </div>
        <div className="content-container">
          <div className="content">
            <NoteContent notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarRoutes;
