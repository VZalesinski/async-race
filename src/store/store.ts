import { configureStore } from '@reduxjs/toolkit';
import { carsApi } from '../api/cars/carsApi';

export const store = configureStore({
  reducer: {
    [carsApi.reducerPath]: carsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware),
});

export type TypeRootStore = ReturnType<typeof store.getState>;
