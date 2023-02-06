import React, { useEffect } from "react";
import MonthFilter from "./MonthFilter";
import Expenses from "./Expenses";
import Income from "./Income";
// import ModalWrapper from "./ModalWrapper";
// import NewExpense from "./NewExpense";
import { ReactComponent as AddIcon } from "../../assets/icons/Add.svg";
import styles from "./Dashboard.module.scss";
import { useFiltersMutation } from "../../features/filters/filtersApiSlice";

// toggle: see transactions/see categories
// есть historic data + filters
// есть несколько категорий
const Dashboard = () => {
  const [filters] = useFiltersMutation();
  // const expensesData = await expenses({ user }).unwrap();
  useEffect(() => {
    async function fetchData() {
      const filtersData = await filters({}).unwrap();
      console.log(filtersData);
    }
    fetchData();
  }, []); // no dependencies => when component loads

  return (
    <>
      <MonthFilter />
      <Income />
      <Expenses />
      <AddIcon className={styles.addIcon} />
    </>
  );
};

export default Dashboard;
