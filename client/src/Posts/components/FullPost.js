import React, { useState } from 'react';
import {
  Card,
  Grid,
  Dropdown,
  Container,
  Header,
  Image,
  Label,
  List,
  Divider,
  Accordion,
  Icon,
} from 'semantic-ui-react';
import LinkedPost from './LinkedPost';
import EmbeddedPost from './EmbeddedPost';
import Comments from '../../Comments/components/CommentList';
import { createIconUrl, formatDate } from '../../Helpers';
import { useSelector, useDispatch } from 'react-redux'
import { post } from '../../store';

function FullPost({ post, author }) {

  const { currentUser } = useSelector((state)=>state.session);

  return(
     <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Card fluid>
        <Card.Content>
            <Grid stretched>
              <Grid.Column width='10' floated='left'>
                <Header>{post.title}</Header>
              </Grid.Column>
              <Grid.Column floated='right'>
                { currentUser.id === author.id ? (
                  <Dropdown icon='ellipsis horizontal'>
                    <Dropdown.Menu direction='left'>
                      <Dropdown.Item icon='pencil'>
                        Edit Post
                      </Dropdown.Item>
                      <Dropdown.Item icon='trash'>
                        Delete Post
                      </Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>
                 ) : (
                  null
                )
                }
              </Grid.Column>
            </Grid>
            <Label.Group size='mini'>
              { post.tags.map((tag)=>{
                return <Label color='teal'>{tag.name}</Label>
              })}
            </Label.Group>
        </Card.Content>
        <Card.Content>
          <Grid stretched divided style={{ height: 600}}> 
            <Grid.Column style={{ height: 600 }} width={10}> 
              {post.embeddable ?
                <EmbeddedPost url={post.link}/>
              :
               <LinkedPost url={post.link} imageUrl={post.preview_image}/>
              }
              <Container>
                 <PostContent content={post.content}/> 
              </Container>
            </Grid.Column>
            <Grid.Column style={{ height: 600 }} width={6}>
                <List>
                  <List.Item>
                    <Image avatar src={createIconUrl(author.icon)}/>
                    <List.Content>
                      <List.Header content={author.username}/>
                      <List.Description>{formatDate(post.created_at)}</List.Description>
                    </List.Content>
                  </List.Item>
                </List>
                <Comments/>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    </Container>
  )
}

function PostContent({ content }) {

  const [show, setShow] = useState(true);

  return(
      <Accordion>
        <Accordion.Title active={show} onClick={()=>setShow(!show)}>
          <Icon name='dropdown'/>
          Description
        </Accordion.Title>
        <Accordion.Content active={show}>
          <p>{content}</p>
        </Accordion.Content>
      </Accordion>
  )

}

function PostHeader({ title, username, tags }) {
  
}

export default FullPost;