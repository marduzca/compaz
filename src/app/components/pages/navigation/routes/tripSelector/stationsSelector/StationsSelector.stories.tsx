import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import StationsSelector from './StationsSelector';

export default {
  title: 'NavigationPage / TripSelector /StationsSelector',
  component: StationsSelector,
} as Meta;

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div
    style={{
      width: '400px',
    }}
  >
    {child}
  </div>
);

export const NormalState = () =>
  guaranteedSize(
    <StationsSelector
      stations={[]}
      originInputValue=""
      destinationInputValue=""
      showOriginValidationError={false}
      showDestinationValidationError={false}
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearOriginButtonClick={
        actions('onClearOriginButtonClick').onClearOriginButtonClick
      }
      onClearDestinationButtonClick={
        actions('onClearDestinationButtonClick').onClearDestinationButtonClick
      }
    />
  );

export const WithInputTextNormalState = () =>
  guaranteedSize(
    <StationsSelector
      stations={[]}
      originInputValue="my origin"
      destinationInputValue="my destination"
      showOriginValidationError={false}
      showDestinationValidationError={false}
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearOriginButtonClick={
        actions('onClearOriginButtonClick').onClearOriginButtonClick
      }
      onClearDestinationButtonClick={
        actions('onClearDestinationButtonClick').onClearDestinationButtonClick
      }
    />
  );

export const WithValidationErrorNormalState = () =>
  guaranteedSize(
    <StationsSelector
      stations={[]}
      originInputValue="a non-existent location"
      destinationInputValue="a non-existent location"
      showOriginValidationError
      showDestinationValidationError
      onOriginChange={actions('onOriginChange').onOriginChange}
      onDestinationChange={actions('onDestinationChange').onDestinationChange}
      onSwitcherClick={actions('onSwitcherClick').onSwitcherClick}
      onClearOriginButtonClick={
        actions('onClearOriginButtonClick').onClearOriginButtonClick
      }
      onClearDestinationButtonClick={
        actions('onClearDestinationButtonClick').onClearDestinationButtonClick
      }
    />
  );
