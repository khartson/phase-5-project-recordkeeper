import React, { useEffect } from 'react';
import { Button, 
         Image, 
         List, 
         Modal,
         Segment,
         Container,
         Header,
         Divider
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { post as _ } from '../../store';
import { createIconUrl } from '../../Helpers';
import Embed from 'react-embed';

function Post({ id }) {

  const dispatch = useDispatch(); 
  const { post, status } = useSelector((state)=> state.post);
  const { currentUser }  = useSelector((state)=> state.session); 

  useEffect(()=> {
    dispatch(_.show(id));
  }, [dispatch, id]); 

  if (status === 'loading') return <h1>Loading</h1>
  if (post) {
    const date = new Date(post.created_at).toLocaleDateString(); 
    return (
      <>
      <Segment style={{ backgroundSize: 'cover', backgroundImage: `url(${post.preview_image})`}} padded>
        <Modal.Header>
          <List style={{ background: 'white', borderRadius: '5px', padding: '5px'}}relaxed>
            <List.Item>
              <Image avatar src={createIconUrl(post.author.icon)}/>
              <List.Content>
                <List.Header>{post.author.username}</List.Header>
                <List.Description>{date}</List.Description>
              </List.Content>
              {post.author.username === currentUser.username? (
                <List.Content floated='right'>
                  <Button compact>Edit</Button>
                </List.Content>
              ) : null }
            </List.Item>
          </List>
        </Modal.Header>
        <Divider/>
      </Segment>
        <Modal.Content>
          <Header as='h1'>{post.title}</Header>
          <Divider/>
          <Container text>
            {post.embeddable? (
            <Embed url={post.link}/>
          ) : (
            <List>
              <List.Item>
                <List.Icon name='linkify'/>
                <List.Content>
                  <a href={post.link}>{post.link}</a>
                </List.Content>
              </List.Item>
            </List>
          )} 
          {post.content}
          </Container>
        </Modal.Content>
      </>
    )
  } else {
    return <h1>No Post Found</h1>
  }
}

export default Post; 