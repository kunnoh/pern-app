import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user: currentUser } = useSelector((state) => state.auth);
  if(!currentUser) {
    return <Navigate to="/login"/>
  }
  
  return(
    <h2>Dashboard</h2>
  );
}