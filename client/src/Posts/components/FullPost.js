import React from 'react';
import {
  Card,
  Grid,
  Dropdown,
  Container,
  Header,
  Image,
  Label,
  List,
  Divider
} from 'semantic-ui-react';
import LinkedPost from './LinkedPost';
import EmbeddedPost from './EmbeddedPost';
import { createIconUrl } from '../../Helpers';
import { useSelector, useDispatch } from 'react-redux'

function FullPost({ post, author }) {

  const { currentUser } = useSelector((state)=>state.session);

  return(
     <Container style={{ paddingTop: 10}}>
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
          <Grid stretched divided>
            <Grid.Column width={10}>
              {post.embeddable ?
                <EmbeddedPost url={post.link}/>
              :
               <LinkedPost/>
              }

            </Grid.Column>
            <Grid.Column width={6}>
              <div>
                <List>
                  <List.Item>
                    <Image avatar src={createIconUrl(author.icon)}/>
                    <List.Content>
                      <List.Header content={author.username}/>
                      <List.Description>Post on</List.Description>
                    </List.Content>
                  </List.Item>
                </List>
                <Divider/>
                </div>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default FullPost;