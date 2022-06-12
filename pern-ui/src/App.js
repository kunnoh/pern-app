// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Login from './components/auth/login';
import NotFound from "./components/404/notfound";
import Students from "./components/student/student";
import Subjects from "./components/subjects/subjects";
import { logout } from "./actions/auth.actions";
import { clearMessage } from "./actions/message.action";
import { history } from "./misc/history";

function App() {
  const [loggedIn, setLogged] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout);
    setLogged(false);
  };
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      setLogged(true);
    }
  }, [currentUser], logOut);

  return (
    <div className="container">
      <header className="flex header">
        <a href='/'>PERN-APP</a>
        <div>

        </div>
        {loggedIn && <span onClick={logOut}>logout</span>}
      </header>

      <BrowserRouter history={history}>
        <Routes>
          <Route exact path="/" element={<Students />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/subjects" element={<Subjects />}/>
          <Route path="*" element={<NotFound/>}/>      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
