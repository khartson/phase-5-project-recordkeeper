import React, { useState } from 'react';
import { Dropdown,
         Menu, 
         Segment,
         Pagination,
         Button,
         Icon,
        } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
// import AsyncSelect from 'react-select'; 
import { feed as _ } from '../../store'; 
import { createIconUrl } from '../../Helpers';

function FeedMenu() {

  const dispatch = useDispatch(); 
  
  // pagination metadata
  const { meta } = useSelector((state)=>state.feed.posts);
  const { users } = useSelector((state)=>state.feed);


  function handlePaginationChange(e, { activePage }) {
    const url = meta.scaffold_url.replace(/__pagy_page__/, activePage);
    dispatch(_.posts({ url: url}));
  }

  const userOptions = users.map((user)=>{
    return { key: user.id, 
             text: user.username, 
             value: user.id,
             image: { avatar: true, src: createIconUrl(user.icon)},
            }
  })


  const [params, setParams] = useState({ user: null });
  function onUserQueryChange(e) {
    console.log(e.target.value);
  }

  function onUserSelection(e, { value }) {
    setParams({...params, user: value})
  }

  function filterPosts() {
    dispatch(_.posts({ query: params }));
  }
  return(
    <Segment raised>
      <Menu size='large' color='teal' inverted secondary>
        <Menu.Item>
          <span>
          Show me <b>posts</b> by: {' '}
          <Dropdown 
            clearable
            search 
            options={userOptions}
            onSearchChange={onUserQueryChange}
            onChange={onUserSelection}/>
          </span>
        </Menu.Item>
        <Menu.Item>
          <span>
            Tagged with: {' '}
            <Dropdown inline search />
          </span>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button.Group size='tiny'>
              <Button 
                inverted
                basic
                icon='filter'
                compact
                content='Go'
                onClick={filterPosts}
                />
            </Button.Group>
          </Menu.Item>
          <Pagination secondary size='tiny'
            activePage={meta.page}
            totalPages={meta.last}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={handlePaginationChange}
          />
        </Menu.Menu>


      </Menu>
    </Segment>
  )

}

export default FeedMenu;