import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { router } from '@inertiajs/react';
import './css.css';

const Navbar = ({ title, searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <header>
      <nav className='navbar'>
        <div className='logo'>
          <span className='logo_name'>{title}</span>
        </div>
        <div className='search_container'>
          <div className='search_input_wrapper'>
            <input
              className='search_input'
              type='text'
              placeholder='Search a note'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className='search_icon' onClick={handleSearch} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
