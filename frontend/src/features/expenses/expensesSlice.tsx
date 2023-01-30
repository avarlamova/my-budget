import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLogin: "",
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    getExpenses: (state, action) => {
      const userLogin = action.payload.user.login;
      console.log(userLogin);
      //   return { message: action.payload };
    },
  },
});

export const { getExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
