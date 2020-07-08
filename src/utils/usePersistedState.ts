import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * Dispatch e SetStateAction são as interfaces que o react dispoe 
 * para tipar os hooks 
 */

/**
 * @param key 
 * @param initialState 
 */

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>,
];

export default function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}