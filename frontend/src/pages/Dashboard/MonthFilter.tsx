import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomSelect from "../../components/UI/CustomSelect";
import {
  useFiltersMutation,
  useMemoryMutation,
} from "../../features/filters/filtersApiSlice";
import { setFilters } from "../../features/filters/filtersSlice";
import styles from "./MonthFilter.module.scss";
const MonthFilter = () => {
  let currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const months = ["September", "October", "November", "December", currentMonth];
  let currentYear = new Date().getFullYear();
  const years = [2020, 2021, 2022, 2023];
  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [setFilter] = useMemoryMutation();
  const [filters] = useFiltersMutation();

  useEffect(() => {
    async function fetchData() {
      const filtersData = await filters({}).unwrap();
      if (filtersData) {
        setSelectedMonth(filtersData.month);
        setSelectedYear(filtersData.year);
      }
    }
    fetchData();
  }, []); // no dependencies => when component loads

  const onMonthChange = (event: any) => {
    setSelectedMonth(event.target.getAttribute("data-value"));
  };

  const onYearChange = (event: any) => {
    setSelectedYear(event.target.getAttribute("data-value"));
  };

  const handleSubmit = async () => {
    dispatch(setFilters({ year: selectedYear, month: selectedMonth }));
    await setFilter({ year: selectedYear, month: selectedMonth });
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
      <button className={styles.filtersBtn} onClick={handleSubmit}>
        Apply filters
      </button>
    </div>
  );
};

export default MonthFilter;
