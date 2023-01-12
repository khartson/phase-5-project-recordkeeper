import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from '../api';

export const show = createAsyncThunk(
  'posts/show',
  async(id) => {
    const res = post.show(id);
    return res; 
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    errors: [],
    status: 'idle'
  },
  reducers: {

  },
  extraReducers: {
    [show.pending](state) {
      state.status = 'loading';
    },
    [show.fulfilled](state, action) {
      state.post = action.payload.post;
      state.errors = action.payload.errors;
      state.status = 'idle';
    }
  }
})

export default postSlice.reducer; 