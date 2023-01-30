import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    expenses: builder.mutation({
      query: (credentials) => ({
        url: "/dashboard",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useExpensesMutation } = authApiSlice;
