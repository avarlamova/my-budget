import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const getValue = () => {
    const res = localStorage.getItem(key);
    return res ? JSON.parse(res) : initialValue;
  };

  const [value, setValue] = useState(getValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
export default useLocalStorage;
