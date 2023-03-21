import { combineReducers } from '@reduxjs/toolkit';

import sizeDetectionReducer from '../features/sizeDetection/sizeDetectionSlice';
import screenerCategoriesReducer from '../features/screener/screenerCategoriesSlice';
import screenerTableReducer from '../features/screener/screenerTableSlice';

const rootReducer = combineReducers({
  sizeDetection: sizeDetectionReducer,
  screenerCategories: screenerCategoriesReducer,
  screenerTable: screenerTableReducer,
});

export default rootReducer;
