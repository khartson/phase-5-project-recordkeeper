import { configureStore } from '@reduxjs/toolkit';

import * as slices from './slices';

const store = configureStore({
  reducer: {
    session: slices.sessionSlice,
    user: slices.userSlice,
    feed: slices.feedSlice,
    post: slices.postSlice,
  }
});

export default store; 