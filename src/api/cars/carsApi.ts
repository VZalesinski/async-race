import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils';
import { TCars } from './types';

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (build) => ({
    getCars: build.query<TCars[], number>({
      query: (limit: number) => `/garage?limit=${limit}`,
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;
