import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

interface ExpensesState {
  userLogin: string;
  expenses: [];
  monthlyBudget: number;
}

const initialState: ExpensesState = {
  userLogin: "",
  expenses: [],
  monthlyBudget: 0,
};

//TODO memorize monthly budget
const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      const userLogin = action.payload.user;
      const expenses = action.payload.expenses;
      return {
        userLogin: userLogin,
        expenses: expenses,
        monthlyBudget: 1000,
      };
    },
  },
});

export const { setExpenses } = expensesSlice.actions;
export const selectMonthlyBudget = (state: ExpensesState) =>
  state.monthlyBudget;

export const selectExpenses = (state: ExpensesState) => state.expenses;

export const getMemoizedBudget = createSelector(selectExpenses, (expenses) => {
  // console.log(initialState);
  // let budgetLeft = monthlyBudget;
  console.log(expenses);
  // if (expenses.length > 0) {
  //   budgetLeft =
  //     monthlyBudget - expenses.reduce((partialSum, a) => partialSum + a, 0);
  // }
  return 300; //budgetLeft;
});
export default expensesSlice.reducer;
