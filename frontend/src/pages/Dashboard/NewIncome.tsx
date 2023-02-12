import React from "react";
import styles from "./NewIncome.module.scss";
import { ReactComponent as ArrowDown } from "../../assets/icons/selectArrow.svg";
import { selectCategories } from "../../features/categories/categoriesSlice";
import { useSelector } from "react-redux";

const NewIncome = () => {
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
        <div className={styles.field}>
          <div className={styles.select}>
            <div className={styles.option}>Category</div>
            {categories.map((category) => {
              return <div className={styles.option}>{category}</div>;
            })}
          </div>
          <ArrowDown className={styles.selectIcon} />
        </div>

        <div className={styles.field}>
          <input type="text" onChange={handleDescriptionChange} />
        </div>
        <button className={styles.button}>Continue</button>
      </form>
    </div>
  );
};

export default NewIncome;
