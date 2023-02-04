import React, { useState } from "react";
import styles from "./CustomSelect.module.scss";
const CustomSelect = ({ selectText, options }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={handleClick}>{selectText}</button>
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
