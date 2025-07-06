import React from 'react';
import { Meta } from '@storybook/react-vite';
import Loader from './Loader';

export default {
  component: Loader,
  title: 'Atoms / Loader',
} satisfies Meta;

export const NormalState: React.FC = () => (
  <Loader ariaLabel="Loading something" />
);
