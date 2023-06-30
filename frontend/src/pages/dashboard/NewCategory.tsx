import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../features/categories/categoriesSlice";
import styles from "./NewCategory.module.scss";
import { ReactComponent as ArrowDown } from "../../assets/icons/selectArrow.svg";
import { selectIcons } from "../../features/categories/categoriesSlice";

const NewCategory = () => {
  const [isDropdownShown, setDropdownShown] = useState(false);
  // use currency
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("")
  const [description, setDescription] = useState("");
  const categories = useSelector(selectCategories);
  const categoryIcons = useSelector(selectIcons)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(categoryName, description);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value.trim());
  };

  const handleIconChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    console.log(target)
    setCategoryIcon(target.innerHTML);
    setDropdownShown(false);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <h1>Add new category</h1>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Enter category name"
            onChange={handleCategoryChange}
            value={categoryName}
          />
        </div>

        <div className={styles.fieldWrapper}>
          <div
            className={styles.dropDown}
            onClick={() => setDropdownShown(!isDropdownShown)}
          >
            <div className={styles.selectedCategory}>{categoryIcon}</div>
            <ArrowDown className={styles.selectIcon} />
          </div>
          {isDropdownShown && (
            <div className={styles.categories}>
              {categories.map((category) => {
                return (
                  <div className={styles.option} onClick={handleIconChange}>
                    {category}
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
        <button type="submit" className={styles.button}>
          Add expense
        </button>
      </form>
    </div>
  );
};

export default NewCategory;
