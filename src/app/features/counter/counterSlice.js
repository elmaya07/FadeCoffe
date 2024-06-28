import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    update: 0,
    PDFurl: '',
  },
  reducers: {
    setUpdate: (state, action) => {
      state.update = action?.payload;
    },
    setUrl: (state, action) => {
      state.PDFurl = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUpdate, setUrl} = counterSlice.actions;

export default counterSlice.reducer;
