import { configureStore } from '@reduxjs/toolkit';

import * as slices from './slices';

const store = configureStore({
  reducer: {
    session: slices.sessionSlice,
    user: slices.userSlice
  }
});

export default store; 