import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { IColor } from 'react-color-palette';

interface winnerCar {
  id: number;
  name: string;
  time: number;
}
interface carState {
  carId: number | null;
  totalCountOfCars: number | null;
  createInputValue: string;
  updateInputValue: string;
  color: string;
  page: number;
  isRace: boolean;
  raceArray: winnerCar[] | [];
}

const initialState: carState = {
  carId: null,
  totalCountOfCars: null,
  createInputValue: '',
  updateInputValue: '',
  color: '#561ecb',
  page: 1,
  isRace: false,
  raceArray: [],
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
    setIsRace: (state, action: PayloadAction<boolean>) => {
      state.isRace = action.payload;
    },
    addCarInRaceArray: (state, action: PayloadAction<winnerCar>) => {
      state.raceArray = [...state.raceArray, action.payload];
    },
    removeAllCarsRaceArray: (state) => {
      state.raceArray = [];
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
  setIsRace,
  addCarInRaceArray,
  removeAllCarsRaceArray,
} = carSlice.actions;
export default carSlice.reducer;
