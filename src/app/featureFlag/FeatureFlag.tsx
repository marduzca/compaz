import React from 'react';

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

const FeatureFlag = (props: FeatureFlagProps): JSX.Element | null => {
  if (isFeatureFlagSet(props.flag)) {
    return <>{props.children}</>;
  }
  return null;
};

export default FeatureFlag;