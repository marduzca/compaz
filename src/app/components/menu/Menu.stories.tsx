import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Menu from './Menu';

export default {
  title: 'Menu',
  component: Menu,
} as Meta;

export const normalState = () => (
  <Menu
    onLanguageChange={actions('onLanguageChange').onLanguageChange}
    onLogoClick={actions('onLogoClick').onLogoClick}
    onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
    showMenuOnMobile={false}
  />
);

export const mobileState = () => (
  <Menu
    onLanguageChange={actions('onLanguageChange').onLanguageChange}
    onLogoClick={actions('onLogoClick').onLogoClick}
    onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
    showMenuOnMobile
    fixNightMessage
  />
);
