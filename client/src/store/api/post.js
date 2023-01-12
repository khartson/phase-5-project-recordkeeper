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
}

export default new Post(); 