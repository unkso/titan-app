import { useCallback, useState } from 'react';

/** A react hook that forces the component to re-render. */
export function useForceUpdate () {
  const [, setTick] = useState(0);
  return useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
}
