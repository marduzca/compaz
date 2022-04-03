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
  title: 'TripSelector',
  component: TripSelector,
} as Meta;

export const normalState = () =>
  guaranteedSize(
    <TripSelector
      showOriginMissingError={false}
      showDestinationMissingError={false}
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
      onSearchButtonClick={actions('onSearchButtonClick').onSearchButtonClick}
    />
  );

export const mobileState = () => (
  <TripSelector
    showOriginMissingError={false}
    showDestinationMissingError={false}
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    onSearchButtonClick={actions('onSearchButtonClick').onSearchButtonClick}
  />
);
