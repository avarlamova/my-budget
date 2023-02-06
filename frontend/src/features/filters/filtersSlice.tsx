//TODO add currency selection
import { createSlice } from "@reduxjs/toolkit";

// interface FiltersState {
//  month: string,
// year: string
// }

const filtersSlice = createSlice({
  name: "filters",
  initialState: {},
  reducers: {
    setFilters: (state, action) => {
      const { month, year } = action.payload;
      return { month, year };
    },
  },
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
