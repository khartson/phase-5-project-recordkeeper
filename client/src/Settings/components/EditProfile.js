import React, { useEffect, useState } from "react";
import { Image,
         List,
         Form, 
         Button,
              } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { createIconUrl } from "../../Helpers";
import { session as _ } from '../../store';

function EditProfile() { 

  const dispatch = useDispatch();

  // clear the errors on initial render 
  // they persist in state, if you leave 
  // the tab an return it will still show
  // an error 
  useEffect(()=>{
    dispatch(_.clearErrors());
  },
  [dispatch])

  const { currentUser, status, errors } = useSelector((state)=>state.session);
  const [newUsername, setUsername] = useState(currentUser.username);

  // need to override the <a> redirect with
  // preventdefault 
  function handleIconChange(e) {
    e.preventDefault();
    dispatch(_.newIcon());
  }
 
  // simple form submission 
  function handleUserUpdate(e) {
    e.preventDefault();
    dispatch(_.update({
      id: currentUser.id,
      params: {
        user: {
          username: newUsername,
        }
      }
    }));
  }; 

  return (
  <>
    <List size='large'>
    <List.Item>
      <Image avatar src={createIconUrl(currentUser.icon)} />
      <List.Content>
        <List.Header>{currentUser.username}</List.Header>
        <List.Description>
          <a href='/' onClick={handleIconChange}>
            <b>Generate new icon</b>
          </a>
        </List.Description>
      </List.Content>
    </List.Item>
    </List>
    <Form
      loading={status === 'idle' ? false : true}
      onSubmit={handleUserUpdate}
    >
      <Form.Input
        label='New Username'
        placeholder='Enter new username'
        value={newUsername}
        onChange={(e)=>{setUsername(e.target.value); dispatch(_.clearErrors())}}
        error={errors["username"] ? { content: errors["username"] } : false }
      />
      <Form.Field
        disabled={!newUsername || newUsername === currentUser.username}
        color='teal'
        control={Button}>
          Submit
      </Form.Field>
    </Form>
  </>
  )
}

export default EditProfile;