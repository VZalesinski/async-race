import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface carState {
  carId: number | null;
  totalCountOfCars: number | null;
}

const initialState: carState = {
  carId: null,
  totalCountOfCars: null,
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
  },
});

export const { setCarId, setTotalCountOfCars } = carSlice.actions;
export default carSlice.reducer;
