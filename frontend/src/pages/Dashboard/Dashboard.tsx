import React, { useEffect } from "react";
import CurrentMonth from "./CurrentMonth";
import Expenses from "./Expenses";
import Income from "./Income";
// import ModalWrapper from "./ModalWrapper";
// import NewExpense from "./NewExpense";
import { ReactComponent as AddIcon } from "../../assets/Add.svg";
import styles from "./Dashboard.module.scss";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useExpensesMutation } from "../../features/expenses/expensesApiSlice";

// toggle: see transactions/see categories
// есть historic data + filters
// есть несколько категорий
const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const [expenses] = useExpensesMutation();

  useEffect(() => {
    async function fetchData() {
      const userData = await expenses({ user }).unwrap();
      console.log(userData);
    }
    fetchData();
  }, []); // no dependencies => when component loads

  return (
    <>
      <CurrentMonth />
      <Income />
      <Expenses />
      <AddIcon className={styles.addIcon} />
    </>
  );
};

export default Dashboard;
