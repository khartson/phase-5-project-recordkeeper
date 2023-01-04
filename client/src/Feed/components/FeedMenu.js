import React, { useEffect, useState } from 'react';
import { Dropdown,
         Menu, 
         Segment,
         Pagination,
         Container,
        } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux'
import { feed as _ } from '../../store'; 

function FeedMenu() {

  const [params, setParams] = useState('');
  const dispatch = useDispatch(); 

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
      <Menu size='large' color='teal' inverted secondary>
        <Menu.Item>
          <span>
          Show me <b>posts</b> by: {' '}
          <Dropdown
           inline
           options={feedOptions}
           defaultValue={feedOptions[0].value}
          />
          </span>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Pagination size='tiny' secondary/>
        </Menu.Menu>


      </Menu>
    </Segment>
  )

}

export default FeedMenu;