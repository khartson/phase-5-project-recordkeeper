import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { login } from '../../store';

function LoginForm() {
  const dispatch = useDispatch();
  const { errors, status }      = useSelector((state) => state.session);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ 
      user: {
        username: username,
        password: password
      }
    }));
  }

  return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
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

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to='/auth/signup'>Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
  )
}
export default LoginForm