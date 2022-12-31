import React, { useState } from 'react'; 
import { Segment,
         Form,
         Container,
         Image,
         Item,
         Button,
       } from 'semantic-ui-react';
import { session as _ } from '../../store' 
import { useDispatch, useSelector } from 'react-redux'; 
function ChangePassword() {

  const  { errors, status } = useSelector((state)=>state.session);

  const [oldPassword, setOldPassword]   = useState('');
  const [newPassword, setNewPassword]   = useState('');
  const [confirmation, setConfirmation] = useState('')

  const dispatch = useDispatch(); 

  function handlePasswordChange(e) {
    e.preventDefault();
    // dispatch(_.clearErrors()); 
    dispatch(_.changePassword({
      password: {
        old_password: oldPassword,
        change: {
          password: newPassword,
          password_confirmation: confirmation,
        }
      }
    }));
    setOldPassword('');
    setNewPassword('');
    setConfirmation('');
  }

  return (
    <>
      <Container>
        <Form 
          loading={status === 'idle' ? false : true }
          onSubmit={handlePasswordChange}>
          <Form.Input
            label='Old Password'
            fluid icon='lock'
            iconPosition='left'
            placeholder='Enter Old Password'
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            error={errors["password"] ? { content: errors["password"]} : false }
          />
          <Form.Input
            label='New Password'
            fluid icon='lock'
            iconPosition='left'
            placeholder='Enter new password'
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
          />
          <Form.Input
            label='Confirm New Password'
            fluid icon='lock'
            iconPosition='left'
            placeholder='Confirm new password'
            value={confirmation}
            onChange={(e)=>setConfirmation(e.target.value)}
            error={errors["password_confirmation"] ? {content: errors["password_confirmation"]} : false}
          />
          <Form.Field 
            disabled={!newPassword}
            color='teal' 
            control={Button}>
              Change Password
          </Form.Field>
        </Form>
      </Container>
    </>
  )
}

export default ChangePassword;