import React from 'react';
import {Link} from 'react-router-dom';
import CustomButton from "./CustomButton";


const Header = ({ onLogout ,className }) => {
 
  return (
    <div className={`${className} bg-white h-[55px] z-10 drop-shadow-lg`}>
    <div className='px-5 py-1 flex justify-between'> 
    <h1 className='text-center md:text-4xl sm:text-4xl lg:text-4xl font-bold text-gray-900'>
      <span className='bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent'>
        Kae
      </span>
      &nbsp;
      <span>Todo App</span>
    </h1>
    <div className='my-auto'>
    <CustomButton onClick={onLogout} type="submit">Logout</CustomButton>


          </div>
    </div>
    </div> 

  )
}

export default Header;

