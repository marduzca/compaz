import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import * as MockDate from 'mockdate';

import { MemoryRouter } from 'react-router-dom';
import NavigationPage from './NavigationPage';
import { FirebaseContext } from '../../providers/firebase/FirebaseProvider';
import { LineColor } from '../../domain';

export default {
  component: NavigationPage,
  title: 'NavigationPage',
  decorators: [
    (Story) => (
      <FirebaseContext.Provider
        value={{
          lines: [
            { id: LineColor.GREEN, stationsPath: [], connectedLines: [] },
          ],
          stations: [
            {
              id: 'origin_station',
              name: 'Origin station',
              lines: [LineColor.GREEN],
              connectedStations: [],
              geoLocation: { latitude: 0, longitude: 0 },
            },
          ],
          storeMessage: async () => true,
        }}
      >
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </FirebaseContext.Provider>
    ),
  ],
} as Meta;

export const NormalStateWithNightBackground = () => {
  MockDate.set('1993-03-15T19:30:00.000Z');

  return (
    <NavigationPage
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
      isMobileMenuOpen={false}
    />
  );
};

export const NormalStateWithDayBackground = () => {
  MockDate.set('1993-03-15T09:30:00.000Z');

  return (
    <NavigationPage
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
      isMobileMenuOpen={false}
    />
  );
};
