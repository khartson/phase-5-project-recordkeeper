import React, { useEffect, useState } from 'react';
import { Segment,
         Form,
         Input,
         Divider,
         Grid,
         Image,
         Modal, 
         Button,
         Header,
         Message} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageSelection, LinkSelection } from '../components';
import { feed as feed } from '../../store';
import { post as _ } from '../../store'; 
import { Link } from 'react-router-dom';


function CreatePost() {

  /*
        TODO: 
        - add validation handling
        - clear post + errors on submission, udpate them once 
          fetch request done
        - pop up modal  after submission with option to redirect
          to either feed or post focus view
  */


  // get the currently existing tags from redux
  const { tags } = useSelector((state)=>state.feed);
  const { post, errors, status } = useSelector((state)=>state.post);
  const dispatch = useDispatch();
  // create an array for the dropdown menu using the
  // redux tags - it needs to be stored in state to handle
  // creating a tag for a post during the lifecycle of the 
  // component 
  const [tagOptions, setOptions] = useState([]);

  // onSuccess 
  // the post is cleared on render, so a post only exists in state if
  // the post request was successful -> set this varialbe to true and display a message with
  // a link to the  post or home feed


  // if tags are already in global state (from visiting /feed)
  // then just get them from redux. if not, dispatch a fetch
  // request to get the tags. For either case, add them
  // to the state array
  useEffect(()=>{
    dispatch(_.clearPost());
    if (!tags) {
      dispatch(feed.tags());
    } else {
      setOptions(tags.map((tag)=>{
      return { text: tag.name, value: tag.name }
    })
    )
  }
  }, [dispatch, tags])

  // get id of current user to create post / author relationship 
  // on creation 
  const { id } = useSelector((state)=>state.session.currentUser);

  // state for post data that will be sent in POST request
  const [data, setData] = useState({
    post: {
      user_id: id,
      title: '',
      content: '',
      link: '',
      embeddable: false,
      preview_image: ''
    },
    tags: []
  });

  // set image url selection for preview image 
  function handleImageSelection(url) {
   setData({
    post: {
      ...data.post,
      preview_image: url
    },
    tags: [...data.tags]
   })
  }

  // for typical form submissions, set the attribute value
  // of the POST data accoridng to the name and value
  // target of the form 
  function handleDataChange(e) {
    const { value, name } = e.target
    setData({ 
      post: {
        ...data.post,
        [name]: value,
      },
      tags: [...data.tags]
    });
  }

  // whether or not user wants to handle link 
  // presentation as an embed (gist, youtube, etc.)
  // or simply present it as a hyperlink. There is a 
  // component to test if the link is embeddable or not
  function handleEmbedChange() {
    setData({
      post: {
        ...data.post,
        embeddable: !data.post.embeddable
      },
      tags: [...data.tags]
    })
  }

  // posts can only contain up to three tags, 
  // this is also validated on backend 
  function handleTagSelection(e, { value }) {
    if (value.length <= 3) {
      setData({
        ...data,
        tags: value
      })
    }
  }

  // if a user wants to add a tag that does not exist, 
  // they can do so in the dropdown, which will add it temporarily
  // via state and then upon Post creation, tags will be added
  // with a find_or_create_by method 
  function handleTagCreation(e, { value }) {
    setOptions([...tagOptions, { text: value, value: value }])

  }

  // post creation handler 
  function handleCreatePost() {
    dispatch(_.create(data));
  }

  return (
  <> 
  <div>{JSON.stringify(errors)}</div>
  { status === 'idle' && post ? (
    <Message success>
      <Image inline spaced style={{ width: 40, height: 40, objectFit: 'cover' }} src={post.preview_image}/>
      Post created! <Link to={`posts/${post.id}`}><b>Click here to view it</b></Link> or <Link to='/feed'><b>go back to the main feed</b></Link>
    </Message>

  ) : ( <div>No post yet</div> )}
  <Header icon as='h2' textAlign='center'>
    <Image src='/logo.svg'/>
    <Header.Content>New Post
    <Header.Subheader>Share a video, blog post, or code snippet for other users</Header.Subheader>
    </Header.Content>
  </Header>
  <Segment clearing>
    <Form loading={status === 'loading'}>
    <Form.Field 
        control='input' label='Post Title'
        size='huge' 
        placeholder='Enter a title...'
        value={data.post.title} name='title'
        onChange={handleDataChange}
        error={ errors["title"] ? { content: errors["title"] } : false }
    >
    </Form.Field>
    <Form.Field 
      control='textarea'required
      label='Content' value={data.post.content}
      onChange={handleDataChange} name='content'
      placeholder='Give your post a description'
      error={ errors["content"] ? { content: errors["content"] }: false }
    />
    <Form.Dropdown
     multiple placeholder='Add tags to your post'
     options={tagOptions} value={data.tags}
     onChange={handleTagSelection}
     search fluid selection label={`(Optional) Add tags to your post`}
     allowAdditions onAddItem={handleTagCreation}
    />
  </Form>
    <Segment padded={'very'}>
      <Grid columns={2} relaxed='very'>
        <Grid.Column verticalAlign='middle' textAlign='center'>
          <Modal trigger={
                <Button primary icon='linkify' 
                inverted={!data.post.link}
                content={data.post.link? 'Edit your content link' : 'Add a content link to your post'}
                />}
                header='Link or embed the primary content of your post here.'
                content={<LinkSelection
                  link={data.post.link}
                  embeddable={data.post.embeddable}
                  setLink={handleDataChange}
                  handleEmbedChange={handleEmbedChange}
                />} size='large'
                actions={[{key: 'done', content: 'Done', positive: true}]}
          />
          { errors["link"] ? <Message size='mini' negative>{errors["link"]}</Message>: null}
        </Grid.Column>
        <Grid.Column verticalAlign='middle' textAlign='center'>
          <Modal
            trigger={<Button inverted={!data.post.preview_image} primary icon='camera' 
                     content={data.post.preview_image? 'Change preview image' : 'Select preview image'}
                     />}
            content={<ImageSelection 
                      preview_image={data.post.preview_image}
                      setImage={handleImageSelection}
                    />}
          />
          { errors["preview_image"] ? <Message size='mini' negative>{errors["preview_image"]}</Message> : null }
        </Grid.Column>
      </Grid>
      <Divider vertical>and</Divider>
    </Segment>
    { status === 'idle' && post ? (
      <Message success>
        <Image inline spaced style={{ width: 40, height: 40, objectFit: 'cover' }} src={post.preview_image}/>
        Post created! <Link to={`posts/${post.id}`}><b>Click here to view it</b></Link> or <Link to='/feed'><b>go back to the main feed</b></Link>
      </Message>
      ) : ( 
        <Button onClick={handleCreatePost} floated='right' color='teal'>Submit</Button>
      )}
    </Segment>
  </>
  )

}

export default CreatePost; 