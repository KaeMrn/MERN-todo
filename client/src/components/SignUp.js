import React, { useState } from 'react';
import CustomButton from "./CustomButton";



const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
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
        // Redirect or update UI accordingly
      } else {
        console.error('Signup failed');
        // Handle errors (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  

  return (
    <div className='flex w-full min-h-screen bg-pink-200'>
    <div className='bg-white w-full flex items-center justify-center lg:w-1/2 my-10'>
      <form onSubmit={handleSubmit}
      className='border p-10 rounded-3xl border-gray-200'>
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
        <div className='mx-auto text-center mt-4'>
        <CustomButton type="submit">Sign Up</CustomButton>
        </div>

      </form>
    </div>
    </div>
  );
};

export default SignUp;
