import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from '../api';

export const show = createAsyncThunk(
  'posts/show',
  async(id) => {
    const res = post.show(id);
    return res; 
  }
);

export const create = createAsyncThunk(
  'posts/create',
  async(data) => {
    const res = post.create(data);
    return res; 
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    errors: [],
    status: 'idle'
  },
  reducers: {
    clearPost(state) {
      state.post   = null;
      state.errors = [];
    }

  },
  extraReducers: {
    [show.pending](state) {
      state.status = 'loading';
    },
    [show.fulfilled](state, action) {
      state.post   = action.payload.post;
      state.errors = action.payload.errors;
      state.status = 'idle';
    },
    [create.pending](state) {
      state.status = 'loading';
    },
    [create.fulfilled](state, action) {
      state.post   = action.payload.post;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    }
  }
})

export const { clearPost } = postSlice.actions;

export default postSlice.reducer; 