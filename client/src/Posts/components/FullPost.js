import React, { useEffect, useState } from 'react';
import {
  Card,
  Grid,
  Dropdown,
  Container,
  Header,
  Image,
  Label,
  List,
  Accordion,
  Icon,
  Form,
  Button,
  Message,
  Modal
} from 'semantic-ui-react';
import LinkedPost from './LinkedPost';
import EmbeddedPost from './EmbeddedPost';
import Comments from '../../Comments/components/CommentList';
import { createIconUrl, formatDate } from '../../Helpers';
import { useSelector, useDispatch } from 'react-redux'
import { post as _ } from '../../store';

function FullPost({ post, author }) {

  // TODO
  // - handle error handler callback
  //   this is a temporary fix 
  // - refactor into smaller components with redux

  // temporary fix 
  const { errors      }       = useSelector((state)=>state.post);
  useEffect(()=>{
    checkErrors();
  }, [errors]);
  const dispatch = useDispatch();

  const { currentUser }       = useSelector((state)=>state.session);
  const [edit, setEdit]       = useState(false);
  const [title, setTitle]     = useState(post.title);
  const [content, setContent] = useState(post.content);

  function discardChanges() {
    setEdit(false);
    setTitle(post.title);
    setContent(post.content);
    dispatch(_.clearErrors());
  }
  function checkErrors() {
    // debugger;
    if (errors.length === 0) {
      setEdit(false);
    }
  }

  function saveChanges(cb) {
    dispatch(_.update(
      { post: 
          { id: post.id,
            title: title, 
            content: content, 
            user_id: currentUser.id
           }
      }))
  }

  function deletePost(){
    dispatch(_.destroy(post.id)); 
  }

  return(
     <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Card fluid>
        <Card.Content>
            <Grid stretched>
              <Grid.Column width={10} floated='left'>
                <PostTitle errors={errors} title={post.title} editTitle={title}
                 edit={edit} setTitle={setTitle}/>
              </Grid.Column>
              <Grid.Column>
                { currentUser.id === author.id ? (
                  <Dropdown icon='ellipsis horizontal'>
                    <Dropdown.Menu direction='left'>
                      <Dropdown.Item onClick={()=>setEdit(true)}>
                        Edit Post
                      </Dropdown.Item>
                      <Modal 
                      trigger={
                      <Dropdown.Item icon='trash'>
                        Delete Post
                      </Dropdown.Item>}
                      header='Confirm'
                      content='Are you sure you want to delete your post?'
                      actions={[{ key: 'cancel', content: 'Cancel'}, 
                                { key: 'confirm', content: 'Confirm', 
                                  negative: true, onClick: deletePost}]}
                      />

                      
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
                 <PostContent content={post.content} editContent={content}
                 setContent={setContent} edit={edit} errors={errors}/> 
                 { errors["content"] ? <Message error>{errors["content"]}</Message> : null}
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
                <Comments comments={post.comments} postId={post.id}/>
            </Grid.Column>
          </Grid>
        </Card.Content>
        { edit ? ( 
          <Card.Content>
          <Button compact positive content='Save Changes'
          size='mini' onClick={saveChanges}/> 
          <Button compact inverted secondary size='mini'
          content='Discard Changes' onClick={discardChanges}/>
          </Card.Content>
        ) : null }
      </Card>
    </Container>
  )
}

function PostContent({ content, edit, setContent, editContent }) {

  const [show, setShow] = useState(true);

  return(
    <Accordion>
      <Accordion.Title active={show} onClick={()=>setShow(!show)}>
        <Icon name='dropdown'/>
        Description
      </Accordion.Title>
      <Accordion.Content active={show}>
        { edit ? ( 
          <Form>
            <Form.TextArea value={editContent} 
            onChange={(e)=>setContent(e.target.value)}
          />
          </Form>
        )
        : (
        <p>{content}</p>
        )}
      </Accordion.Content>
    </Accordion>
  )

}

function PostTitle({ title, editTitle, edit, setTitle, errors }) {

  return ( edit ? (
    <Form>
      <Form.Input size='huge' transparent value={editTitle}
      onChange={(e)=>setTitle(e.target.value)} placeholder='Edit your title'
      error={ errors["title"] ? { content: errors["title"] } : false }/>
    </Form>

  ) : <Header>{title}</Header> )   
}

export default FullPost;