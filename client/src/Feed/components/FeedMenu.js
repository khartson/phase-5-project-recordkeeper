import React, { useState } from 'react';
import { Menu, 
         Segment,
         Pagination,
         Button,
         Icon,
         Label,
         List,
        } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { feed as _ } from '../../store'; 
import { createIconUrl } from '../../Helpers';
import AsyncSelect from 'react-select/async';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';

function FeedMenu() {


  const dispatch = useDispatch(); 
  
  // pagination metadata
  const { meta } = useSelector((state)=>state.feed.posts);
  const { users, tags } = useSelector((state)=>state.feed);

  // pagination helper function, fires a 
  // get request for next page of results on change
  function handlePaginationChange(e, { activePage }) {
    const url = meta.scaffold_url.replace(/__pagy_page__/, activePage);
    dispatch(_.posts({ url: url}));
  }


  // DEBOUNCED USER SEARCH FUNCTIONS 
  // initial, random set of users to populate 
  // dropdown
  const initialUsers = users.map((user)=>{ 
    return { value: user.id, label: user.username, icon: user.icon}
  }); 

  // fetch user requests on typed query -> load the results
  // into the dropdown menu 
  const _loadUserSuggestions = (query, callback) => {
    axios.get(`/search/?user=${query}`).then((r)=>{
      callback(r.data.data.map((r)=>{ 
        return { value: r.id, label: r.username, icon: r.icon}
      }
      ))}
    );
  }

  // needs to be debounced to not fire a get request every 
  // time char is typed by user
  const loadUserSuggestions = debounce(_loadUserSuggestions, 300);

  const [user, setUser]       = useState(null);
  const [filterTags, setTags] = useState([]);

  // Tag filter options
  function handleTagClick(e, data) {
    e.preventDefault();
    if (!filterTags.includes(data.value) && filterTags.length <= 3) {
      setTags(filterTags=> [...filterTags, data.value]);
    }
  }

  function handleTagRemove(e, data) {
    const newTags = filterTags.filter((tag)=>tag !== data.value);
    setTags(newTags);
  }

  function filterPosts() {
    if (user && filterTags.length > 0) {
      dispatch(_.posts({ query: { user: user.value, tags: filterTags } }));
    } else if (user) {
      dispatch(_.posts({ query: { user: user.value } }));
    } else if (filterTags.length > 0) {
      dispatch(_.posts({ query: { tags: filterTags } }))
    }
    else {
      dispatch(_.posts());
    }
  }
  return(
    <>
    <Segment raised> 
    <Flicking className="p-4 mb-4" moveType="freeScroll" bound={true}
              filterTags={filterTags}>
        {tags.map((tag)=>{
          return (
          <span key={tag.id}>
            <Label onClick={handleTagClick} as='a' href='#'
                   value={tag.id} content={tag.name}
                   style={{ marginRight: 10}} color='teal'/>
          </span>)
        })}
      </Flicking>
      <Menu size='small' color='teal' inverted secondary>
        <Menu.Item>
          <Icon name="user"/>
          <div style={{display: 'inline-block', width: 250}}>
          <AsyncSelect 
            placeholder='Search for a user...'
            value={user}
            isClearable
            onChange={(e)=>setUser(e)}
            loadOptions={loadUserSuggestions}
            defaultOptions={initialUsers}
            formatOptionLabel={user => (
              <Label image>
                <img alt={user.label} src={createIconUrl(user.icon)}/>
                {user.label}
              </Label>
            )}
          />
          </div>
        </Menu.Item>
        <Menu.Item>
          <Icon name='tags'/>
          <List horizontal>
            {tags.map((tag)=>{
              if (filterTags.includes(tag.id)) {
                return <Label size='tiny' onRemove={handleTagRemove} 
                              content={tag.name} value={tag.id}/>
              }
              return null;
            })}
          </List>
        </Menu.Item>
        <Menu.Item>
          {/* {user || filterTags.length > 0 ? <Label>Reset<Icon onClick={handleReset} name='delete'/></Label> : null} */}
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
          {/* <Pagination secondary size='tiny'
            activePage={meta.page}
            totalPages={meta.last}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={handlePaginationChange}
          /> */}
        </Menu.Menu> 
      </Menu>
          <Pagination secondary size='tiny'
            activePage={meta.page}
            totalPages={meta.last}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={handlePaginationChange}
          />
    </Segment> 
    </>
  )

}

export default FeedMenu;