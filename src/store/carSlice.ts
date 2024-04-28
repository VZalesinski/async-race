import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { IColor } from 'react-color-palette';

interface carState {
  carId: number | null;
  totalCountOfCars: number | null;
  createInputValue: string;
  updateInputValue: string;
  color: string;
  page: number;
}

const initialState: carState = {
  carId: null,
  totalCountOfCars: null,
  createInputValue: '',
  updateInputValue: '',
  color: '#561ecb',
  page: 1,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCarId: (state, action: PayloadAction<number | null>) => {
      state.carId = action.payload;
    },
    setTotalCountOfCars: (state, action: PayloadAction<number | null>) => {
      state.totalCountOfCars = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setCreateInputValue: (state, action: PayloadAction<string>) => {
      state.createInputValue = action.payload;
    },
    setUpdateInputValue: (state, action: PayloadAction<string>) => {
      state.updateInputValue = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  setCarId,
  setTotalCountOfCars,
  setCreateInputValue,
  setUpdateInputValue,
  setColor,
  setPage,
} = carSlice.actions;
export default carSlice.reducer;
