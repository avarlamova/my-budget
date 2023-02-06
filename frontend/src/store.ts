import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import expensesReducer from "./features/expenses/expensesSlice";
import filtersReducer from "./features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    expenses: expensesReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
//refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);
