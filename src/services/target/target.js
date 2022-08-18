import endpoints from 'constants/endpoints';
import { api } from 'services/api';

const targetApi = api.injectEndpoints({
  endpoints: builder => ({
    createTarget: builder.mutation({
      query: target => ({
        url: endpoints.TARGET,
        method: 'POST',
        body: { target },
      }),
    }),
    getTargets: builder.query({
      query: () => ({
        url: endpoints.TARGET,
      }),
    }),
    deleteTarget: builder.mutation({
      query: urlDelete => ({
        url: urlDelete,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateTargetMutation, useGetTargetsQuery, useDeleteTargetMutation } = targetApi;

export const selectTarget = state => state.target;
