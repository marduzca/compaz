import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import * as MockDate from 'mockdate';

import Navigation from './Navigation';
import { FirebaseContext } from '../providers/firebase/FirebaseProvider';

export default {
  component: Navigation,
  title: 'Navigation',
  decorators: [
    (Story) => (
      <FirebaseContext.Provider
        value={{
          lines: [{ id: 'green', stationsPath: [], connectedLines: [] }],
          stations: [
            {
              id: 'origin_station',
              name: 'Origin station',
              lines: ['green'],
              connectedStations: [],
              geoLocation: { latitude: 0, longitude: 0 },
            },
          ],
          storeMessage: async () => true,
        }}
      >
        <Story />
      </FirebaseContext.Provider>
    ),
  ],
} as Meta;

export const NormalStateWithNightBackground = () => {
  MockDate.set('1993-03-15T19:30:00.000Z');

  return (
    <Navigation
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
      isMobileMenuOpen={false}
    />
  );
};

export const NormalStateWithDayBackground = () => {
  MockDate.set('1993-03-15T09:30:00.000Z');

  return (
    <Navigation
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
      isMobileMenuOpen={false}
    />
  );
};
