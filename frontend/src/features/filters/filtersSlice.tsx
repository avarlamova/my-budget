//TODO add currency selection
// TODO months filter
import { createSlice } from "@reduxjs/toolkit";

// interface AuthState {
//   auth: {
//     user: string | null;
//     token: string | null;
//   };
// }

const filtersSlice = createSlice({
  name: "filters",
  initialState: {},
  reducers: {
    setFilters: (state) => {
      console.log(state);
    },
  },
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
