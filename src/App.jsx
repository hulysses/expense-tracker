import './App.css';
import Home from './pages/home';
import Sobre from './pages/about';
import Login from './pages/signin';
import Signup from './pages/signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authState = JSON.parse(localStorage.getItem('is_authenticated'));
    setIsAuthenticated(authState);
  }, []);

  if (isAuthenticated === null) {
    isAuthenticated = false;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path='/about' element={isAuthenticated ? <Sobre /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
