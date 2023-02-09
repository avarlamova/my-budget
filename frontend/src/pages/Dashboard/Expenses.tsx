import React, { useEffect } from "react";
import ExpenseCategory from "./ExpenseCategory";
import styles from "./Expenses.module.scss";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useExpensesMutation } from "../../features/expenses/expensesApiSlice";
import {
  getMemoizedBudget,
  selectCategorizedExpenses,
  selectExprensesRatio,
  selectMonthlyBudget,
  setExpenses,
} from "../../features/expenses/expensesSlice";
import { selectColors } from "../../features/categories/categoriesSlice";

const Expenses = () => {
  const user = useSelector(selectCurrentUser);
  const monthlyBudget = useSelector(selectMonthlyBudget);
  const budget = useSelector(getMemoizedBudget);
  const [expenses] = useExpensesMutation();
  const categorizedExpenses = useSelector(selectCategorizedExpenses);
  const expensesRatio = useSelector(selectExprensesRatio);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const expensesData = await expenses({ user }).unwrap();
      dispatch(setExpenses({ user: user, expenses: expensesData }));
    }
    fetchData();
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
        <div className={styles.diagram}>
          {expensesRatio &&
            Object.keys(expensesRatio).map((key) => {
              return (
                <div
                  style={{ width: `${expensesRatio[key]}%` }}
                  className={styles[key]}
                ></div>
              );
            })}
        </div>
        {/* Add new expense <ModalWrapper children={<NewExpense />} /> */}
      </div>
      {categorizedExpenses &&
        Object.keys(categorizedExpenses).map((key) => {
          return (
            <ExpenseCategory category={key} value={categorizedExpenses[key]} />
          );
        })}
    </>
  );
};

export default Expenses;
