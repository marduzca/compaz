import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import MenuLink from './MenuLink';
import HomeIcon from '../../../../static/svg/home.svg?react';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../../.storybook/preview';

export default {
  title: 'General / Menu / MenuLink',
  component: MenuLink,
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta;

export const MarkedAsCurrentPage = () => (
  <MenuLink
    name="Home"
    icon={<HomeIcon />}
    href=""
    isCurrentPage
    onLinkClick={actions('onLinkClick').onLinkClick}
  />
);
MarkedAsCurrentPage.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT],
    },
  },
};
