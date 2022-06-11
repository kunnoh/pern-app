// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/dashboard';
import NotFound from './components/404/notfound';

function App() {
  const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }


  return (
    <div className="container">
      <header className="header">
        <a href='/'>PERN-APP</a>
      </header>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/students" element={<Dashboard />}/>
          <Route path="*" element={<NotFound/>}/>      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
