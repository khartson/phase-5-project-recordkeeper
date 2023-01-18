import React from 'react';
import { Container,
         Grid,
         Placeholder,
         Image } from 'semantic-ui-react';
import UnsplashReact, { InsertIntoApplicationUploader } from 'unsplash-react'; 

function ImageSelection({ preview_image, setImage }) {
  
  const key = process.env.REACT_APP_UNSPLASH_KEY

  function handleImageUpload(imageUrl) {
    setImage(imageUrl);
  }

  return(
    <Container style={{ padding: 50 }}>
      <Grid columns={2}>
        <Grid.Column>
          <div style={{ display: "flex" }}>
          <div style={{ height: "350px", width: "450px" }}>
          <UnsplashReact
            accessKey={key}
            applicationName="unsplash_react"
            Uploader={InsertIntoApplicationUploader}
            photoRatio={16 / 9}
            preferredSize={{ width: 800, height: 450 }}
            onFinishedUploading={handleImageUpload}
            />
         </div>
         </div>
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
          {preview_image ? (
            <Image bordered style={{ height: 200, width: 200, objectFit: 'cover' }} src={preview_image}/>
          ) : ( 
            <Placeholder style={{ height: 150, width: 150}}>
              <Placeholder.Image/>
            </Placeholder>
          )}
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ImageSelection;