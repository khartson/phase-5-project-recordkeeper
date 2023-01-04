import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { feed } from "../api";

// posts - get all 'global' posts outside of a 
// user's following
export const posts = createAsyncThunk(
  "feed/posts",
  async(data) => {
    const res = feed.posts(data);
    return res; 
  }
); 

export const users = createAsyncThunk(
  'feed/users',
  async() => {
    const res = feed.users();
    return res; 
  }
)

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: null,
    users: null,
    tags:  null, 
    errors: [],
    status: 'idle'
  }, 
  reducers: {
  },
  extraReducers: {
    [posts.pending](state) {
      state.status = 'loading';
    },
    [posts.fulfilled](state, action) {
      state.posts  = action.payload.posts;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    },
    [users.pending](state) {
      state.status = 'loading';
    },
    [users.fulfilled](state, action) {
      state.users  = action.payload.users;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    }
  }
})

export default feedSlice.reducer; 