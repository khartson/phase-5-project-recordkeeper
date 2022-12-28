import { ErrorResponse } from '@remix-run/router';
import { useReducer } from 'react';
import axios from './axios'; 

class Session {

  async me() {
    try { 
      const user = await axios.get('/me')
      return { user: user.data, errors: []};
    }
    catch (error) {
      return { user: null, errors: error.response.data.errors };
    }
  }

  async signup(data) {
    try {
      const user = await axios.post('/signup', data);
      return { user: user.data, errors: []};
    }
    catch(error) {
      return { user: null, errors: error.response.data.errors};
    }
  }

  async login(data) {
    try {
      const user = await axios.post('/login', data );
      return { user: user.data, errors: []};
    }
    catch (error) {
      return { user: null, errors: error.response.data.errors };  
    }

  }

  logout() {
    return axios.delete('/logout'); 
  }

}

export default new Session(); 