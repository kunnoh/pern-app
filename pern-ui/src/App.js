// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Login from './components/auth/login';
import Dashboard from "./components/dashboard/dashboard";
import NotFound from "./components/404/notfound";
import { logout } from "./actions/auth.actions";
import { clearMessage } from "./actions/message.action";
import { history } from "./misc/history";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout);
  };
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      // setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser], logOut);

  return (
    <div className="container">
      <header className="header">
        <a href='/'>PERN-APP</a>
      </header>

      <BrowserRouter history={history}>
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
