import React from 'react';
import { useSelector } from 'react-redux';
import { FeedPost } from '../components';
import { Feed, Item, Segment, 
                  } from 'semantic-ui-react';

function FeedPosts() {

  const { posts, status } = useSelector((state)=>state.feed);
  if (posts) return (
      <Item.Group divided>
        {posts.data.map((post)=><FeedPost key={post.id} post={post}/>)}
      </Item.Group>
  ) 
  return <h1>No Posts</h1>

}

export default FeedPosts;