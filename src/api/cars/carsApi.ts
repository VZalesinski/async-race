import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/utils';
import { TCar, TEngine } from './types';

export const carsApi = createApi({
  tagTypes: ['Car'],
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (build) => ({
    getCars: build.query<TCar[], { limit: number; page: number }>({
      query: ({ limit, page }) => `/garage?_limit=${limit}&_page=${page}`,
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
    deleteCar: build.mutation<TCar, { id: number }>({
      query: (body) => ({
        url: `garage/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Car'],
    }),
    updateCar: build.mutation<TCar, TCar>({
      query: (body) => ({
        url: `garage/${body.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Car'],
    }),
    handleEngine: build.mutation<
      TEngine,
      { id: number; status: 'started' | 'stopped' }
    >({
      query: ({ id, status }) => ({
        url: '/engine',
        method: 'PATCH',
        params: { id, status },
      }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  useCreateCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
  useHandleEngineMutation,
} = carsApi;
