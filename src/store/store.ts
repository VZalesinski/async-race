import { configureStore } from '@reduxjs/toolkit';
import carReducer from './carSlice';
import { carsApi } from '@/api';

export const store = configureStore({
  reducer: {
    [carsApi.reducerPath]: carsApi.reducer,
    car: carReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
