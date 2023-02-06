import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomSelect from "../../components/UI/CustomSelect";
import { setFilters } from "../../features/filters/filtersSlice";
import styles from "./MonthFilter.module.scss";
const MonthFilter = () => {
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const months = ["September", "October", "November", "December", currentMonth];
  const currentYear = new Date().getFullYear();
  const years = [2020, 2021, 2022, 2023];
  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const onMonthChange = (event: any) => {
    setSelectedMonth(event.target.getAttribute("data-value"));
  };

  const onYearChange = (event: any) => {
    setSelectedYear(event.target.getAttribute("data-value"));
  };

  const handleSubmit = () => {
    dispatch(setFilters({ year: selectedYear, month: selectedMonth }));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.dateContainer}>
        <CustomSelect
          selectText={selectedMonth}
          options={months}
          handleChange={onMonthChange}
        />
        <CustomSelect
          selectText={selectedYear}
          options={years}
          handleChange={onYearChange}
        />
      </div>
      <button onClick={handleSubmit}> Apply filters </button>
    </div>
  );
};

export default MonthFilter;
