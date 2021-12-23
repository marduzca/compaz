import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import StationsSelector from './StationsSelector';

export default {
  title: 'StationsSelector',
  component: StationsSelector,
} as Meta;

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div
    style={{
      width: '400px',
    }}
  >
    {child}
  </div>
);

export const normalState = () =>
  guaranteedSize(
    <StationsSelector
      stations={[]}
      originInputValue=""
      destinationInputValue=""
      originValidationError={false}
      destinationValidationError={false}
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    />
  );

export const withInputTextNormalState = () =>
  guaranteedSize(
    <StationsSelector
      stations={[]}
      originInputValue="my origin"
      destinationInputValue="my destination"
      originValidationError={false}
      destinationValidationError={false}
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    />
  );

export const withErrorNormalState = () =>
  guaranteedSize(
    <StationsSelector
      stations={[]}
      originInputValue="a non-existent location"
      destinationInputValue="a non-existent location"
      originValidationError
      destinationValidationError
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    />
  );
