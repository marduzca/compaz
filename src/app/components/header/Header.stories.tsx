import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Header from './Header';

export default {
  title: 'Header',
  component: Header,
} as Meta;

export const normalState = () => (
  <Header
    onLanguageChange={actions('onLanguageChange').onLanguageChange}
    onLogoClick={actions('onLogoClick').onLogoClick}
    onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
    showMenuOnMobile={false}
  />
);

export const mobileState = () => (
  <Header
    onLanguageChange={actions('onLanguageChange').onLanguageChange}
    onLogoClick={actions('onLogoClick').onLogoClick}
    onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
    showMenuOnMobile
  />
);
