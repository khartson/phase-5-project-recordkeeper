import React, { useEffect, useState } from 'react';
import { 
  Placeholder,
         } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { post as _, user } from '../../store';
import { FullPost } from '../components';

function PostView() {
  
  const dispatch = useDispatch();

  const { id } = useParams();

  const { post, status } = useSelector((state)=>state.post); 
  const author = post?.author;

  useEffect(()=>{

    if (!post || post.id !== id) {
      dispatch(_.show(id));
    }



  }, [id]);

  if (status === 'loading') {
    return (
    <Placeholder fluid>
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
    </Placeholder>
    )
  }
  if (!post) return <h1>No post found</h1>

  return (<FullPost post={post} author={author}/>)

}

export default PostView;