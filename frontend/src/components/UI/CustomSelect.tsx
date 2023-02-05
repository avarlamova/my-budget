import React, { useState } from "react";
import styles from "./CustomSelect.module.scss";
import { ReactComponent as FilterIcon } from "../../assets/icons/arrowDown.svg";

const CustomSelect = ({ selectText, options }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.container} onClick={handleClick}>
        <button className={styles.button}>{selectText}</button>
        <FilterIcon className={styles.icon} />
      </div>
      {isOpen && (
        <ul className={styles.list}>
          {options.map((option: any) => (
            <li className={styles.listItem} key={option.id}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CustomSelect;
