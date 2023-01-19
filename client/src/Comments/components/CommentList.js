import React from 'react';
import { Comment, Form, Button, Header } from 'semantic-ui-react';
import style from '../../Common/Style';

function Comments({ comments }) {

  return(
    <>
    <div style={style.div1}>
    <div style={style.div2}>
    <Comment.Group size='mini' minimal>
    <Header as='h3' dividing>
      Comments
    </Header>

  </Comment.Group>
  </div> 
  </div>
     <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </>
  )


}

export default Comments; 