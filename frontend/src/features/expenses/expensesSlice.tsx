import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ExpensesState {
  userLogin: string;
  expenses: [];
  expensesByCategory: any;
  monthlyBudget: number;
}

interface RatioObject {
  [key: string]: string;
}

const initialState: ExpensesState = {
  userLogin: "",
  expenses: [],
  expensesByCategory: {},
  monthlyBudget: 0,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      const userLogin = action.payload.user;
      const expenses: any = action.payload.expenses;
      let expensesByCategory: any = {};
      for (const item of expenses) {
        if (expensesByCategory.hasOwnProperty(item.category)) {
          expensesByCategory[item.category] += item.amount;
        } else expensesByCategory[item.category] = item.amount;
      }
      return {
        userLogin: userLogin,
        expenses: expenses,
        monthlyBudget: 1000,
        expensesByCategory: expensesByCategory,
      };
    },
    addNewExpense: (state, action) => {},
  },
});

export const { setExpenses } = expensesSlice.actions;

export const selectMonthlyBudget = (state: RootState) =>
  state.expenses.monthlyBudget;

export const selectExpenses = (state: RootState) => state.expenses.expenses;

const selectExpensesSum = createSelector(selectExpenses, (expenses) => {
  if (expenses.length > 0) {
    return expenses.reduce(
      (subtotal: number, item: { amount: number }) => subtotal + item.amount,
      0
    );
  }
  return 0;
});

export const getMemoizedBudget = createSelector(
  selectExpensesSum,
  selectMonthlyBudget,
  (sum, monthlyBudget) => {
    return monthlyBudget - sum;
  }
);

export const selectCategorizedExpenses = (state: RootState) =>
  state.expenses.expensesByCategory;

export const selectExprensesRatio = createSelector(
  selectExpensesSum,
  selectCategorizedExpenses,
  (sum, expenses) => {
    let ratioObj = {} as RatioObject;
    for (const key in expenses) {
      const ratio = ((expenses[key] / sum) * 100).toFixed(2);
      ratioObj[key] = ratio;
    }
    return ratioObj;
  }
);
export default expensesSlice.reducer;
