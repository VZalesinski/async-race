import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/utils';
import { TWinner } from './type';

export const winnersApi = createApi({
  tagTypes: ['Winners'],
  reducerPath: 'winnersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    addWinner: build.mutation<TWinner, TWinner>({
      query: ({ wins, time }) => ({
        url: '/winners',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wins, time }),
      }),
    }),
  }),
});
