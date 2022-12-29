import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './store';
import { Auth } from './Auth';
import PrivateRouter from './PrivateRouter';

function Router() {

  const user = useSelector((state)=>state.session.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
    { user? (
      <PrivateRouter/>
    ) : (
      <Routes>
        <Route path='*' element={<Navigate to='/auth/login'/>}/>
        <Route path='/auth/*' element={<Auth/>}/>
      </Routes>
    )}
    </>
  )

}

export default Router; 