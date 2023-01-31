import React, { useEffect } from "react";
import ExpenseCategory from "./ExpenseCategory";
import styles from "./Expenses.module.scss";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useExpensesMutation } from "../../features/expenses/expensesApiSlice";
import {
  getMemoizedBudget,
  selectMonthlyBudget,
  setExpenses,
} from "../../features/expenses/expensesSlice";

const Expenses = () => {
  const user = useSelector(selectCurrentUser);
  const monthlyBudget = useSelector(selectMonthlyBudget);
  const budget = useSelector(getMemoizedBudget);
  const [expenses] = useExpensesMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const expensesData = await expenses({ user }).unwrap();
      dispatch(setExpenses({ user: user, expenses: expensesData }));
    }
    fetchData();
    console.log("b is", budget);
  }, []); // no dependencies => when component loads

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.sumsWrapper}>
          <div className={styles.innerWrapper}>
            <span> Left to spend </span>
            <span>${budget}</span>
          </div>
          <div className={styles.innerWrapper}>
            <span> Monthly budget </span>
            <span>${monthlyBudget}</span>
          </div>
        </div>
        <div className={styles.diagram}></div>
        {/* Add new expense <ModalWrapper children={<NewExpense />} /> */}
      </div>
      {/* overall spending blocks */}
      <ExpenseCategory />
    </>
  );
};

export default Expenses;
