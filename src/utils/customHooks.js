import { useState, useEffect } from 'react';

export const useMountDetection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return { isMounted };
};
