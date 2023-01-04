import React from 'react'
import { Item, 
         Image,
         Label,
              } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { createIconUrl } from '../../Helpers';

function FeedPost({ post }) {
  const { author, tags } = post;

  return (
    <>
    <Item>
      <Item.Image size='small' src={post.preview_image}/>
      <Item.Content>
        <Item.Header as={Link}>{post.title}</Item.Header>
        <Item.Meta><Image style={{ height: '20px', width: '20px' }}avatar src={createIconUrl(author.icon)}/><Link to={`/users/${author.username}`}>{author.username}</Link></Item.Meta>
        <Item.Extra>{post.summary}</Item.Extra>
        <Item.Extra>
          {tags.map((tag)=><Label key={tag.id} circular size='tiny' color='teal' content={tag.name}/>)}
        </Item.Extra>
      </Item.Content>
    </Item>
    </>
  )
}

export default FeedPost;