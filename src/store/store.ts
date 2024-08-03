import { configureStore } from '@reduxjs/toolkit';
import recordSlice from './slices/recordSlice';

export const store = configureStore({
  reducer: {
    record:recordSlice
  },
});
