import React, { useState } from 'react';
import Header from './Header';
import TodoListContainer from './TodoListContainer';
import LogIn from './Authentification/login';
import { navigate } from 'react-router-dom';

//retreive user ID from cookies
const getUserIdFromCookie = () => {
    const userIdCookie = document.cookie.split('; ').find(row => row.startsWith('userId='));
    return userIdCookie ? userIdCookie.split('=')[1] : null;
  };

const Profile = () => {
  const userIdFromCookie = getUserIdFromCookie();
  //get id
  const [isLoggedIn, setIsLoggedIn] = useState(!!userIdFromCookie);
  //state tracking
  const [userId, setUserId] = useState(userIdFromCookie || null);
  //storing id
  const clearUserIdCookie = () => {
    document.cookie = 'userId=; Max-Age=0; path=/;';
  };
  //clear user id cookie
  

  //handle login and state
  const handleLogin = (status) => {
    const userIdFromCookie = getUserIdFromCookie();
    setIsLoggedIn(status);
    setUserId(userIdFromCookie);
  };

  //clear id cookie and logsout
  const handleLogout = () => {
    clearUserIdCookie();
    setIsLoggedIn(false);
    setUserId(null);
  };
  return (
    <div>
      {isLoggedIn && (
        <>
          <Header onLogout={handleLogout} />
          <TodoListContainer
            userId={userId}
          />
        </>
      )}
      {!isLoggedIn && (
        <LogIn onLoginSuccess={handleLogin} /> //if not logged in redirect to login component
      )}
    </div>
  )
}

export default Profile
