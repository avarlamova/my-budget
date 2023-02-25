import React, { useState } from "react";
import styles from "./CustomSelect.module.scss";
import { ReactComponent as FilterIcon } from "../../assets/icons/arrowDown.svg";

const CustomSelect = ({ selectText, options, handleChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const openFilters = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e: any) => {
    handleChange(e);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer} onClick={openFilters}>
        <button className={styles.button}>{selectText}</button>
        <FilterIcon className={styles.icon} />
      </div>
      {isOpen && (
        <ul className={styles.list}>
          {options.map((option: any) => (
            <li
              data-value={option}
              className={styles.listItem}
              key={option.id}
              onClick={handleClick}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
