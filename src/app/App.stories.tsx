import React from 'react';
import withMock from 'storybook-addon-mock';
import { Meta } from '@storybook/react';
import App from './App';

export default {
  title: 'Full Page',
  component: App,
  decorators: [withMock],
} as Meta;

const normalAndMobileStateComponent = () => <App />;

export const normalAndMobileState = normalAndMobileStateComponent.bind({});
// @ts-ignore
normalAndMobileState.parameters = {
  mockData: [
    {
      url: 'https://us-central1-compaz.cloudfunctions.net/helloWorld',
      method: 'GET',
      status: 200,
      response: {
        data: 'Hello storybook-addon-mock!',
      },
    },
  ],
};
