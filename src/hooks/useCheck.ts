import { useState } from "react";

export const useCheck = (initialValue = false) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  const changeChecked = () => setIsChecked(!isChecked);

  return { isChecked, changeChecked };
};

export default useCheck;
