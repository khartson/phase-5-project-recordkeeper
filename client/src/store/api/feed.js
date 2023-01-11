import axios from "./axios";
import qs from 'qs';

class Feed {

  async posts(data='') {
    const url    = data.url? data.url : '/posts';
    const params = data.query? qs.stringify(data.query, {arrayFormat: 'brackets', addQueryPrefix: true, encode: false }) : '';

    try {
      const posts = await axios.get(url+params)
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
      return { users: null, errors: error.response.data.errors }; 
    }
  }

  async tags() {
    try {
      const tags = await axios.get('/tags');
      return { tags: tags.data, errors: [] };
    }
    catch(error) {
      return { tags: null, errors: error.response.data.errors };
    }
  }

  async search_users(query) {
    try {
      const users = await axios.get(`/search/?user=${query}`);
      return { users: users.data, errors: [] };
    }
    catch(error) {
      return { users: null, errors: error.response.data.errors };
    }

  }

}

export default new Feed(); 