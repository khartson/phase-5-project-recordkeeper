import React, { useState } from "react";
import { Modal,
         Button,
         Message,
         Form
       } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { session as _ } from '../../store';

function DeleteAccount() { 

  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { username } = useSelector((state)=>state.session.currentUser);
  const { errors   } = useSelector((state)=>state.session); 
  function handleAccountDeletion() {
    dispatch(_.deleteAccount({
      user: { 
        password: password,
      }
    }));
  }
  return (
    <> 
      <Message negative>
        <Message.Header>
          Warning! You are about to delete your account.
        </Message.Header>
        <p>This action is permanent and cannot be undone</p>
        <Modal centered={false}
          onClose={()=> setShow(false)}
          onOpen={()=> setShow(true)}
          open={show}
          trigger={
            <Button negative compact
                    icon='trash'
                    content='Delete my account'
            />
        }>
        <Modal.Header style={{ color: 'red' }}>Delete your account</Modal.Header>
        <Modal.Content>
          <p>Please enter the password for <b>{username}</b> to confirm</p>
          <Form
          >
             <Form.Input width={7}
              label='Password'
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              error={errors["password"] ? {content: errors["password"]} : false}
            /> 
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={()=>setShow(false)}>Return</Button>
          <Button negative onClick={handleAccountDeletion}>Delete Account</Button>
        </Modal.Actions>

        </Modal>
      </Message>
    </>
  )

}

export default DeleteAccount;