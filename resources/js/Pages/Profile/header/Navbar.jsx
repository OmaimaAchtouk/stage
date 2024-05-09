import React, { useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import {  router } from '@inertiajs/react';
import { FaSearch } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import './css.css'
const Navbar = ({title,auth}) => {
    const [searchQuery,setSearchQuery]=useState('');
    const handleSearch=()=>{
        router.get(route('note.index'),{search: searchQuery})
    }
  return (
    <header >
    <nav className='navbar'>
        <div className='logo'>
        <span className='logo_name'>{title}</span>
        </div>
        <div className='search_container'>
        <div className='search_input_wrapper'>

            <input className='search_input'
             type='text'
             placeholder='Search a note'
             onChange={(e)=>setSearchQuery(e.target.value)}  />
             <FaSearch className='search_icon' onClick={handleSearch} />
        </div>

         </div>
      </nav>

      </header>
  )
}

export default Navbar
