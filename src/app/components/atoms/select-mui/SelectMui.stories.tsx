import React from 'react';
import { Meta } from '@storybook/react';
import SelectMui from './SelectMui';

export default {
  component: SelectMui,
  title: 'Atoms / SelectMui',
} satisfies Meta;

export const BasicInNormalState: React.FC = () => (
  <SelectMui
    label="Device"
    selectedOption="laptop"
    onChange={() => ({})}
    options={[
      { value: 'laptop', text: 'Laptop' },
      { value: 'android', text: 'Android' },
      { value: 'iphone', text: 'iPhone' },
    ]}
  />
);
