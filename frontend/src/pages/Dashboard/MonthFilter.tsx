import React from "react";
import { ReactComponent as FilterIcon } from "../../assets/icons/arrowDown.svg";
import CustomSelect from "../../components/UI/CustomSelect";
import styles from "./MonthFilter.module.scss";
const MonthFilter = () => {
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const months = ["September", "October", "November", "December", currentMonth];
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.wrapper}>
      <div className={styles.dateContainer}>
        {/* <div className={styles.customSelect}>
          <select>
            <option selected> {currentMonth}</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
          </select>
        </div> */}
        <CustomSelect selectText={"choose month"} options={months} />

        <select className={styles.customSelect}>
          <option selected>{currentYear}</option>
          <option>2022</option>
          <option>2021</option>
        </select>
      </div>
      <FilterIcon className={styles.icon} />
    </div>
  );
};

export default MonthFilter;
