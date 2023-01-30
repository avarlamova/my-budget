import React from "react";

const CurrentMonth = () => {
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear();
  return (
    <div>
      {currentMonth} {currentYear}
    </div>
  );
};

export default CurrentMonth;
