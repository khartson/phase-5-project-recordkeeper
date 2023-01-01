import React from 'react';
import { Tab,
       } from 'semantic-ui-react';
import { DeleteAccount, 
         EditProfile, 
         ChangePassword 
        } from '../components';
function Settings() {

  const panes = [
    { menuItem: { key: 'profile', icon: 'pencil', content: 'Edit Profile'}, 
      render: () => <Tab.Pane><EditProfile/></Tab.Pane> },
    { menuItem: { key: 'password', icon: 'lock', content: 'Change Password'}, 
      render: () => <Tab.Pane><ChangePassword/></Tab.Pane> },
    { menuItem: { key: 'account', icon: 'trash', content: 'Delete account', color: 'red'}, 
      render: () => <Tab.Pane><DeleteAccount/></Tab.Pane> },
  ]

  return (
    <Tab menu={{ fluid: true, tabular: true, vertical: true }} panes={panes}/>
  )
}

export default Settings; 