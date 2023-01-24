import axios from "./axios";

class Post {
  async show(id) {
    try {
      const post = await axios.get(`/posts/${id}`);
      return { post: post.data, errors: [] }; 
    }
    catch(error) {
      return { user: null, errors: error.response.data.errors };
    }
  }

  async create(data) {
    try {
      const post = await axios.post('posts', data) 
        return { post: post.data, errors: []}
    }
    catch(error) {
      return { user: null, errors: error.response.data.errors }; 
    }
  }

  async update(data) {
    try {
      const post = await axios.patch(`posts/${data.post.id}`, data) 
        return { post: post.data, errors: [] };
    }
    catch(error) {
      return { user: null, errors: error.response.data.errors };
    }
  }

  async destroy(data) {
    try {
      await axios.delete(`posts/${data}`);
      return { post: null, errors: [] }
    } 
    catch(error) {
      return { errors: error.response.data.errors }; 
    }
  }
}

export default new Post(); 