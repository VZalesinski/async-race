import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils';
import { TCar } from './types';

export const carsApi = createApi({
  tagTypes: ['Car'],
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (build) => ({
    getCars: build.query<TCar[], number>({
      query: (limit: number) => `/garage?limit=${limit}`,
      providesTags: ['Car'],
    }),
    createCar: build.mutation<TCar, { name: string; color: string }>({
      query: (body) => ({
        url: 'garage',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Car'],
    }),
    // deleteCar: build.mutation,
  }),
});

export const { useGetCarsQuery, useCreateCarMutation } = carsApi;
