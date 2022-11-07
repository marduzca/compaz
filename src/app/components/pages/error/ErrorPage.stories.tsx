import React from 'react';
import { actions } from '@storybook/addon-actions';
import ErrorPage from './ErrorPage';

export default {
  component: ErrorPage,
  title: 'ErrorPage',
};

export const NormalAndMobileState: React.FC = () => (
  <ErrorPage
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);
