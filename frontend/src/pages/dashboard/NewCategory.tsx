import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../features/categories/categoriesSlice";
import styles from "./NewCategory.module.scss";
import { ReactComponent as ArrowDown } from "../../assets/icons/selectArrow.svg";
import { selectIcons } from "../../features/categories/categoriesSlice";
import IconPicker from "../../components/UI/IconPicker";

const NewCategory = () => {
  const [isDropdownShown, setDropdownShown] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("")
  const [description, setDescription] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(categoryName, description);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value.trim());
  };

  const handleIconChange = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const elementClasses = Array.from(target.classList)
    setCategoryIcon(elementClasses.filter(el => el!== 'mdi')[0]);
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
          {isDropdownShown && <IconPicker onIconChange = {handleIconChange} />}
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
