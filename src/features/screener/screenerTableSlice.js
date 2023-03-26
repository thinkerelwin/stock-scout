import { createSlice } from '@reduxjs/toolkit';

import instance from '../../api/IEXCloud';

let initialState = {
  screenerList: [],
  isFetchingList: false,
  listError: null,
};

const screenerTableSlice = createSlice({
  name: 'screenerTable',
  initialState,
  reducers: {
    setIsFetchingList(state, action) {
      state.isFetchingList = action.payload;
    },
    setScreenerTableSuccess(state, action) {
      state.screenerList = action.payload.screenerList;
      state.listError = null;
    },
    setScreenerTableFailed(state, action) {
      state.listError = action.payload;
    },
  },
});

export const {
  setIsFetchingList,
  setScreenerTableSuccess,
  setScreenerTableFailed,
} = screenerTableSlice.actions;

export default screenerTableSlice.reducer;

export function fetchscreenerTable(CollectionType, currentTab) {
  return async (dispatch) => {
    dispatch(setIsFetchingList(true));
    try {
      const { data } = await instance.get(
        `/stock/market/collection/${CollectionType}`,
        {
          params: {
            collectionName: currentTab,
          },
        }
      );

      dispatch(setScreenerTableSuccess({ screenerList: data }));
      dispatch(setIsFetchingList(false));
    } catch (err) {
      dispatch(setScreenerTableFailed(err.toString()));
      dispatch(setIsFetchingList(false));
    }
  };
}
