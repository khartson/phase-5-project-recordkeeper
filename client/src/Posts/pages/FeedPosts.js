import React from 'react';
import { useSelector } from 'react-redux';
import { FeedPost } from '../components';
import { Item     } from 'semantic-ui-react';

function FeedPosts() {

  // TODO - create pages for loading and no results requests
  const { posts, status } = useSelector((state)=>state.feed);
  if (posts.data && posts.data.length !== 0) {
    return (
      <Item.Group divided>
        {posts.data.map((post)=><FeedPost key={post.id} post={post}/>)}
      </Item.Group>
  )} else if (status === 'loading') {
    return <h1>Loading</h1>
  } 
  return <h1>No Posts</h1>

}

export default FeedPosts;