import React, { createRef, useEffect } from 'react'; 
import { FeedMenu } from '../components';
import { FeedPosts } from '../../Posts';
import { Ref,
         Sticky,
         } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { feed as _ } from '../../store';

function UserFeed() {

  const dispatch = useDispatch();
  const { posts, tags, users }    = useSelector((state)=>state.feed);

  useEffect(()=>{
    dispatch(_.posts());
    dispatch(_.tags());
    dispatch(_.users());
  }, [dispatch]);

  const contextRef = createRef();
  
  if (posts && tags && users) return(
  <div>
  <Ref innerRef={contextRef}>
  <div>
    <Sticky offset={95} context={contextRef}>
      <FeedMenu/>
    </Sticky>
    <FeedPosts/>
  </div>
  </Ref>
  </div>
  )
  return <h1>No Posts</h1>
} 

export default UserFeed; 