import { combineReducers } from '@reduxjs/toolkit';

import sizeDetectionReducer from '../features/sizeDetection/sizeDetectionSlice';

const rootReducer = combineReducers({
  sizeDetection: sizeDetectionReducer
});

export default rootReducer;
