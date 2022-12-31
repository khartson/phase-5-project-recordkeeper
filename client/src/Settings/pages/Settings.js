import React from 'react';
import { Tab,
         Segment
       } from 'semantic-ui-react';
import { DeleteAccount, 
         EditProfile, 
         ChangePassword 
        } from '../components';
import { useSelector } from 'react-redux';
function Settings() {
  
  const { currentUser, errors } = useSelector((state)=>state.session); 
  const panes = [
    { menuItem: { key: 'profile', icon: 'pencil', content: 'Edit Profile'}, 
      render: () => <Tab.Pane><EditProfile/></Tab.Pane> },
    { menuItem: { key: 'password', icon: 'lock', content: 'Change Password'}, 
      render: () => <Tab.Pane><ChangePassword errors={errors}/></Tab.Pane> },
    { menuItem: { key: 'account', icon: 'trash', content: 'Delete accout', color: 'red'}, 
      render: () => <Tab.Pane><DeleteAccount/></Tab.Pane> },
  ]

  return (
    // <Segment raised>
    <Tab menu={{ fluid: true, tabular: true, vertical: true }} panes={panes}/>
    // </Segment>
  )
}

export default Settings; 