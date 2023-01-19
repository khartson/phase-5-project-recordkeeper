import React from 'react';
import { 
  Container,
  Image,
  List,
  Icon
} from 'semantic-ui-react';
function LinkedPost({ url, imageUrl}) {

  return (
    <Container textAlign='center'>
      <Image style={{ height: '300px', width: '100%', objectFit: 'cover'}} src={imageUrl}/>
      <List>
        <List.Item>
          <List.Content>
            <Icon name='linkify'/>
            <a href={url}>{url}</a>
          </List.Content>
        </List.Item>
      </List>
    </Container>
  )


}

export default LinkedPost;