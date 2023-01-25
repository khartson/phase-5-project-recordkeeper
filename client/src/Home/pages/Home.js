import React from 'react';
import { 
  Container,
  Transition, 
  Image, 
  Button,
  Header
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Home() {
  
  const { currentUser: { username} } = useSelector((state)=> state.session)
  return(
  <Container style={{ margin: 'auto', marginTop: '20%', width: '50%', textAlign: 'center'}}>
    <Transition transitionOnMount animation='fade right'>
      <Image src='logo.svg'/>
    </Transition>
    <Transition transitionOnMount animation='fade left'>
      <div style={{ padding: 10 }}>
        <Button compact as={Link} to={'/feed'} content='Get started'/>
        <Button compact as={Link} to={'/posts/create'} content='Create a post'/>
      </div>
    </Transition>
  </Container>
  )
}

export default Home;