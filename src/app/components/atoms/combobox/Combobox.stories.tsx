import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Combobox from './Combobox';

export default {
  component: Combobox,
  title: 'Atoms / Combobox',
} satisfies Meta;

export const WithoutInputInNormalState: React.FC = () => (
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

export const WithInputInNormalState: React.FC = () => (
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

export const WithIconsInNormalState: React.FC = () => (
  <Combobox
    isInitiallyOpen
    toggleButtonTitle=""
    onChange={actions('onChange').onChange}
    placeholder="Origin"
    clearButtonTitle=""
    onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    name="origin"
    inputValue="Station"
    options={[
      { value: '1', text: 'Station 1', lines: ['brown', 'blue'] },
      { value: '2', text: 'Station 2', lines: ['green'] },
      { value: '3', text: 'Station 3', lines: ['light_blue', 'orange'] },
      { value: '4', text: 'Station 4', lines: ['purple', 'red'] },
      { value: '5', text: 'Station 5', lines: ['silver', 'white'] },
      { value: '6', text: 'Station 6', lines: ['yellow'] },
    ]}
  />
);
