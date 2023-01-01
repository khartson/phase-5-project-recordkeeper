import React, { useEffect } from 'react';
import { CreateAccount, Login } from '../components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { session } from '../../store';

function Auth() {

  const dispatch = useDispatch();

  let location = useLocation();

  // wrap location listener in useEffect to
  // avoid React error, cannot update component
  // while rendering a different component
  // https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
  useEffect(() => {
    if (['/auth/login', '/auth/signup'].includes(location.pathname)) {
    dispatch(session.clearErrors()); 
  }
  }, [location.pathname]);

  return( 
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<CreateAccount/>}/>
    </Routes>
  )
}

export default Auth;