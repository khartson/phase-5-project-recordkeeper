import React from 'react';
import Embed from 'react-embed';

function EmbeddedPost({ url }) {

  return (
    <Embed url={url}/>
  )

}

export default EmbeddedPost;