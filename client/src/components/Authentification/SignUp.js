import React, { useState } from 'react';
import CustomButton from "../CustomButton";
import signup from '../../assets/signup.png';
import HeaderAll from '../HeaderAll';




const SignUp = () => {

  //hooks to manage inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // New state for tracking sign up success
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  
//form submission
  const handleSubmit = async (event) => {
    event.preventDefault();//(page reload prevention)
    setIsSignupSuccessful(false);//reset signup upon success
  
    try {
      //attemp sign in by sending post request to server
      const response = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        setIsSignupSuccessful(true);
      } else {
        console.error('Signup failed');
        // Handle errors (e.g., show error message)
      }
    } catch (error) {
            // Log any error during the signup process.
      console.error('Error during signup:', error);
    }
  };
  

  return (
    <div className='h-screen flex flex-col overflow-hidden'>
    <HeaderAll />

    <div className='flex w-full h-screen bg-white flex-grow overflow-hidden '>
    <div className='my-10 hidden lg:flex w-1/2 items-center justify-center '>
        <img className='h-full' src={signup} alt = "signup picture"/>
      </div>
      <div className='bg-transparent w-full flex items-center justify-center lg:w-1/2 my-10 '>
      <form onSubmit={handleSubmit}
      className='border p-10 rounded-3xl bg-white border-gray-200'>
        <h2 className='text-3xl font-semibold pb-4'>Sign Up</h2>
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
        <div className={isSignupSuccessful ? "text-center text-green-600" : "invisible"}>
            {isSignupSuccessful ? "Sign Up Successful!" : "Placeholder"}
          </div>
        <div className='mx-auto text-center mt-4'>
        <CustomButton type="submit">Sign Up</CustomButton>
        </div>

        

      </form>
    </div>
      
    </div> 
    </div>



  );
};

export default SignUp;
