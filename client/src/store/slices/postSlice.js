import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post, comment } from '../api';

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
);

export const update = createAsyncThunk(
  'posts/update',
  async(data) => {
    const res = post.update(data);
    return res; 
  }
);

export const destroy = createAsyncThunk(
  'posts/destroy',
  async(data) => {
    const res = post.destroy(data);
    return res; 
  }
);

export const createComment = createAsyncThunk(
  'posts/createComment',
  async(data) => {
    const res = comment.create(data);
    return res; 
  }
);

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async(data) => {
    const res = comment.delete(data); 
    return res; 
  }
);

export const updateComment = createAsyncThunk(
  'posts/updateComment',
  async(data) => {
    const res = comment.update(data);
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
    clearPost(state) {
      state.post   = null;
      state.errors = [];
    },
    clearErrors(state) {
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
    },
    [update.fulfilled](state, action) {
      if (action.payload.post) {
        state.post = action.payload.post;
      }
      state.errors = action.payload.errors;
      state.status = 'idle';
    },
    [destroy.pending](state) {
      state.status = 'loading';
    },
    [destroy.fulfilled](state, action) {
      state.post   = action.payload.post
      state.status = 'idle';
    },
    [createComment.fulfilled](state,action) {
      state.post.comments = [...state.post.comments, action.payload.comment];
    },
    [deleteComment.fulfilled](state, action) {
      const updatedComments = state.post.comments.filter((c)=>c.id !== action.payload.id); 
      state.post.comments = updatedComments;
    },
    [updateComment.fulfilled](state, action) {
      debugger;
      const updatedComments = state.post.comments.map((comment) => {
        if (comment.id === action.payload.comment.id) {
          return action.payload.comment;
        }
        return comment; 
      })
      state.post.comments = updatedComments; 
    }
  }
})

export const { clearPost, clearErrors } = postSlice.actions;

export default postSlice.reducer; 