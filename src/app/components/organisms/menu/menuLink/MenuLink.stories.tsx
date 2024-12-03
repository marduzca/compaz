import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import MenuLink from './MenuLink';
import HomeIcon from '../../../../static/svg/home.svg?react';

export default {
  title: 'General / Menu / MenuLink',
  component: MenuLink,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

export const MarkedAsCurrentPageInNormalState = () => (
  <MenuLink
    name="Home"
    icon={<HomeIcon />}
    href=""
    isCurrentPage
    onLinkClick={actions('onLinkClick').onLinkClick}
  />
);

export const MarkedAsCurrentPageInMobileState = () => (
  <MenuLink
    name="Home"
    icon={<HomeIcon />}
    href=""
    isCurrentPage
    onLinkClick={actions('onLinkClick').onLinkClick}
  />
);
