import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EventNoteIcon from '@mui/icons-material/EventNote';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import '../Notes/note.css';

const SideBar = ({ onTitleChange }) => {
 const [collapsed, setCollapsed] = useState(false);

 const toggleSidebar = () => {
    setCollapsed(!collapsed);
 };

 return (
    <div>
      <Sidebar className="sidebar" collapsed={collapsed} onToggle={toggleSidebar}>
        <Menu className='Menu'>
          <MenuItem icon={<MenuOutlinedIcon />} onClick={toggleSidebar}></MenuItem>
          <div className='menu-item'>
            <MenuItem
              icon={<EventNoteIcon />}
              component={<InertiaLink href="/note" />}
              title='Notes'
              onClick={() => onTitleChange('Notes')}
            >
              Notes
            </MenuItem>
          </div>
          <div className='menu-item'>
            <MenuItem
              icon={<DeleteOutlineIcon />}
              component={<InertiaLink href="/task" />}
              title='tasks'
              onClick={() => onTitleChange('tasks')}
            >
            tasks
            </MenuItem>
          </div>
          <div className='menu-item'>
            <MenuItem
              icon={<TurnedInNotIcon />}
              component={<InertiaLink href="/Callender" />}
              title='Callender'
              onClick={() => onTitleChange('Callender')}
            >
            Callender
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
 );
};

export default SideBar;
