import { useSyncExternalStore } from 'react';

const MOBILE_QUERY = '(max-width: 950px)';

const subscribe = (onChange: () => void) => {
  const mediaQueryList = window.matchMedia(MOBILE_QUERY);
  mediaQueryList.addEventListener('change', onChange);

  return () => mediaQueryList.removeEventListener('change', onChange);
};

const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;

const useMediaQuery = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot);

export default useMediaQuery;
