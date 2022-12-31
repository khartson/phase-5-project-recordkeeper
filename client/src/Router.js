import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { session } from './store';
import { Auth } from './Auth';
import PrivateRouter from './PrivateRouter';

function Router() {

  const currentUser = useSelector((state)=>state.session.currentUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(session.me());
  }, [dispatch]);

  return (
    <>
    { currentUser? (
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