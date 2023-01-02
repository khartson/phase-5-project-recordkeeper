import React, { useState } from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { session } from '../store';
import { createIconUrl } from '../Helpers';
import { useDispatch, useSelector } from 'react-redux';

function NavBar() {

  const { currentUser } = useSelector((state)=>state.session);

  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('');
  function handleItemClick(e, { name }) {
    setActiveItem(name)

  }

  function handleSignOut() {
    dispatch(session.logout()); 
  }

  const url = createIconUrl(currentUser.icon); 

  return ( 
    <Menu style={{ background: '#1B1C1D'}} fixed='top' inverted secondary borderless>
        <Container style={{ width: '1450px'}}>
        <Menu.Item header>
          <Image src='/logo.svg' style={{ borderRadius: '5px',height: '36px', width: '84px', objectFit: 'cover' }}/>
        </Menu.Item>
        <Menu.Item
          icon='home'
          name='home'as={Link} to='/'
          active={activeItem === 'home'}
          onClick={handleItemClick}/>
        <Menu.Item 
          icon='list layout'
          name='feed'as={Link} to='/feed'
          active={activeItem === 'feed'}
          onClick={handleItemClick}/>
          
        <Menu.Menu position='right'>
        <Dropdown item simple trigger={<Image avatar src={url}/>}>
          <Dropdown.Menu>
            <Dropdown.Header>{currentUser.username}</Dropdown.Header>
            <Dropdown.Item
              as={Link} to={`/users/${currentUser.username}`}
              name='profile'
              icon='user'
              text='Profile'
              active={activeItem === 'profile'}
              onClick={handleItemClick}
            />
            <Dropdown.Item
              as={Link} to='/settings'
              name='settings'
              icon='setting'
              text='Settings'
              active={activeItem === 'settings'}
              onClick={handleItemClick}
            />
            <Dropdown.Item 
              onClick={handleSignOut}
              icon='sign out' text='Sign Out'/>
          </Dropdown.Menu>
        </Dropdown>
        </Menu.Menu>
        </Container>
    </Menu>
    )
}

export default NavBar; 