import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { user as _ } from '../../store';
import { Segment,
         Item,
         Button,
         Icon,
                   } from 'semantic-ui-react';
import { createIconUrl } from '../../Helpers';
import { Link } from 'react-router-dom'; 

function User() {

  const { username }    = useParams(); 
  const dispatch        = useDispatch();
  const { currentUser}  = useSelector((state) => state.session);
  const { user, 
          status }      = useSelector((state) => state.user); 

  useEffect(()=> {
    dispatch(_.show(username));
  }, [dispatch, username]); 

  if (status === 'loading') return <h1>Loading</h1>
  if (user) return (
    <>
      <Segment raised padded>
        <Item.Group>
        <Item>
          <Item.Image size='small' src={createIconUrl(user.icon)}/>
          <Item.Content verticalAlign='middle'>
            <Item.Header>
              {user.username} {' '}
              { user.username === currentUser.username ? (
                <Button  as={Link} to='/settings' circular basic compact icon='setting'/>
              ) : ( null )
              }
            </Item.Header>
            <Item.Extra>Member Since</Item.Extra>
            <Item.Description><Icon color='black' name='film'/>Posts</Item.Description>
            <Item.Description><Icon name='comment'/> Comments</Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
      </Segment>
    </>
  )
  return <h1>Not found</h1>
}

export default User; 