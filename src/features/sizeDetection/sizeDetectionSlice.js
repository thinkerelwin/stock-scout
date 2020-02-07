import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isMediumSize: false
};

const sizeDetectionSlice = createSlice({
  name: 'sizeDetection',
  initialState,
  reducers: {
    setIsMediumSize(state, action) {
      state.isMediumSize = action.payload.isMediumSize;
    }
  }
});

export const { setIsMediumSize } = sizeDetectionSlice.actions;

export default sizeDetectionSlice.reducer;
