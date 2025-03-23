import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import TripSelector from './TripSelector';
import { MOBILE_VIEWPORT } from '../../../../../../../.storybook/preview';

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div
    style={{
      height: '400px',
      width: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    {child}
  </div>
);

export default {
  title: 'NavigationPage / TripSelector',
  component: TripSelector,
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta;

export const Basic = () =>
  guaranteedSize(
    <TripSelector
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
      onSubmit={actions('onSubmit').onSubmit}
    />,
  );

export const BasicMobile = () => (
  <TripSelector
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    onSubmit={actions('onSubmit').onSubmit}
  />
);
BasicMobile.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT],
    },
  },
};
