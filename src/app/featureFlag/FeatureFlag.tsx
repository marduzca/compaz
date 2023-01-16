import React from 'react';

export const DISABLE_MESSAGE_STORAGE_FLAG = 'disableMessageStorage';
export const MAP_PAGE_FLAG = 'mapPageFlag';

const getParam = (key: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  const param = searchParams.get(key);
  if (param !== null) {
    localStorage.setItem(key, param);
  }
  return param;
};

export const isFeatureFlagSet = (key: string): boolean => {
  let flag = localStorage.getItem(key);
  if (flag === null) {
    flag = getParam(key);
  }
  return flag !== null;
};

interface FeatureFlagProps {
  flag: string;
  children: React.ReactChildren;
}

const FeatureFlag = (props: FeatureFlagProps): React.ReactNode | null => {
  if (isFeatureFlagSet(props.flag)) {
    return <>{props.children}</>;
  }
  return null;
};

export default FeatureFlag;
