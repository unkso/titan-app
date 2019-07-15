import { useCallback, useEffect, useRef, useState } from 'react';

/** A react hook that forces the component to re-render. */
export function useForceUpdate () {
  const [, setTick] = useState(0);
  return useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
}

/**
 * @param initialValue
 * @param duration
 * @returns {[*, Function]}
 */
export function useDebounce (initialValue, duration) {
  let timeout;
  const [value, setValue] = useState(initialValue);
  const handler = (newValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setValue(newValue);
    }, duration);
  };

  useEffect(() => {
    handler(initialValue);
  }, []);

  return [value, handler];
}

/**
 * @param initialValue
 * @param duration
 * @returns {[*, Function]}
 */
export function useThrottle (initialValue, duration) {
  const timeout = useRef();
  const nextValue = useRef();
  const hasNextValue = useRef(false);
  const [value, setValue] = useState(initialValue);
  function changeHandler (newValue) {
    if (!timeout.current) {
      setValue(newValue);
      timeout.current = setTimeout(() => {
        clearTimeout(timeout.current);
        timeout.current = undefined;

        if (hasNextValue.current) {
          hasNextValue.current = false;
          changeHandler(nextValue.current);
        }
      }, duration);
    } else {
      nextValue.current = newValue;
      hasNextValue.current = true;
    }
  }

  useEffect(() => {
    changeHandler(initialValue);
  }, [initialValue]);

  return [value, changeHandler];
}
