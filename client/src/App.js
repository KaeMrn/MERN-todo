import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TodoListContainer from './components/TodoListContainer';
import SignUp from './components/Authentification/SignUp';
import LogIn from './components/Authentification/login';
import HomePage from './components/HomePage';
import Profile from './components/Profile';


const getUserIdFromCookie = () => {
  const userIdCookie = document.cookie.split('; ').find(row => row.startsWith('userId='));
  return userIdCookie ? userIdCookie.split('=')[1] : null;
};


function App() {
  const userIdFromCookie = getUserIdFromCookie();
  const [userId, setUserId] = useState(userIdFromCookie || null);


 
  return (
<Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Profile/SignUp" element={<SignUp />} />

      </Routes>
    </Router>
  );
}

export default App;
