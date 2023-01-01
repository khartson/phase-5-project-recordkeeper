import React from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import { Main } from './Common';
import { Users, User } from './Users';
import { Settings } from './Settings';
import { UserFeed } from './Feed';

function PrivateRouter() {
  return(
      <Main>
        <Routes>
        <Route path='/' element={<h1>Home</h1>}/>
        <Route path='/feed' element={<UserFeed/>}/>
        <Route path='/profile' element={<h1>Profile</h1>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/users' element={<Users/>}>
          <Route path=':username' element={<User/>}/>
        </Route>
        <Route path='/*' element={<Navigate to='/'/>}/>
        </Routes>
      </Main>
  )
}

export default PrivateRouter;