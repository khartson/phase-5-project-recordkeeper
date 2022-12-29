import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Container } from 'semantic-ui-react';

function Main({ children }) {

  return(
  <>
    <NavBar/>
    <Container style={{ marginTop: '7em' }}>
      {children}
    </Container>
    <Footer/>
  </>
  )
}

export default Main; 