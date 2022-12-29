import React from 'react'; 
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import { Main } from './Common';
import { Users } from './Users';

function PrivateRouter() {
  return(
      <Main>
        <Routes>
        <Route path='/' element={<h1>Home</h1>}/>
        <Route path='/feed' element={<h1>Feed</h1>}/>
        <Route path='/profile' element={<h1>Profile</h1>}/>
        <Route path='/settings' element={<h1>Settings</h1>}/>
        {/* <Route path='/users' element={<>
                                        <h1>User</h1>
                                        <nav><Link to='profile'>proile</Link>
                                             <Link to='account'>account</Link>
                                             <Outlet/>
                                       </nav>
                                       </>}>
          <Route path='profile' element={<h1>profile</h1>}></Route>
          <Route path='account' element={<h1>account</h1>}/>
          <Route path=':username' element={<h1>specific user</h1>}/>
        </Route> */}
        <Route path='/users' element={<Users/>}>
          <Route index element={<h1>User List</h1>}/>
          <Route path=':id' element={<h1>User</h1>}/>
        </Route>
        <Route path='/*' element={<Navigate to='/'/>}/>
        </Routes>
      </Main>
  )
}

export default PrivateRouter;