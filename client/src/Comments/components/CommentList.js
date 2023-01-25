import React, { useState } from 'react';
import { Comment, Form, Button, Header } from 'semantic-ui-react';
import style from '../../Common/Style';
import CommentItem from './CommentItem';
import { post, post as _ } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

function Comments({ comments, postId }) {

  const [comment, setComment] = useState(''); 
  const dispatch = useDispatch();
  function createComment() {
    if (comment) {
      dispatch(_.createComment({ comment: { post_id: postId, content: comment }})); 
      setComment('');
    }
  }

  return(
    <>
    <div style={style.div1}>
    <div style={style.div2}>
    <Comment.Group size='small' minimal>
    <Header as='h3' dividing>
      Comments
    </Header>
    {comments.map((comment)=>{
      return <CommentItem key={comment.id} comment={comment}/>
    })}

  </Comment.Group>
  </div> 
  </div>
     <Form reply>
      <Form.TextArea value={comment} onChange={(e)=>setComment(e.target.value)} />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={createComment} />
    </Form>
  </>
  )


}

export default Comments; 