import React from 'react';
import { Meta } from '@storybook/react';
import App from './App';

export default {
  title: 'Full Page',
  component: App,
} as Meta;

export const normalState = () => <App />;
