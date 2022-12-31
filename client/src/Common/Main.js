import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Container } from 'semantic-ui-react';
import style from './Style';

function Main({ children }) {

  return(
  <>
    <NavBar/>
    <Container style={style.siteContainer}>
    <div style={style.div1}>
      <div style={style.div2}>
        {children}
      </div>
    </div>
    </Container>
    <Footer/>
  </>
  )
}

export default Main; 