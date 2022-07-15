import React from 'react';
import { Meta } from '@storybook/react';
import Loader from './Loader';

export default {
  component: Loader,
  title: 'Atoms / Loader',
} as Meta;

export const NormalState: React.FC = () => (
  <Loader ariaLabel="Loading something" />
);
