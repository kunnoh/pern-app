import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user: currentUser } = useSelector((state) => state.auth);
 
  // check if user is authenticated
  if(!currentUser) {
    return <Navigate to="/login"/>
  }
  
  return(
    <h2>subjects</h2>
  );
}