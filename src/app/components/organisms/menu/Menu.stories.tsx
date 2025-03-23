import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import Menu from './Menu';
import { MOBILE_VIEWPORT } from '../../../../../.storybook/preview';

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div style={{ height: '500px', width: '400px', display: 'flex' }}>
    {child}
  </div>
);

export default {
  title: 'General / Menu / Menu',
  component: Menu,
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta;

export const Basic = () => (
  <Menu
    onLanguageChange={actions('onLanguageChange').onLanguageChange}
    onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
    showMenuOnMobile={false}
    isMobile={false}
  />
);

export const BasicMobile = () =>
  guaranteedSize(
    <Menu
      onLanguageChange={actions('onLanguageChange').onLanguageChange}
      onHideMobileMenu={actions('onBackButtonClick').onBackButtonClick}
      showMenuOnMobile
      isMobile
    />,
  );
BasicMobile.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT],
    },
  },
};
