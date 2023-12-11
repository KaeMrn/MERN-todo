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

  return (
  <div>
      <Header />
      {isLoggedIn ? (
        <TodoListContainer />
      ) : (
        <LogIn onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}

export default App;
