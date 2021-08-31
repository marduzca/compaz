import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Menu from './Menu';

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div style={{ height: '500px', width: '400px', display: 'flex' }}>
    {child}
  </div>
);

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

export const mobileState = () =>
  guaranteedSize(
    <Menu
      onLanguageChange={actions('onLanguageChange').onLanguageChange}
      onLogoClick={actions('onLogoClick').onLogoClick}
      onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
      showMenuOnMobile
      fixNightMessage
    />
  );
