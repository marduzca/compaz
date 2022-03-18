import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import TextBox from './TextBox';

export default {
  component: TextBox,
  title: 'Atoms / TextBox',
} as Meta;

export const withoutInput: React.FC = () => (
  <TextBox
    value=""
    onChange={actions('onChange').onChange}
    name="name"
    label="Name"
  />
);

export const withInput: React.FC = () => (
  <TextBox
    value="El Chavito"
    onChange={actions('onChange').onChange}
    name="name"
    label="Name"
  />
);
