import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import MenuItem from './MenuItem';
import { ReactComponent as ContactIcon } from '../../../static/svg/contact.svg';

export default {
  title: 'General / Menu / MenuItem',
  component: MenuItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

export const MarkedAsCurrentPageInNormalState = () => (
  <MenuItem
    content="Contact"
    icon={<ContactIcon />}
    href=""
    isCurrentPage
    onLinkClick={actions('onLinkClick').onLinkClick}
  />
);
