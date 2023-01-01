import React from 'react';
import style from './Style';
import './background.css';

function SiteContainer(props) {
  return (
  // <div style={style.container}>
  <div className='site-container'>
    {props.children}
  </div>
  )
}

export default SiteContainer; 