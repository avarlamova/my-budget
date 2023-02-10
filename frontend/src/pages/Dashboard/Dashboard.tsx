import React, { useEffect, useState } from "react";
import MonthFilter from "./MonthFilter";
import Expenses from "./Expenses";
import Income from "./Income";
// import ModalWrapper from "./ModalWrapper";
// import NewExpense from "./NewExpense";
import { ReactComponent as AddIcon } from "../../assets/icons/Add.svg";
import { ReactComponent as NewExpenseIcon } from "../../assets/icons/Expense.svg";
import { ReactComponent as NewCategoryIcon } from "../../assets/icons/Category.svg";
import { ReactComponent as NewIncomeIcon } from "../../assets/icons/Income.svg";

import styles from "./Dashboard.module.scss";
import { useFiltersMutation } from "../../features/filters/filtersApiSlice";
import ModalWrapper from "./ModalWrapper";

// toggle: see transactions/see categories
// есть historic data + filters
// есть несколько категорий
const Dashboard = () => {
  const [isNewBlockVisible, setNewBlockVisible] = useState(false);
  const [filters, { isLoading }] = useFiltersMutation();
  // const expensesData = await expenses({ user }).unwrap();
  useEffect(() => {
    async function fetchData() {
      const filtersData = await filters({}).unwrap();
      console.log(filtersData);
    }
    fetchData();
  }, []); // no dependencies => when component loads

  return isLoading ? ( // comes from useLoginMutation
    <section className={styles.container}>
      <h1>Loading...</h1>
    </section>
  ) : (
    <>
      <MonthFilter />
      <Income />
      <Expenses />

      <div className={styles.iconContainer}>
        {isNewBlockVisible && (
          <div className={styles.newIcons}>
            <NewIncomeIcon />
            <NewCategoryIcon />
            <NewExpenseIcon />
          </div>
        )}
        <AddIcon
          onClick={() => setNewBlockVisible(!isNewBlockVisible)}
          className={styles.addIcon}
        />
      </div>
    </>
  );
};

export default Dashboard;
