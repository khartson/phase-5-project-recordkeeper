import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { session } from '../../store';

function CreateAccount() {
  const dispatch = useDispatch();
  const { errors, status }      = useSelector((state) => state.session);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, 
       setPasswordConfirmation] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(session.signup({ 
      user: {
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
      }
    }));
  }
  return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Create an account
        </Header>
        <Form
          loading={status === "idle" ? false : true}
          onSubmit={handleSubmit} size='large'>
          <Segment stacked>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='username' 
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              error={errors["username"] ? { content: errors["username"] } : false}
              />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              error={errors["password"] ? { content: errors["password"] } : false}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password confirmation'
              type='password'
              value={passwordConfirmation}
              onChange={(e)=>setPasswordConfirmation(e.target.value)}
              error={errors["password_confirmation"] ? { content: errors["password_confirmation"] } : false}
            />
            <Button color='teal' fluid size='large'>
              Sign up
            </Button>
          </Segment>
        </Form>
        <Message>
          Have an account? <Link to='/auth/login'>Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )

}
export default CreateAccount