import React from 'react';
import { Segment, List, Container, Image } from 'semantic-ui-react';


function Footer() {
  return(
        <Segment inverted style={{ position: 'absolute', left: 0, bottom: 0, right: 0, margin: '5em 0em 0em', padding: '1em 0em' }} vertical>
          <Container textAlign='center'>
            <List horizontal inverted divided link size='small'>
              <List.Item>
                <Image src='/logo_no_bg.svg' size='tiny' />
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Icon name='github'/>
                  <a href='https://github.com/khartson'>Github</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Icon name='linkedin'/>
                  <a href='https://www.linkedin.com/in/kyle-hartson/'>LinkedIn</a>
                </List.Content>
              </List.Item>
            </List>
          </Container>
        </Segment>
  )
}

export default Footer;