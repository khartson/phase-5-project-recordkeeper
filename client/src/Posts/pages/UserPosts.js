import React from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react'; 
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking-inline.css';
import { UserPost } from '../components';

function UserPosts({ posts, commentedPosts, username }) {
  return(
  <>
  <Segment>
    <Header color='gray'>Posts by {username}</Header>
    <Divider/>
    <Flicking moveType='freeScroll' bound={true}>
      {posts.map((post)=>{
        return(
        <span key={post.id}>
          <UserPost post={post}/>
        </span>
        )
      })}
    </Flicking>
  </Segment>
  <Segment>
    <Header color='gray'>{username}'s Commented Posts</Header>
    <Divider/>
    <Flicking moveType='freeScroll' bound={true}>
      {commentedPosts.map((post)=>{
        return(
          <span key={post.id}>
            <UserPost post={post}/>
          </span>
        )
      })}
    </Flicking>
  </Segment>
  </>
  )
}

export default UserPosts