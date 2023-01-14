import React, { useState } from 'react'; 
import { Divider, 
         Header, 
         Icon, 
         Input, 
         Placeholder, 
         Image,
         Container, 
         Button,
         Segment } from 'semantic-ui-react';
import UnsplashReact, { InsertIntoApplicationUploader } from 'unsplash-react';

function TitleAndImageInput(
  { setPostTitle, setPostImage, title, preview_image, nextPage }
) {

  const [editable, setEdit] = useState(true);
  function handleInputSubmit(e) {
    if (e.key === 'Enter' && e.target.value) {
      setEdit(false);
      setPostTitle(e.target.value);
    }
  }

  function handleTitleChange(e) {
    setPostTitle(e.target.value);
  }

  function handleImageAdd(imageUrl) {
    setPostImage(imageUrl);
  }

  function handleImageRemove() {
    setPostImage('');
  }

  return (
    <Segment>
      <Container style={{ display: 'flex'}}>
        <Container>
          <Button floated='right' 
                  compact disabled={!preview_image || !title}
                  onClick={nextPage}>
                  Next
          </Button>
        </Container>
      </Container>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='text cursor'/>
          Give your post a title
        </Header>
      </Divider>
      <div style={{ padding: '30px', display: 'flex', justifyContent: 'center'}}>
        {editable ? ( 
          <Input
            onKeyUp={handleInputSubmit}
            onChange={handleTitleChange}
            value={title}
            size='massive' 
            placeholder='Enter a title...'
            transparent/> ) : 
          (
            <Header
              size='huge'
              onMouseOver={(e)=>e.target.style.color='grey'}
              onMouseLeave={(e)=>e.target.style.color=''}
              onClick={()=>setEdit(true)}
          >{title}</Header>
          )
        }
      </div>

      <Divider horizontal>
        <Header as='h4'>
          <Icon name='photo'/>Choose a preview image
        </Header>
      </Divider>      
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          {preview_image? (
              <Image
                label={{ 
                         as: 'a',
                         ribbon: 'right', 
                         icon: 'remove', 
                         onClick: handleImageRemove
                       }}
                bordered 
                src={preview_image} 
                size='medium'/>
          ) : (
            <div>
            <Placeholder style={{ height: 200, width: 300 }}>
              <Placeholder.Image/>
            </Placeholder>
            </div>
          )}
        </div>   
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: "500px", width: "1000px" }}>
            <UnsplashReact
              accessKey='tSyEEmECOL6exUQ7VSC6Jn8mlgOuAJa7tpTOsKEutrw'
              applicationName="unsplash_react"
              Uploader={InsertIntoApplicationUploader}
              photoRatio={16 / 9}
              onFinishedUploading={handleImageAdd}
            />
          </div>
        </div>
    </Segment>
  )
}

export default TitleAndImageInput;