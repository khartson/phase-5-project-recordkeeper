import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    currentUser: null, 
    status: 'idle',
  }, 
  reducers: {
    userLogin(state, action) {
      state.user = {...action, loggedIn: true}
    },
  },
  extraReducers: {

  }
})

export const { useLoggedIn } = currentUserSlice.actions;

export default currentUserSlice.reducer; 