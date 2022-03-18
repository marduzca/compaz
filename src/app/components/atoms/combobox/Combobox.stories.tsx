import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Combobox from './Combobox';

export default {
  component: Combobox,
  title: 'Atoms / Combobox',
} as Meta;

export const withoutInput: React.FC = () => (
  <Combobox
    toggleButtonTitle=""
    onChange={actions('onChange').onChange}
    placeholder="Origin"
    clearButtonTitle=""
    onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    name="origin"
    inputValue=""
    options={[]}
  />
);

export const withInput: React.FC = () => (
  <Combobox
    toggleButtonTitle=""
    onChange={actions('onChange').onChange}
    placeholder="Origin"
    clearButtonTitle=""
    onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    name="origin"
    inputValue="Irpavi"
    options={[]}
  />
);
