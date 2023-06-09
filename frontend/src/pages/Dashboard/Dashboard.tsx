import React, { useEffect, useState, useRef } from "react";
import MonthFilter from "./MonthFilter";
import Expenses from "./Expenses";
import Income from "./Income";
// import ModalWrapper from "./ModalWrapper";
// import NewExpense from "./NewExpense";
import fade from "../../assets/transitions/Fade.module.scss";

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
// выгрузка в csv
const Dashboard = () => {
  const [isNewBlockVisible, setNewBlockVisible] = useState(false);
  const [newBlock, setNewBlock] = useState(<></>);
  const [isModalVisible, setModalVisible] = useState(false);
  const nodeRef = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
               <CSSTransition
               in={isModalVisible}
               classNames={{ ...fade }}
               nodeRef={modalRef}
               timeout={200}
               unmountOnExit
               mountOnEnter
               onEnter={() => setModalVisible(true)}
               onExited={() => setModalVisible(false)}
             >
        <ModalWrapper
          ref={modalRef}
          toggleModal={() => setModalVisible(!isModalVisible)}
          children={newBlock}
        />
        </CSSTransition>
      )}
      <MonthFilter />
      <Income />
      <Expenses />

      <div className={styles.iconContainer}>
          <AddIcon
            onClick={() => setNewBlockVisible(!isNewBlockVisible)}
            className={styles.addIcon}
          />
          <CSSTransition
            in={isNewBlockVisible}
            classNames={{ ...fade }}
            nodeRef={nodeRef}
            timeout={200}
            unmountOnExit
            mountOnEnter
            onEnter={() => setNewBlockVisible(true)}
            onExited={() => setNewBlockVisible(false)}
          >
            <div ref={nodeRef} className={styles.newIcons}>
              <NewIncomeIcon onClick={() => addNew("income")} />
              <NewCategoryIcon onClick={() => addNew("expense")} />
              <NewExpenseIcon />
            </div>
          </CSSTransition>
      </div>
    </>
  );
};

export default Dashboard;
