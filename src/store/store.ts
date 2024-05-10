import { configureStore } from '@reduxjs/toolkit';
import carReducer from './carSlice';
import winnersReducer from './winnersSlice';
import { carsApi, winnersApi } from '@/api';

export const store = configureStore({
  reducer: {
    [carsApi.reducerPath]: carsApi.reducer,
    [winnersApi.reducerPath]: winnersApi.reducer,
    car: carReducer,
    winners: winnersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware, winnersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
