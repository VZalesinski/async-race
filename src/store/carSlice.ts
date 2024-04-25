import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface carState {
  id: number | null;
}

const initialState: carState = {
  id: null,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCarId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
  },
});

export const { setCarId } = carSlice.actions;
export default carSlice.reducer;
