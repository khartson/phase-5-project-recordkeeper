import React from 'react';
import { Card, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'; 
import { createIconUrl } from '../../Helpers';

function UserPost({ post }) {
  return(
    <Card style={{ height: 390, margin: 10 }} as={Link} to={`/posts/${post.id}`}
      image={<img src={post.preview_image} height={200} style={{ objectFit: 'cover' }}/>}
      header={post.title}
      meta={
        <>
          <Image style={{ height: 15, width: 15}} avatar inline src={createIconUrl(post.author.icon)}/>
          {post.author.username}
        </>}
      description={post.summary}
      extra={
        <div style={{ minHeight: 25.7}}>
        {
        post.tags.map((tag)=>
        { return <Label color='teal' content={tag.name} key={`${post.id}+${tag.id}`} />
        })
        }
        </div>
      }
    />
  )

}

export default UserPost; 

