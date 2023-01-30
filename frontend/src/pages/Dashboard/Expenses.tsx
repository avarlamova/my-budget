import React from "react";
import ExpenseCategory from "./ExpenseCategory";
import styles from "./Expenses.module.scss";

const Expenses = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.sumsWrapper}>
          <div className={styles.innerWrapper}>
            <span> Left to spend </span>
            <span>$100</span>
          </div>
          <div className={styles.innerWrapper}>
            <span> Monthly budget </span>
            <span>$1400</span>
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
