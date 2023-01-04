import axios from "./axios";
import qs from 'qs';

class Feed {

  async posts(data='') {
    
    debugger; 

    const url    = data.url? data.url : '/posts';
    const params = data.query? data.query : '';

    debugger;

    try {
      const posts = await axios.get(url, { params })
      return { posts: posts.data, errors: [] }; 
    }
    catch(error) {
      return { posts: null, errors: error.response.data.errors };
    }
  }

  async users() {
    try {
      const users = await axios.get('/users');
      return { users: users.data, errors: [] }; 
    }
    catch(error) {
      return { users: null, errros: error.response.data.errors }; 
    }
  }

  async search_users() {

  }

  async tags(data) {
    try {
      const tags = await axios.get(); 
      return { tags: tags.data, errors: [] };
    }
    catch(error) {
      return { tags: null, errors: error.respons.data.errors }; 
    }
  }

}

export default new Feed(); 