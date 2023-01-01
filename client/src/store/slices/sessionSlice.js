import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// session class, has axios api methods
import { session } from '../api';

// auto login, correspond to '/me' route
export const me = createAsyncThunk(
  "session/me",
  async () => {
    const res = session.me();
    return res; 
  }
);

// login, requests '/login' route
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

// logout
export const logout = createAsyncThunk(
  "session/logout",
  async() => {
    session.logout();
    return; 
  }
)

// update 
export const update = createAsyncThunk(
  "session/update",
  async(data) => {
    const res = await session.update(data);
    return res; 
  } 
)

// change password
export const changePassword = createAsyncThunk(
  "session/changePassword",
  async(data) => {
    const res = await session.change_password(data);
    return res;
  }
)

// change icon 
export const newIcon = createAsyncThunk(
  "session/newIcon",
  async() => {
    const res = await session.new_icon();
    return res.icon; 
  }
)

// change username to custom endpoint
export const changeUsername = createAsyncThunk(
  "session/changeUsername",
  async(data) => {
    const res = await session.change_username(data);
    return res.username;
  }
)

// delete account to custom endpoint to avoid 
// passing a user id to the route, will use 
// session and authenticate instead on backend
// DANGEROUS: will wipe user from db
export const deleteAccount = createAsyncThunk(
  "session/deleteAccount",
  async(data) => {
    const res = session.delete_account(data);
    return res; 
  }
)

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    currentUser: null,
    errors: [],
    status: 'idle',
  }, 
  reducers: {
    clearErrors(state) {
      state.errors = []; 
    }
  },
  extraReducers: {
    [me.pending](state) {
      state.status = 'loading';
    },
    [me.fulfilled](state, action) {
      state.currentUser   = action.payload.user;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    },
    [login.pending](state) {
      state.status = 'loading';
    },
    [login.fulfilled](state, action) {
      state.currentUser   = action.payload.user;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    },
    [signup.pending](state) {
      state.status = 'loading'
    },
    [signup.fulfilled](state,action) {
      state.currentUser   = action.payload.user;
      state.errors = action.payload.errors;
      state.status = 'idle'; 
    },
    [logout.pending](state) {
      state.status = 'loading'
    },
    [logout.fulfilled](state) {
      state.currentUser   = null;
      state.errors = [];
      state.status = 'idle'; 
    },
    [changePassword.pending](state) {
      state.status = 'loading'
    },
    [changePassword.fulfilled](state, action) {
      state.errors = action.payload.errors;
      state.status = 'idle';
    },
    [newIcon.pending](state) {
      state.status = 'loading';
    },
    [newIcon.fulfilled](state, action) {
      state.currentUser  = { ...state.currentUser, 
                            icon: action.payload.icon}; 
      state.status = 'idle'; 
    },
    [update.pending](state) {
      state.status = 'loading'
    },
    [update.fulfilled](state, action) {
      if (action.payload.user) {
        state.currentUser = action.payload.user;
      }; 
      state.errors      = action.payload.errors; 
      state.status      = 'idle';
    },
    [deleteAccount.pending](state) {
      state.status = 'loading'
    },
    [deleteAccount.fulfilled](state, action) {
      if (!action.payload.user) {
        state.currentUser = null; 
      }
      state.errors       = action.payload.errors;
      state.status       = 'idle'; 
    }

  }
})

export const { clearErrors } = sessionSlice.actions;

export default sessionSlice.reducer; 