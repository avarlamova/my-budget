import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../features/categories/categoriesSlice";
import styles from "./NewExpense.module.scss";
import { ReactComponent as ArrowDown } from "../../assets/icons/selectArrow.svg";
const NewExpense = () => {
  const handleSubmit = () => {
    console.log("New Expense");
  };

  const handleDescriptionChange = () => {
    console.log("Description");
  };

  const categories = useSelector(selectCategories);
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div>
          <div className={styles.field}>
            <option>Category</option>
            {categories.map((category) => {
              return <option>{category}</option>;
            })}
          </div>
        </div>

        <div className={styles.field}>
          <input type="button" onChange={handleDescriptionChange} />
          <ArrowDown className={styles.showIcon} />
        </div>
        <button className={styles.button}>Continue</button>
      </form>
    </div>
  );
};

export default NewExpense;
