import React from 'react';
import { Meta } from '@storybook/react';
import LoadingPage from './LoadingPage';

export default {
  title: 'LoadingPage',
  component: LoadingPage,
} as Meta;

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div
    style={{
      width: '100%',
      height: '800px',
    }}
  >
    {child}
  </div>
);

export const normalAndMobileState = () => guaranteedSize(<LoadingPage />);
