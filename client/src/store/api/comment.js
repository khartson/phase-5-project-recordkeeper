import axios from "./axios";

class Comment {
  async create(data) {
    try {
      const comment = await axios.post('/comments', data)
      return { comment: comment.data }
    }
    catch(error) {

    }
  }

  async update(data) {
    try {
      const comment = await axios.patch(`/comments/${data.id}`, { comment: { ...data.comment }}); 
      return { comment: comment.data }; 
    }
    catch(error) {
      
    }

  }

  async delete(data) {
    try {
      await axios.delete(`/comments/${data.id}`, { data: { comment: data.comment }});
      return { id: data.id };
    }
    catch(error) {

    }
  }
}

export default new Comment(); 