import { useState, useEffect } from 'react';
 
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
 
  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
 
    return () => {
      clearTimeout(debounceHandler);
    };
  }, [value, delay]);
 
  return debouncedValue;
}