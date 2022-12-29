import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// session class, has axios api methods
import { session } from '../api';

// auto login, correspond to '/me' route
export const fetchUser = createAsyncThunk(
  "session/fetchUser",
  async () => {
    const res = session.me();
    return res; 
  }
);

// login, requests '/me' route
export const login = createAsyncThunk(
  "session/login", 
  async (data) => {
    const res = session.login(data);
    return res; 
  }
);

// signup 
export const signup = createAsyncThunk(
  "session/signup",
  async(data) => {
    const res = session.signup(data);
    return res; 
  }
);

export const logout = createAsyncThunk(
  "session/logout",
  async() => {
    const res = session.logout();
    return res; 
  }
)

// logout 
const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    errors: [],
    status: 'idle',
  }, 
  reducers: {
    clearErrors(state) {
      state.errors = []; 
    }
  },
  extraReducers: {
    [fetchUser.pending](state) {
      state.status = 'loading';
    },
    [fetchUser.fulfilled](state, action) {
      state.user   = action.payload.user;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    },
    [login.pending](state) {
      state.status = 'loading';
    },
    [login.fulfilled](state, action) {
      state.user   = action.payload.user;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    },
    [signup.pending](state) {
      state.status = 'loading'
    },
    [signup.fulfilled](state,action) {
      state.user   = action.payload.user;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    },
    [logout.pending](state) {
      state.status = 'loading'
    },
    [logout.fulfilled](state) {
      state.user   = null;
      state.errors = [];
      state.status = 'idle'; 
    }
  }
})

export const { clearErrors } = sessionSlice.actions;

export default sessionSlice.reducer; 