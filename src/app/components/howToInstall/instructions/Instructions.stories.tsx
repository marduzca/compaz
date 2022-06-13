import React from 'react';
import { Meta } from '@storybook/react';
import Instructions from './Instructions';

export default {
  component: Instructions,
  title: 'HowToInstall / Instructions',
} as Meta;

export const NormalAndMobileState: React.FC = () => <Instructions />;
