import React, { useState } from 'react';
import CustomButton from "../CustomButton";
import signin from '../../assets/signin.jpg';
import {Link} from 'react-router-dom';
import HeaderAll from '../HeaderAll';




//accept a prop to be called upon successful login
const LogIn = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // New state for tracking sign in success
  const [isloginSuccessful, setIsloginSuccessful] = useState(false);
  
//form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloginSuccessful(false);; // Reset the success state on new submission

  
    try {
      //send post request to the server
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Sign-in successful:', data);
        const userId = data.userId;
        setIsloginSuccessful(true);
        setTimeout(() => {
          onLoginSuccess(true);
        }, 1000);
/*         document.cookie = `userId=${userId}; path=/;`; // the server adds this
 */

      } else {
        console.error('sign-in failed');
        // Handle errors 
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };
  

  return (

    <div className='h-screen flex flex-col overflow-hidden'>
      <HeaderAll />

    <div className='flex w-full h-screen bg-white flex-grow overflow-hidden'>
    

    <div className='my-10 hidden lg:flex w-1/2 items-center justify-center '>
        <img className='h-full' src={signin} alt = "signin picture"/>
      </div>
      <div className='bg-transparent w-full flex items-center justify-center lg:w-1/2 my-10 '>
      <form onSubmit={handleSubmit}
      className='border p-10 rounded-3xl bg-white border-gray-200'>
        <h2 className='text-3xl font-semibold pb-4'>Login</h2>
        <p>Don't have an account? <Link className='text-pink-500' to="SignUp">Sign Up</Link></p>
        <div className='p-3'>
          <label className='text-md font-medium'
          htmlFor="username">Username:</label>
          <input 
            className='border-2 mt-2 py-1 px-2 border-gray-300 rounded block min-h-[auto] w-full'
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className='p-3'>
          <label 
          className='text-md font-medium'
          htmlFor="password">Password:</label>
          <input
            className='border-2 mt-2 py-1 px-2 border-gray-300 rounded block min-h-[auto] w-full'
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Conditional rendering of success message or placeholder */}
        <div className={isloginSuccessful ? "text-center text-green-600" : "invisible"}>
            {isloginSuccessful ? "Login Successful!" : "Placeholder"}
          </div>
        <div className='mx-auto text-center mt-4'>
        <CustomButton type="submit">Login</CustomButton>
        </div>

        

      </form>
    </div>
      
    </div>
     </div>



  );
};

export default LogIn;
