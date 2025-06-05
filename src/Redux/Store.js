

import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './OrderSlice'

export const store = configureStore({
  reducer: {
    orders: orderReducer,
  },
});
