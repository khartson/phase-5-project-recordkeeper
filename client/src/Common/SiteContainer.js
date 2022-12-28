import React from 'react';
import style from './Style';

function SiteContainer(props) {
  return (
  <div style={style.container}>
    {props.children}
  </div>
  )
}

export default SiteContainer; 