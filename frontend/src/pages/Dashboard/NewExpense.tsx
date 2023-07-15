import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../features/categories/categoriesSlice";
import styles from "./NewExpense.module.scss";
import { ReactComponent as ArrowDown } from "../../assets/icons/selectArrow.svg";

const NewExpense = () => {
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [isDropdownShown, setDropdownShown] = useState(false);
  // use currency
  const [sum, setSum] = useState(0);
  const [description, setDescription] = useState("");
  const categories = useSelector(selectCategories);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //TODO add new expense
    console.log(sum, description, selectedCategory);
  };

  const handleSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value) {
      setSum(Number(e.target.value));
    }
    else setSum(0);
  };

  const handleCategoryChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setSelectedCategory(target.innerHTML);
    setDropdownShown(false);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <h1>Add new expense</h1>
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
                  <div key={category.id} className={styles.option} onClick={handleCategoryChange}>
                    {category.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="text"
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            value={description}
          />
        </div>
        <button type="submit" disabled={!(sum && selectedCategory)}  className={styles.button}>
          Add expense
        </button>
      </form>
    </div>
  );
};

export default NewExpense;
