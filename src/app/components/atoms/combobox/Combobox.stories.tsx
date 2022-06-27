import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Combobox from './Combobox';

export default {
  component: Combobox,
  title: 'Atoms / Combobox',
} as Meta;

export const WithoutInput: React.FC = () => (
  <Combobox
    toggleButtonTitle=""
    onChange={actions('onChange').onChange}
    placeholder="Origin"
    clearButtonTitle=""
    onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    name="origin"
    inputValue=""
    options={[
      { value: '1', text: 'opt 1' },
      { value: '2', text: 'opt 2' },
      { value: '3', text: 'opt 3' },
      { value: '4', text: 'opt 4' },
      { value: '5', text: 'opt 5' },
      { value: '6', text: 'opt 6' },
      { value: '7', text: 'opt 7' },
      { value: '8', text: 'opt 8' },
      { value: '9', text: 'opt 9' },
      { value: '10', text: 'opt 10' },
    ]}
  />
);

export const WithInput: React.FC = () => (
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
