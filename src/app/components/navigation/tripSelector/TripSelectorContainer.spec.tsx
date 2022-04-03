import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TripSelectorContainer from './TripSelectorContainer';
import * as FirebaseProvider from '../../providers/FirebaseProvider';
import * as NavigationProvider from '../../providers/NavigationProvider';
import { Station } from '../../domain';

describe('TripSelectorContainer', () => {
  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

  const availableStations = [
    {
      id: 'some_station',
      name: 'Some station',
      lines: ['green'],
      connectedStations: [],
      geoLocation: { latitude: 0, longitude: 0 },
    },
    {
      id: 'another_station',
      name: 'Another station',
      lines: ['green'],
      connectedStations: [],
      geoLocation: { latitude: 0, longitude: 0 },
    },
  ] as Station[];

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: [
        {
          id: 'some_station',
          name: 'Some station',
          lines: ['green'],
          connectedStations: [],
          geoLocation: { latitude: 0, longitude: 0 },
        },
        {
          id: 'another_station',
          name: 'Another station',
          lines: ['green'],
          connectedStations: [],
          geoLocation: { latitude: 0, longitude: 0 },
        },
      ],
      lines: [],
      storeMessage: () => true,
    });

    useNavigationMock.mockReturnValue({
      origin: undefined,
      destination: undefined,
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: jest.fn(),
      setNewDepartureDate: jest.fn(),
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('when stations have been loaded', () => {
    it('renders the trip selector content', () => {
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

  describe('Search button', () => {
    it('calls the corresponding function when both origin and destination are selected', async () => {
      useNavigationMock.mockReturnValue({
        origin: availableStations[0],
        destination: availableStations[1],
        departureTime: '10:24',
        departureDate: '2021-12-25',
        setNewDepartureTime: jest.fn(),
        setNewDepartureDate: jest.fn(),
        setOriginStation: jest.fn(),
        setDestinationStation: jest.fn(),
        generateStationsMap: jest.fn(),
        calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
      });

      const onSearchButtonClickMock = jest.fn();

      render(
        <TripSelectorContainer
          onMenuButtonClick={() => {}}
          onSearchButtonClick={onSearchButtonClickMock}
        />
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Content.TripSelector.SEARCH_BUTTON',
        })
      );

      expect(onSearchButtonClickMock).toHaveBeenCalledTimes(1);
    });

    it('shows error message in origin when origin is not selected', async () => {
      useNavigationMock.mockReturnValue({
        origin: undefined,
        destination: availableStations[1],
        departureTime: '10:24',
        departureDate: '2021-12-25',
        setNewDepartureTime: jest.fn(),
        setNewDepartureDate: jest.fn(),
        setOriginStation: jest.fn(),
        setDestinationStation: jest.fn(),
        generateStationsMap: jest.fn(),
        calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
      });

      const onSearchButtonClickMock = jest.fn();

      render(
        <TripSelectorContainer
          onMenuButtonClick={() => {}}
          onSearchButtonClick={onSearchButtonClickMock}
        />
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Content.TripSelector.SEARCH_BUTTON',
        })
      );

      expect(onSearchButtonClickMock).not.toHaveBeenCalled();
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER Content.TripSelector.ERROR_ORIGIN_MISSING',
        })
      ).toBeVisible();
    });

    it('shows error message in destination when destination is not selected', async () => {
      useNavigationMock.mockReturnValue({
        origin: availableStations[0],
        destination: undefined,
        departureTime: '10:24',
        departureDate: '2021-12-25',
        setNewDepartureTime: jest.fn(),
        setNewDepartureDate: jest.fn(),
        setOriginStation: jest.fn(),
        setDestinationStation: jest.fn(),
        generateStationsMap: jest.fn(),
        calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
      });

      const onSearchButtonClickMock = jest.fn();

      render(
        <TripSelectorContainer
          onMenuButtonClick={() => {}}
          onSearchButtonClick={onSearchButtonClickMock}
        />
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Content.TripSelector.SEARCH_BUTTON',
        })
      );

      expect(onSearchButtonClickMock).not.toHaveBeenCalled();
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER Content.TripSelector.ERROR_DESTINATION_MISSING',
        })
      ).toBeVisible();
    });

    it('shows error message in origin and destination when neither is selected', async () => {
      useNavigationMock.mockReturnValue({
        origin: undefined,
        destination: undefined,
        departureTime: '10:24',
        departureDate: '2021-12-25',
        setNewDepartureTime: jest.fn(),
        setNewDepartureDate: jest.fn(),
        setOriginStation: jest.fn(),
        setDestinationStation: jest.fn(),
        generateStationsMap: jest.fn(),
        calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
      });

      const onSearchButtonClickMock = jest.fn();

      render(
        <TripSelectorContainer
          onMenuButtonClick={() => {}}
          onSearchButtonClick={onSearchButtonClickMock}
        />
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Content.TripSelector.SEARCH_BUTTON',
        })
      );

      expect(onSearchButtonClickMock).not.toHaveBeenCalled();
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER Content.TripSelector.ERROR_ORIGIN_MISSING',
        })
      ).toBeVisible();
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER Content.TripSelector.ERROR_DESTINATION_MISSING',
        })
      ).toBeVisible();
    });
  });
});
