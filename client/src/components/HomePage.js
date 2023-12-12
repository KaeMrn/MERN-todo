import React from 'react'
import Home from './Home'
import Header from './Header'
import HeaderAll from './HeaderAll'

const HomePage = () => {
  return (
    <div className='h-screen flex flex-col overflow-hidden'>
        <HeaderAll />
        <div>
        <Home className="flex-grow overflow-hidden" />
        </div>
      
    </div>
  )
}

export default HomePage
