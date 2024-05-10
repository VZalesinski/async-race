import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface winnersState {
  sort: 'id' | 'wins' | 'time';
  sortByOrder: 'ASC' | 'DESC';
  totalCountOfWinners: number | null;
  page: number;
}

const initialState: winnersState = {
  sort: 'id',
  sortByOrder: 'DESC',
  totalCountOfWinners: null,
  page: 1,
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    handleSort: (state, action: PayloadAction<'id' | 'wins' | 'time'>) => {
      state.sort = action.payload;
    },
    handleSortByOrder: (state, action: PayloadAction<'ASC' | 'DESC'>) => {
      state.sortByOrder = action.payload;
    },
    setTotalCountOfWinners: (state, action: PayloadAction<number | null>) => {
      state.totalCountOfWinners = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  handleSort,
  handleSortByOrder,
  setTotalCountOfWinners,
  setPage,
} = winnersSlice.actions;

export default winnersSlice.reducer;
