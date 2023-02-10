//TODO add currency selection
import { createSlice } from "@reduxjs/toolkit";

interface FiltersState {
  month: string;
  year: string;
}

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    month: "",
    year: "",
  },
  reducers: {
    setFilters: (state, action) => {
      const { month, year } = action.payload;
      state.month = month;
      state.year = year;
    },
  },
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
