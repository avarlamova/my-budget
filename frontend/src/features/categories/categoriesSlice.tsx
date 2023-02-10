import { createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  [key: string]: string;
}

const defaultCategories: CategoryState = {
  auto: "red",
  transport: "green",
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState: defaultCategories,
  reducers: {
    addCategory: (state, action) => {
      const { key, color } = action.payload;
      console.log(state.defaultCategories);
      //   state.defaultCategories = color;
    },
  },
});

export const { addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
export const selectColors = (state: CategoryState, key: string) => {
  return state.categories[key];
};
