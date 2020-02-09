import { createSlice } from '@reduxjs/toolkit';

import instance from '../../api/IEXCloud';

let initialState = {
  categories: [],
  error: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
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
  setCategoriesSuccess,
  setCategoriesFailed
} = categoriesSlice.actions;

export default categoriesSlice.reducer;

export function fetchCategories() {
  return async dispatch => {
    try {
      const { data } = await instance.get('/ref-data/sectors');
      dispatch(setCategoriesSuccess({ categories: data }));
    } catch (err) {
      dispatch(setCategoriesFailed(err.toString()));
    }
  };
}
