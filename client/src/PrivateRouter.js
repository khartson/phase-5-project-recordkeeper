import React from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import { Main } from './Common';

function PrivateRouter() {
  return(
      <Main>
        <Routes>
        <Route path='/' element={<h1>Home</h1>}/>
        <Route path='/feed' element={<h1>Feed</h1>}/>
        <Route path='/profile' element={<h1>Profile</h1>}/>
        <Route path='/settings' element={<h1>Settings</h1>}/>
        <Route path='/*' element={<Navigate to='/'/>}/>
        </Routes>
      </Main>
  )
}

export default PrivateRouter;