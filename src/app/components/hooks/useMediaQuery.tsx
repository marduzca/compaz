import { useState, useEffect } from 'react';

const useMediaQuery = (): boolean => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 950px)').matches
  );

  useEffect(() => {
    window
      .matchMedia('(max-width: 950px)')
      .addEventListener('change', (e) => setIsMobile(e.matches));
  }, []);

  return isMobile;
};

export default useMediaQuery;
