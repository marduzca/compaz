import React from 'react';
import { Meta } from '@storybook/react';
import LoadingPage from './LoadingPage';

export default {
  title: 'LoadingPage',
  component: LoadingPage,
} as Meta;

export const normalAndMobileState = () => <LoadingPage />;
