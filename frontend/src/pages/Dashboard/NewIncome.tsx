import React, { useState } from "react";
import styles from "../../styles/NewIncome.module.scss";
import { ReactComponent as ArrowDown } from "../../assets/icons/selectArrow.svg";
import { selectCategories } from "../../features/categories/categoriesSlice";
import { useSelector } from "react-redux";

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
    }
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

        <div className={styles.field}>
          <input
            type="text"
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            value={description}
          />
        </div>
        <button type="submit" className={styles.button}>
          Add income
        </button>
      </form>
    </div>
  );
};

export default NewIncome;
