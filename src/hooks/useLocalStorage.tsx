import { useState, useEffect } from "react";
import type { ColorParsed } from "../utils/predefined-colors";
import { colorList } from "../utils/predefined-colors";

type ReturnType<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>
]

// Hook for communication with local storage
export const useLocalStorage = (key: string, initialValue: string): ReturnType<ColorParsed[]> => {
  const initialArray = initialValue === '' ? colorList : initialValue
  const [state, setState] = useState<ColorParsed[]>(() => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : initialArray
    } catch (error) {
      return initialArray;
    }
  });

  useEffect(() => {
    if(state) {
      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch (error) {
        console.log(error)
      }
    }
  }, [state, key])

  return [state, setState]
}