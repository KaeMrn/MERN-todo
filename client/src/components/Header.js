import React from 'react';
import CustomButton from "./CustomButton";


const Header = ({ onLogout }) => {
  return (
    <div className=' px-3 py-1 flex justify-between'>
    <h1 className='bg-red text-center text-4xl font-bold text-gray-900'>
      <span className='bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent'>
        Kae
      </span>
      &nbsp;
      <span>Todo App</span>
    </h1>
    <CustomButton onClick={onLogout} type="submit">Log Out</CustomButton>
    </div>

  )
}

export default Header;

