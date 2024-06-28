import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'counter',
  initialState: {
    carts: [],
    meja: 0,
    namaMeja: ""
  },
  reducers: {
    setCart: (state, action) => {
      //   state.carts += action.payload;
      let arr = [...state.carts];
      if (arr.filter(val => val.id == action.payload?.id).length > 0) {
        let index = arr.findIndex(val => val.id == action.payload?.id);
        arr[index].quantity += 1;
      } else {
        arr.push(action.payload);
      }
      state.carts = arr;
    },
    deleteCart: (state, action) => {
      state.carts = state.carts.filter(val => val.id != action.payload);
    },
    removeCart: (state, action) => {
      state.carts = [];
    },
    incrementCart: (state, action) => {
      let arr = [...state.carts];
      let index = arr.findIndex(val => val.id == action.payload);
      arr[index].quantity += 1;
      state.carts = arr;
    },
    decrementCart: (state, action) => {
      let arr = [...state.carts];
      let index = arr.findIndex(val => val.id == action.payload);
      if (arr[index]?.quantity > 1) {
        arr[index].quantity -= 1;
      }
      state.carts = arr;
    },
    setMeja: (state, action) => {
      state.meja = action.payload;
    },
    setNamaMeja: (state, action) => {
      state.namaMeja = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCart,
  removeCart,
  deleteCart,
  incrementCart,
  decrementCart,
  setMeja,
  setNamaMeja,
} = cartSlice.actions;

export default cartSlice.reducer;
