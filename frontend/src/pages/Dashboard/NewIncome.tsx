import React, { useState } from "react";
import styles from "./NewIncome.module.scss";
import { ReactComponent as ArrowDown } from "../../assets/icons/selectArrow.svg";
import { selectCategories } from "../../features/categories/categoriesSlice";
import { useSelector } from "react-redux";

// TODO extend newexpense component

const NewIncome = () => {
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [isDropdownShown, setDropdownShown] = useState(false);
  // use currency
  const [sum, setSum] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(sum, description, selectedCategory);
  };

  const handleSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value) {
      setSum(Number(e.target.value));
    } else setSum(0);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <h1>Add new income</h1>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.field}>
          {/* TODO add currency symbol */}
          <input
            type="text"
            placeholder="Enter sum"
            onChange={handleSumChange}
            value={sum}
          />
        </div>
        {/* TODO add category */}
        <div className={styles.field}>
          <input
            type="text"
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            value={description}
          />
        </div>
        <button type="submit" disabled={!sum} className={styles.button}>
          Add income
        </button>
      </form>
    </div>
  );
};

export default NewIncome;
