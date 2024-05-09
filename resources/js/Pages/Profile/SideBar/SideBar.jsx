import React, { useState } from 'react';
import { InertiaLink} from '@inertiajs/inertia-react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from '@inertiajs/react'
import { GiNotebook } from "react-icons/gi";
import { FaTasks,FaRegCalendarAlt} from "react-icons/fa";
import { GrNotes } from "react-icons/gr";

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
              icon={<GrNotes  size={25}/>}
              component={<Link href={route('note.index')} />}
              title='Notes'
              onClick={() => onTitleChange('Notes')}
            >
              Notes
            </MenuItem>
          </div>
          <div className='menu-item'>
            <MenuItem
              icon={<FaTasks size={20}/>
            }
              component={<Link href="/task" />}
              title='tasks'
              onClick={() => onTitleChange('tasks')}
            >
            tasks
            </MenuItem>
          </div>
          <div className='menu-item'>
            <MenuItem
              icon={<FaRegCalendarAlt size={23} />}
              component={<Link href="/Callender" />}
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
