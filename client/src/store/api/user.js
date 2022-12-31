import axios from "./axios";

class User {

  async show(username) {
    try {
      const user = await axios.get(`/users/${username}`)
      return { user: user.data, errors: [] };
    } 
    catch(error) {
      return { user: null, errors: error.response.data.errors }
    }
  }

}

export default new User();