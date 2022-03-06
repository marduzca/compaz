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
      showOriginValidationError={false}
      showDestinationValidationError={false}
      showOriginMissingError={false}
      showDestinationMissingError={false}
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
      showOriginValidationError={false}
      showDestinationValidationError={false}
      showOriginMissingError={false}
      showDestinationMissingError={false}
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    />
  );

export const withValidationErrorNormalState = () =>
  guaranteedSize(
    <StationsSelector
      stations={[]}
      originInputValue="a non-existent location"
      destinationInputValue="a non-existent location"
      showOriginValidationError
      showDestinationValidationError
      showOriginMissingError={false}
      showDestinationMissingError={false}
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    />
  );

export const withMissingErrorNormalState = () =>
  guaranteedSize(
    <StationsSelector
      stations={[]}
      originInputValue=""
      destinationInputValue=""
      showOriginValidationError={false}
      showDestinationValidationError={false}
      showOriginMissingError
      showDestinationMissingError
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearButtonClick={actions('onClearButtonClick').onClearButtonClick}
    />
  );
