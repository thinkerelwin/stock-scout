import { combineReducers } from '@reduxjs/toolkit';

import sizeDetectionReducer from '../features/sizeDetection/sizeDetectionSlice';
import categoriesReducer from '../features/screener/CategoriesSlice';
import screenerTableReducer from '../features/screener/ScreenerTableSlice';

const rootReducer = combineReducers({
  sizeDetection: sizeDetectionReducer,
  categories: categoriesReducer,
  screenerTable: screenerTableReducer
});

export default rootReducer;
