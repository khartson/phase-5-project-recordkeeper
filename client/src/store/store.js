import { configureStore } from '@reduxjs/toolkit';

import * as slices from './slices';

const store = configureStore({
  reducer: {
    currentUser: slices.currentUserSlice
  }
});

export default store; 