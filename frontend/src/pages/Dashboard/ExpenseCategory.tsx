import React from "react";
import styles from "./ExpenseCategory.module.scss";
import { ReactComponent as CategoryIcon } from "../../assets/icons/auto.svg";

// TODO open transactions in modal on click
// TODO add icon
const ExpenseCategory = (category: { category: string; value: number }) => {
  return (
    //TODO уменьшить высоту категорий
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <CategoryIcon className={styles.icon} />
        <h2>{category.category}</h2>
        <p> $ {category.value} </p>
      </div>
    </div>
  );
};

export default ExpenseCategory;
