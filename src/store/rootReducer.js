import { combineReducers } from '@reduxjs/toolkit';

import sizeDetectionReducer from '../features/sizeDetection/sizeDetectionSlice';
import categoriesReducer from '../features/screener/CategoriesSlice';

const rootReducer = combineReducers({
  sizeDetection: sizeDetectionReducer,
  categories: categoriesReducer
});

export default rootReducer;
