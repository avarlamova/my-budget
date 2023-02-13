import React, { useState } from "react";
import styles from "./NewIncome.module.scss";
import { ReactComponent as ArrowDown } from "../../assets/icons/selectArrow.svg";
import { selectCategories } from "../../features/categories/categoriesSlice";
import { useSelector } from "react-redux";

const NewIncome = () => {
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [isDropdownShown, setDropdownShown] = useState(false);
  // use currency
  const [sum, setSum] = useState(0);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("New Expense");
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Description");
  };

  const handleSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e.target.value === "number") {
      setSum(e.target.value);
    }
  };

  const categories = useSelector(selectCategories);
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Enter sum"
            onChange={handleSumChange}
            value={"$" + sum}
          />
        </div>

        <div className={styles.fieldWrapper}>
          <div
            className={styles.dropDown}
            onClick={() => setDropdownShown(!isDropdownShown)}
          >
            <div className={styles.selectedCategory}>{selectedCategory}</div>
            <ArrowDown className={styles.selectIcon} />
          </div>
          {isDropdownShown && (
            <div className={styles.categories}>
              {categories.map((category) => {
                return (
                  <div
                    className={styles.option}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.field}>
          <input type="text" onChange={handleDescriptionChange} />
        </div>
        <button className={styles.button}>Add income</button>
      </form>
    </div>
  );
};

export default NewIncome;
