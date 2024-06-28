import {createSlice} from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    isAuth: false,
    user: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuth} = authSlice.actions;

export default authSlice.reducer;
