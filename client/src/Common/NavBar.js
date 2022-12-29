import React, { useState } from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { useDispatch, useSelector } from 'react-redux';

function NavBar() {

  const user = useSelector((state)=>state.session.user);

  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('');
  function handleItemClick(e, { name }) {
    setActiveItem(name)

  }

  function handleSignOut() {
    dispatch(logout()); 
  }

  const svgStr = `<svg viewBox="0 0 50 50" id="icodi" width="100%" height="100%" 
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">


<rect x="0" y="0" width="50" height="50" fill="#fff"/>
<defs>
<clipPath id="icodi-6468523">
<rect width="50" height="50"/>
</clipPath>
</defs>
<g clip-path="url(#icodi-6468523)">
<rect x="0" y="0" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="40" y="0" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="10" y="0" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="30" y="0" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="20" y="10" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="0" y="20" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="40" y="20" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="10" y="20" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="30" y="20" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="0" y="30" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="40" y="30" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="0" y="40" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="40" y="40" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="10" y="40" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
<rect x="30" y="40" width="10" height="10" fill="#f2d70c" style="stroke:#f2d70c; stroke-width:0.1"/>
</g>

</svg>`
const svg = new Blob([svgStr], { type: "image/svg+xml" });
const url = URL.createObjectURL(svg);
console.log(svg);
  return ( 
    <Menu style={{ background: '#1B1C1D'}}fixed='top' inverted secondary borderless>
        <Container>
        <Menu.Item header>
          <Image size='mini' src={url} style={{ marginRight: '1.5em' }} />
          Record Keeper
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
        <Menu.Item
          icon='user'
          name='profile' as={Link} to='profile'
          active={activeItem === 'profile'}
          onClick={handleItemClick}
        />
          
        <Menu.Menu position='right'>
        <Dropdown item simple icon='bars'>
          <Dropdown.Menu>
            <Dropdown.Header>{user.username}</Dropdown.Header>
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