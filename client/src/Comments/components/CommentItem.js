import React, { useState } from 'react'
import { Comment, Form, Label, TextArea, Button } from 'semantic-ui-react';
import { createIconUrl, formatDate } from '../../Helpers';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { post as _ } from '../../store'; 

function CommentItem({ comment }) {

  const { currentUser } = useSelector((state)=>state.session);
  const [edit, setEdit] = useState(false);
  const dispatch        = useDispatch(); 

  function discard() {
    setEdit(false);
  }

  function deleteComment() {
    dispatch(_.deleteComment(
      { 
        id: comment.id, 
        comment: { 
          user_id: currentUser.id, 
        }
      }
    )); 
  };

  const [editedComment, setComment] = useState(comment.content); 

  function editComment() {
    if (editedComment && editedComment !== comment.content) {
    dispatch(_.updateComment(
      {
        id: comment.id,
        comment: {
          content: editedComment,
          user_id: currentUser.id
        }
      }
    ));
    setEdit(false);
  }
  }; 

  return (
    <Comment>
      <Comment.Avatar src={createIconUrl(comment.user.icon)} />
      <Comment.Content>
        <Comment.Author as={Link} to={`/users/${comment.user.username}`}>
          {comment.user.username}
          {comment.user.id === currentUser.id ?<>{' '}<Label size='mini' content='You'/> </>: null}
        </Comment.Author>
        <Comment.Metadata>
          <div>{formatDate(comment.created_at)}</div>
        </Comment.Metadata>
        <Comment.Text> 
          { edit ? (
            <Form>
              <TextArea 
                rows={3} value={editedComment} onChange={(e)=>setComment(e.target.value)}>
                </TextArea>
              <Button compact positive size='mini' onClick={editComment}>Save</Button>
              <Button compact secondary size='mini' onClick={discard}>Discard</Button>
            </Form>
          ): ( 
            comment.content
          )}
        </Comment.Text>
        { comment.user.id === currentUser.id ? (
          <Comment.Actions>
              <Comment.Action onClick={()=>setEdit(true)}>Edit</Comment.Action>
              <Comment.Action onClick={deleteComment}>Delete</Comment.Action>
           </Comment.Actions>
          ) : ( 
            null
          )
        }
      </Comment.Content>
    </Comment>
  )
}

export default CommentItem; 