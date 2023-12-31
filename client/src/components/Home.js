import React from 'react'
import CustomButton from './CustomButton'
import {Link} from 'react-router-dom';

import tasks from '../assets/tasks.png'

const Home = () => {
  return (
    <div className=''>
        <div className='bg-white w-full flex flex-col justify-between'>
            <div className='grid md:grid-cols-2 max-w-[1240px] mx-5'>
                <div className='flex flex-col justify-center md:items-start h-screen w-full px-2 py-8'>
                    <p className='text-2xl'>Want to make your life easier?</p>
                    <h1 className='py-3 text-5xl md:text-7xl font-bold'>Todo App</h1>
                    <p className='text-2xl'>This is our solution for you</p>
                    <Link to="/Profile" className='md:w-[60%] sm:w-[60%] mt-7'>
                    <CustomButton className="py-3 px-6 md:w-full w-1/2 my-4" >Join Us</CustomButton>
                    </Link>
                </div>
                <div className='w-full'>
                <img className='w-[90%] mt-' src={tasks} alt ='/'></img>

                 </div>
          </div>
          

           

        </div>
    </div>
  )
}

export default Home
