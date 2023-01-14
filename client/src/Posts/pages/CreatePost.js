import React, { useState } from 'react';
import { Container, 
         Step,
         Tab } from 'semantic-ui-react';
import { TitleAndImageInput,
         ContentAndDescription } from '../components';
import { useSelector } from 'react-redux';

function CreatePost() {

  const [active, setActive] = useState(0);
  const { id } = useSelector((state)=>state.session.currentUser);

  function nextPage() {
    setActive( active + 1); 
  }

  function prevPage() {
    setActive(active - 1); 
  }
  const [postData, setData] = useState(
    { post: {
      title: '',
      preview_image: '',
      tags: [],
      user_id: id,
      content: '',
      link: ''
    }}
  )

  const panes = [
    { render: () => <Tab.Pane>
                      <TitleAndImageInput 
                        setPostTitle={setPostTitle}
                        setPostImage={setPostImage}
                        title={postData.post.title}
                        preview_image={postData.post.preview_image}
                        nextPage={nextPage}/>
                    </Tab.Pane>},
    { render: () => <Tab.Pane>
                      <ContentAndDescription
                        nextPage={nextPage}
                        prevPage={prevPage}
                      />
                    </Tab.Pane>},
    { render: () => <Tab.Pane><h1>Categories</h1></Tab.Pane>},
    { render: () => <Tab.Pane><h1>hey</h1></Tab.Pane>}
  ]

  function handleStepClick(e, { value }) {
    setActive(value);
  }

  function setPostTitle(title) {
    setData({ post: {
      ...postData.post, 
      title: title
    }})
  }

  function setPostImage(url) {
    setData({ post: {
      ...postData.post,
      preview_image: url
    }})
  }
  return (
    <Container>
    <div>{JSON.stringify(postData)}</div>
    <Step.Group size='small'>
      <Step
        value={0}
        active={active === 0}
        onClick={handleStepClick}
        icon='hashtag'
        title='Title and Preview'
        description='Choose a title and preview image for your post'
      />
      <Step
        value={1}
        active={active === 1}
        onClick={handleStepClick}
        icon='linkify'
        link
        title='Content and description'
        description='Add content and a description to your post'
      />
      <Step
        value={2}
        active={active === 2}
        onClick={handleStepClick}
        icon='tags'
        link
        title='Add tags'
        description='Add categories to your post'
      />
      <Step
        value={3}
        active={active == 3}
        onClick={handleStepClick}
        icon='checkmark'
        link
        title='Submit'
        description='Submit your post'
      />
    </Step.Group>
    <Tab
      panes={panes}
      activeIndex={active}
    />
    </Container>
  )

}

export default CreatePost; 