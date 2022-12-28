import React from 'react';
import { CreateAccount, Login } from '../components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../../store';

function Auth() {

  const dispatch = useDispatch();

  let location = useLocation();
  if (['/auth/login', '/auth/signup'].includes(location.pathname)) {
    dispatch(clearErrors()); 
  }
  return( 
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<CreateAccount/>}/>
    </Routes>
  )
}

export default Auth;