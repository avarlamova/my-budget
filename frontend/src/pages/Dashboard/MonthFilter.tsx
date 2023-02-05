import React from "react";
import CustomSelect from "../../components/UI/CustomSelect";
import styles from "./MonthFilter.module.scss";
const MonthFilter = () => {
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const months = ["September", "October", "November", "December", currentMonth];
  const currentYear = new Date().getFullYear();
  const years = [2020, 2021, 2022, 2023];
  return (
    <div className={styles.wrapper}>
      <div className={styles.dateContainer}>
        <CustomSelect selectText={currentMonth} options={months} />
        <CustomSelect selectText={currentYear} options={years} />
      </div>
    </div>
  );
};

export default MonthFilter;
