import React from 'react';
import './background.css';

function SiteContainer(props) {
  return (
  <div className='site-container'>
    {props.children}
  </div>
  )
}

export default SiteContainer; 