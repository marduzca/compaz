import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import TripSelector from './TripSelector';

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
} as Meta;

export const NormalState = () =>
  guaranteedSize(
    <TripSelector
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
      onSubmit={actions('onSubmit').onSubmit}
    />
  );

export const MobileState = () => (
  <TripSelector
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    onSubmit={actions('onSubmit').onSubmit}
  />
);
