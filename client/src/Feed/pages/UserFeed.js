import React, { createRef, useEffect } from 'react'; 
import { FeedMenu } from '../components';
import { FeedPosts } from '../../Posts';
import { Image, 
         Segment,
         Ref,
         Sticky,
         } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { feed as _ } from '../../store';

function UserFeed() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(_.posts());

  }, [dispatch]);

  const contextRef = createRef();
  
  return(
  <div>
  <Ref innerRef={contextRef}>
  <div>
    <Sticky offset={95} pushable context={contextRef}>
      <FeedMenu/>
    </Sticky>
    <FeedPosts/>
  </div>
  </Ref>
  </div>
  )
} 

export default UserFeed; 