import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import TodoListContainer from './components/TodoListContainer';
import SignUp from './components/Authentification/SignUp';
import LogIn from './components/Authentification/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
<div>
      {isLoggedIn && (
        <>
          <Header onLogout={handleLogout} />
          <TodoListContainer />
        </>
      )}
      {!isLoggedIn && (
        <LogIn onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}

export default App;
