import { createSlice } from "@reduxjs/toolkit";
import {defaultCategories} from './constants';

interface CategoryState {
  [key: string]: string;
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState: defaultCategories,
  reducers: {
    addCategory: (state, action) => {
      const { key, color } = action.payload;
      // console.log(state.defaultCategories);
      //   state.defaultCategories = color;
    },
  },
});

export const { addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectCategories = (state: CategoryState) => {
  return Object.keys(state.categories);
};

export const selectColors = (state: CategoryState, key: string) => {
  return state.categories[key];
};
