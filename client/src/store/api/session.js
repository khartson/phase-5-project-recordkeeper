import axios from './axios'; 

class Session {

  async me() {
    try { 
      const user = await axios.get('/me')
      return { user: user.data, errors: [] };
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

  async logout() {
    try {
      await axios.delete('/logout'); 
      return { user: null, errors: [] }; 
    }
    catch(error) {
      return { errors: error.response.data.errors};
    }
  }
  
  async update(data) {
    try {
      const user = await axios.patch(`/users/${data.id}`, data.params);
      return { user: user.data, errors: [] }; 
    } 
    catch(error) {
      return { errors: error.response.data.errors }; 
    }
  }

  async change_password(data) {
    try {
     await axios.patch('/change_password', data);
     return { errors: []};
    } 
    catch(error) {
      return { errors: error.response.data.errors };
    }
  }

  async new_icon() {
    try {
      const icon = await axios.patch('/new_icon');
      return { icon: icon.data, errors: [] };  
    }
    catch(error) {
      return { errors: error.response.data.errors }; 
    }
  }

  async delete_account(data) {
    // debugger;
    try {
      await axios.delete('/delete_account', { data: data });
      return { user: false, errors: []};
    }
    catch(error) {
      return { user: true, errors: error.response.data.errors }; 
    }
  }
}

export default new Session(); 
