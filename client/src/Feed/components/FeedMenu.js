import React from 'react';
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';

function FeedMenu() {

  const feedOptions = [
    { 
      key:  'videos',
      text: 'Videos',
      value: 'videos',
      icon: 'video'
    },
    {
      key:    'articles',
      text:   'Articles', 
      value:  'articles',
      icon:   'sticky note outline'
    }
  ]

  return(
    <Segment raised>
      <Menu color='teal' inverted secondary>
        <Menu.Item>
          <span>
          Show me: {' '}
          <Dropdown
           inline
           options={feedOptions}
           defaultValue={feedOptions[0].value}
          />
          </span>
        </Menu.Item>


      </Menu>
    </Segment>
  )

}

export default FeedMenu;