import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { user } from "../api";

export const show = createAsyncThunk(
  "users/show",
  async(username) => {
    const res = user.show(username);
    return res; 
  }
);


const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    errors: [],
    status: 'idle'
  },
  reducers: {
    clearErrors(state) {
      state.errors = [];
    }
  },
  extraReducers: {
    [show.pending](state) {
      state.status = 'loading';
    },
    [show.fulfilled](state, action) {
      state.user   = action.payload.user;
      state.errors = action.payload.errors;
      state.status = 'idle';
    }

  }
})

// export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;