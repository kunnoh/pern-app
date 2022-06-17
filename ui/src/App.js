// import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import ForgotPassword from './components/auth/forgot-password/forgot-password';
import NotFound from "./components/404/notfound";
import Students from "./components/student/student";
import Subjects from "./components/subjects/subjects";
import { logout } from "./actions/auth.actions";
import { clearMessage } from "./actions/message.action";
import { history } from "./misc/history";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  
  return (
    <div className="container">
      <BrowserRouter history={history}>
        <header className="flex header">
          <a href='/'>PERN-APP</a>
          <div className='flex link'>
            {currentUser && <Link to={"/"}>students</Link>}
            {currentUser && <Link to={"/subjects"}>subjects</Link>}
          </div>
          {currentUser && <span onClick={logOut}>logout</span>}
        </header>
        <Routes>
          <Route exact path="/" element={<Students />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/forgot-password" element={<ForgotPassword />}/>
          <Route exact path="/subjects" element={<Subjects />}/>
          <Route path="*" element={<NotFound/>}/>      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
