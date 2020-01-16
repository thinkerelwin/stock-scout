import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  variable: 0
};

const baseReducer = createSlice({
  name: 'baseReducer',
  initialState,
  reducers: {
    addVariable(state, action) {
      state.variable++;
    }
  }
});

export const { toggleTodo } = baseReducer.actions;

export default baseReducer.reducer;
