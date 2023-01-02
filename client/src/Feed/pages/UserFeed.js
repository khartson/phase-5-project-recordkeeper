import React, { useState } from 'react'; 
import { FeedMenu } from '../components';
import UnsplashReact, { InsertIntoApplicationUploader } from "unsplash-react"
import { Image } from 'semantic-ui-react';

function UserFeed() {

  const [imageUrl, setImageUrl] = useState('');

  return(
  <>
    <FeedMenu/>
    {/* <div>{process.env.REACT_APP_VARIABLE}</div> */}
    {/* <Image src={imageUrl}/> */}
      {/* <UnsplashReact
        accessKey={process.env.REACT_APP_UNSPLASH_KEY}
        applicationName="unsplash_react"
        Uploader={InsertIntoApplicationUploader}
        photoRatio={16 / 9}
        preferredSize={{ width: 800, height: 450 }}
        onFinishedUploading={(imageUrl) => setImageUrl(imageUrl)}
      /> */}

    <h1> feed </h1>
  </>
  )
} 

export default UserFeed; 