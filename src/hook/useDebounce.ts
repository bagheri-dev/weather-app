import { useEffect, useState } from "react";

export const useDebounce = <ElementType>(value: ElementType): ElementType => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
};
