import { createSlice } from "@reduxjs/toolkit";
import {defaultCategories} from './constants';

interface CategoryState {
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState: defaultCategories,
  reducers: {
    addCategory: (state, action) => {
      const { key, color, icon } = action.payload;
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

export const selectColors = (state: CategoryState) => {
  return state.categories.map(category => category.color)
};

export const selectIcons = (state: CategoryState) => {
  return state.categories.map(category => category.icon)
};