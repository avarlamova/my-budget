import { createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  [key: string]: string;
}

const categoriesColours = {
  auto: "red",
  transport: "green",
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesColours,
  reducers: {
    setFilters: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilters } = categoriesSlice.actions;

export default categoriesSlice.reducer;
export const selectColors = (state: CategoryState, key: string) => {
  return state.categories[key];
};
