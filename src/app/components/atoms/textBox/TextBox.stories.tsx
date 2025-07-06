import React from 'react';
import { Meta } from '@storybook/react-vite';
import { actions } from 'storybook/actions';
import TextBox from './TextBox';

export default {
  component: TextBox,
  title: 'Atoms / TextBox',
} satisfies Meta;

export const WithoutInput: React.FC = () => (
  <TextBox value="" onChange={actions('onChange').onChange} label="Name" />
);

export const WithInput: React.FC = () => (
  <TextBox
    value="El Chavito"
    onChange={actions('onChange').onChange}
    label="Name"
  />
);
