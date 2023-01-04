import axios from "./axios";
import qs from 'qs';

class Feed {

  async posts(data) {
    const params = qs.stringify(data, { encodeValuesOnly: true, arrayFormat: 'brackets' });
    try {
      const posts = await axios.get('/posts', params)
      return { posts: posts.data, errors: [] }; 
    }
    catch(error) {
      return { posts: null, errors: error.response.data.errors };
    }
  }

  async users(data) {
    try {
      const users = await axios.get();
      return { users: users.data, errors: [] }; 
    }
    catch(error) {
      return { users: null, errros: error.response.data.errors }; 
    }
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