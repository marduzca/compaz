import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import Menu from './Menu';

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div style={{ height: '500px', width: '400px', display: 'flex' }}>
    {child}
  </div>
);

export default {
  title: 'General / Menu / Menu',
  component: Menu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

export const NormalState = () => (
  <Menu
    onLanguageChange={actions('onLanguageChange').onLanguageChange}
    onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
    showMenuOnMobile={false}
    isMobile={false}
  />
);

export const MobileState = () =>
  guaranteedSize(
    <Menu
      onLanguageChange={actions('onLanguageChange').onLanguageChange}
      onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
      showMenuOnMobile
      isMobile
    />,
  );
