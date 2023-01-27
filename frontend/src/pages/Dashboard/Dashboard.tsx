import React from "react";
import ModalWrapper from "./ModalWrapper";
import NewExpense from "./NewExpense";

// компонент новая трата
// есть historic data
// есть несколько категорий
const Dashboard = () => {
  return (
    <div>
      Add new expense <ModalWrapper children={<NewExpense />} />
    </div>
  );
};

export default Dashboard;
