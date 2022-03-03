import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div style={{ height: '500px', width: '400px', display: 'flex' }}>
    {child}
  </div>
);

export default {
  title: 'Menu',
  component: Menu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

export const normalState = () => (
  <Menu
    onLanguageChange={actions('onLanguageChange').onLanguageChange}
    onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
    showMenuOnMobile={false}
    isMobile={false}
  />
);

export const mobileState = () =>
  guaranteedSize(
    <Menu
      onLanguageChange={actions('onLanguageChange').onLanguageChange}
      onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
      showMenuOnMobile
      isMobile
    />
  );
