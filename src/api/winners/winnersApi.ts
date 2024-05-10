import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/utils';
import { TWinner } from './type';

export const winnersApi = createApi({
  tagTypes: ['Winners'],
  reducerPath: 'winnersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    addWinner: build.mutation<
      TWinner,
      { id: number; wins: number; time: number }
    >({
      query: ({ id, wins, time }) => ({
        url: '/winners',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, wins, time }),
      }),
      invalidatesTags: ['Winners'],
    }),
    getWinnerById: build.query<TWinner, { id: number }>({
      query: ({ id }) => `/winners/${id}`,
    }),
    getWinners: build.query<
      TWinner[],
      { _page?: number; _limit: number; _sort?: string; _order?: string }
    >({
      query: (params) => ({
        url: '/winners',
        method: 'GET',
        params,
      }),
      providesTags: ['Winners'],
    }),
    updateWinner: build.mutation<
      TWinner,
      { id: number; wins: number; time: number }
    >({
      query: ({ id, wins, time }) => ({
        url: `/winners/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wins, time }),
      }),
      invalidatesTags: ['Winners'], // Invalidate Winners tag on update
    }),
    deleteWinner: build.mutation({
      query: (id: number) => ({
        url: `/winners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Winners'],
    }),
  }),
});

export const {
  useUpdateWinnerMutation,
  useAddWinnerMutation,
  useGetWinnersQuery,
  useDeleteWinnerMutation,
  useLazyGetWinnerByIdQuery,
} = winnersApi;
