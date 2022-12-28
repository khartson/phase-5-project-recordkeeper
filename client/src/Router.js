import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './store';
import { Auth } from './Auth';

function Router() {

  const user     = useSelector((state)=>state.session.user);
  // const errors   = useSelector((state)=>state.session.errors);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
    { user ? (
      <Routes>
        <Route path='/' element={<div>Home</div>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
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