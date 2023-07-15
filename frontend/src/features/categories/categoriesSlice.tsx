import { createSlice } from "@reduxjs/toolkit";
import {defaultCategories} from './constants';
import { v4 as uuidv4 } from 'uuid';

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
  initialState: defaultCategories, //TODO add from user account
  reducers: {
    addCategory: (state, action) => {
      const {categoryName, categoryIcon} = action.payload;
      const newCategory = {
        id: uuidv4(),
        name: categoryName,
        icon: categoryIcon,
        //TODO add icon
        color: 'red',
      }
      state.push(newCategory);
    },
  },
});

export const { addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectCategories = (state: CategoryState) => {
  return state.categories;
};

export const selectColors = (state: CategoryState) => {
  return state.categories.map(category => category.color)
};

export const selectIcons = (state: CategoryState) => {
  return state.categories.map(category => category.icon)
};