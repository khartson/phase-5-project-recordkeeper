import React from 'react'
import { Item, 
         Image,
         Label,
         Modal,
         Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { createIconUrl } from '../../Helpers';
import Post from './Post';
import { useSelector } from 'react-redux';

function FeedPost({ post }) {
  const { author, tags } = post;
  const { currentUser  } = useSelector((state)=>state.session);
  return (
    <>
    <Item>
      
      <Image style={{ width: 200, height: 150, objectFit: 'cover'}} src={post.preview_image}/>
      <Item.Content>
        <Modal
         centered={false}
         content={<Post id={post.id}/>}
         trigger={<Item.Header as={Link}>{post.title}</Item.Header>}
        />
        <Item.Meta>
          <Image style={{ height: '20px', width: '20px' }}avatar src={createIconUrl(author.icon)}/><Link to={`/users/${author.username}`}>{author.username}</Link>
          { author.id === currentUser.id ? <Label size='tiny'>You</Label> : null}
        </Item.Meta>
        <Item.Extra>{post.summary}</Item.Extra>
        <Item.Extra>
          {tags.map((tag)=><Label key={tag.id} circular size='tiny' color='teal' content={tag.name}/>)}
        </Item.Extra>
        <Item.Extra>
        <Dropdown icon='ellipsis horizontal'>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/posts/${post.id}`}>View Post</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Item.Extra>
      </Item.Content>
    </Item>
    </>
  )
}

export default FeedPost;