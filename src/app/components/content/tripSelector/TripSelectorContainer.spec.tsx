import React from 'react';
import { render, screen } from '@testing-library/react';
import TripSelectorContainer from './TripSelectorContainer';
import * as FirebaseProvider from '../../providers/FirebaseProvider';
import * as NavigationProvider from '../../providers/NavigationProvider';

describe('TripSelectorContainer', () => {
  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

  describe('when stations have been loaded', () => {
    it('renders the trip selector content', () => {
      useFirebaseMock.mockReturnValue({
        stations: [
          {
            id: 'some_station',
            name: 'Some station',
            lines: ['green'],
            connectedStations: [],
          },
        ],
        lines: [],
      });

      useNavigationMock.mockReturnValue({
        origin: {
          connectedStations: [],
          id: '',
          lines: [],
          name: '',
        },
        destination: {
          connectedStations: [],
          id: '',
          lines: [],
          name: '',
        },
        departureTime: '10:24',
        departureDate: '2021-12-25',
        setNewDepartureTime: jest.fn(),
        setNewDepartureDate: jest.fn(),
        setOriginStation: jest.fn(),
        setDestinationStation: jest.fn(),
        generateStationsMap: jest.fn(),
        calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
      });

      render(
        <TripSelectorContainer
          onMenuButtonClick={() => {}}
          onSearchButtonClick={() => {}}
        />
      );

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        })
      ).toBeVisible();
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        })
      ).toBeVisible();
      expect(
        screen.getByRole('button', {
          name: 'Content.TripSelector.SEARCH_BUTTON',
        })
      ).toBeVisible();
    });
  });
});
