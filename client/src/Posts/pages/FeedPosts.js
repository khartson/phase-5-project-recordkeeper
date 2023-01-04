import React from 'react';
import { useSelector } from 'react-redux';
import { FeedPost } from '../components';
import { Feed, Item, Segment, 
                  } from 'semantic-ui-react';

function FeedPosts() {

  const { posts } = useSelector((state)=>state.feed);
  if (posts) return (
    // <Segment>
      <Item.Group divided>
        {posts.data.map((post)=><FeedPost post={post}/>)}
      </Item.Group>
    // </Segment>
  )
  return <h1>No Posts</h1>

}

export default FeedPosts;