import { createSlice } from '@reduxjs/toolkit';

import instance from '../../api/IEXCloud';

let initialState = {
  categories: [],
  isFetching: false,
  error: null
};

const categoriesSlice = createSlice({
  name: 'screenerCategories',
  initialState,
  reducers: {
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setCategoriesSuccess(state, action) {
      state.categories = action.payload.categories.map(
        category => category.name
      );
      state.error = null;
    },
    setCategoriesFailed(state, action) {
      state.error = action.payload;
    }
  }
});

export const {
  setIsFetching,
  setCategoriesSuccess,
  setCategoriesFailed
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

export function fetchCategories() {
  return async dispatch => {
    dispatch(setIsFetching(true));
    try {
      const { data } = await instance.get('/ref-data/sectors');
      dispatch(setCategoriesSuccess({ categories: data }));
      dispatch(setIsFetching(false));
    } catch (err) {
      dispatch(setCategoriesFailed(err.toString()));
      dispatch(setIsFetching(false));
    }
  };
}
