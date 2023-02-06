import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filters: builder.mutation({
      query: (credentials) => ({
        url: "/dashboard/filters",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useFiltersMutation } = authApiSlice;
