import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { user as _ } from '../../store';
import { Segment,
         Item,
         Button,
         Icon,
                   } from 'semantic-ui-react';
import { createIconUrl, formatDate } from '../../Helpers';
import { Link } from 'react-router-dom'; 
import { UserPosts } from '../../Posts';

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
            <Item.Extra><b>Member Since:</b>{formatDate(user.created_at)}</Item.Extra>
            <Item.Description><Icon color='black' name='film'/><b>{user.posts.length}</b> Posts</Item.Description>
            <Item.Description><Icon name='comment'/> <b>{user.commented_posts.length}</b> Commented Posts</Item.Description>
          </Item.Content>
        </Item>
        </Item.Group>
      </Segment>
      <UserPosts posts={user.posts} commentedPosts={user.commented_posts} username={user.username}/>
    </>
  )
  return <h1>Not found</h1>
}

export default User; 