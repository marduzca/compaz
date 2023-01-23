import React from 'react';
import { Meta } from '@storybook/react';
import LoadingPage from './LoadingPage';

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div
    style={{
      width: '100%',
      height: '800px',
    }}
  >
    {child}
  </div>
);

export default {
  title: 'NavigationPage / LoadingPage',
  component: LoadingPage,
} as Meta;

export const NormalAndMobileState = () => guaranteedSize(<LoadingPage />);
