import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filters: builder.mutation({
      query: () => ({
        url: "/dashboard/filters",
        method: "GET",
      }),
    }),
    memory: builder.mutation({
      query: (data) => ({
        url: "/dashboard/filters",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useFiltersMutation, useMemoryMutation } = authApiSlice;
