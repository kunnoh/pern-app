import React from 'react';
import './notfound.css'

export default function NotFound() {
  return(
      <div className='not-found'>
        <h2>Page Not Found</h2>
        <a href='/'>Go Home</a>
      </div>
  );
}