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
import { CSSTransition } from "react-transition-group";

import styles from "./Dashboard.module.scss";
import ModalWrapper from "../../components/UI/ModalWrapper";
import NewExpense from "./NewExpense";
import NewIncome from "./NewIncome";

// toggle: see transactions/see categories
// есть historic data + filters
// есть несколько категорий
const Dashboard = () => {
  const [isNewBlockVisible, setNewBlockVisible] = useState(false);
  const [newBlock, setNewBlock] = useState(<></>);
  const [isModalVisible, setModalVisible] = useState(false);
  // const expensesData = await expenses({ user }).unwrap();

  const addNew = (param: string) => {
    setModalVisible(true);
    switch (param) {
      case "income":
        setNewBlock(<NewIncome />);
        break;
      case "expense":
        setNewBlock(<NewExpense />);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isModalVisible && (
        <ModalWrapper
          toggleModal={() => setModalVisible(!isModalVisible)}
          children={newBlock}
        />
      )}
      <MonthFilter />
      <Income />
      <Expenses />
      {/* <CSSTransition
        in={isNewBlockVisible}
        timeout={300}
        unmountOnExit
        // onEnter={() => setShowButton(false)}
        // onExited={() => setShowButton(true)}
      > */}
      <div className={styles.iconContainer}>
        {isNewBlockVisible && (
          <div className={styles.newIcons}>
            <NewIncomeIcon onClick={() => addNew("income")} />
            <NewCategoryIcon onClick={() => addNew("expense")} />
            <NewExpenseIcon />
          </div>
        )}
        <AddIcon
          onClick={() => setNewBlockVisible(!isNewBlockVisible)}
          className={styles.addIcon}
        />
      </div>
      {/* </CSSTransition> */}
    </>
  );
};

export default Dashboard;
