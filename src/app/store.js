import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import cartSlice from './features/cart/cartSlice';
import authSlice from './features/auth/authSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    pos: cartSlice,
    auth: authSlice,
  },
});
