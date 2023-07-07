import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TripSelectorContainer from './TripSelectorContainer';
import * as FirebaseProvider from '../../../../providers/firebase/FirebaseProvider';
import * as NavigationProvider from '../../../../providers/navigation/NavigationProvider';
import { LineColor, Route, Station } from '../../../../domain';

describe('TripSelectorContainer', () => {
  const useFirebaseMock = vi.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = vi.spyOn(NavigationProvider, 'useNavigation');

  const availableStations = [
    {
      id: 'some_station',
      name: 'Some station',
      lines: [LineColor.GREEN],
      connectedStations: [],
      geoLocation: { latitude: 0, longitude: 0 },
    },
    {
      id: 'another_station',
      name: 'Another station',
      lines: [LineColor.GREEN],
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
          lines: [LineColor.GREEN],
          connectedStations: [],
          geoLocation: { latitude: 0, longitude: 0 },
        },
        {
          id: 'another_station',
          name: 'Another station',
          lines: [LineColor.GREEN],
          connectedStations: [],
          geoLocation: { latitude: 0, longitude: 0 },
        },
      ],
      lines: [],
      storeMessage: async () => true,
    });

    useNavigationMock.mockReturnValue({
      origin: undefined,
      destination: undefined,
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: vi.fn(),
      setNewDepartureDate: vi.fn(),
      setOriginStation: vi.fn(),
      setDestinationStation: vi.fn(),
      generateStationsMap: vi.fn(),
      calculateRoute: () =>
        ({ subRoutes: [], totalTime: 0, price: 0 }) as Route,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('when stations have been loaded', () => {
    it('renders the trip selector content', () => {
      render(
        <MemoryRouter>
          <TripSelectorContainer
            onMenuButtonClick={() => {}}
            onSearchButtonClick={() => {}}
          />
        </MemoryRouter>,
      );

      expect(
        screen.getByRole('combobox', {
          name: 'Origin',
        }),
      ).toBeVisible();
      expect(
        screen.getByRole('combobox', {
          name: 'Destination',
        }),
      ).toBeVisible();
      expect(
        screen.getByRole('button', {
          name: 'Search',
        }),
      ).toBeVisible();
    });
  });

  describe('Submission', () => {
    it('calls the corresponding function when both origin and destination are selected', async () => {
      useNavigationMock.mockReturnValue({
        origin: availableStations[0],
        destination: availableStations[1],
        departureTime: '10:24',
        departureDate: '2021-12-25',
        setNewDepartureTime: vi.fn(),
        setNewDepartureDate: vi.fn(),
        setOriginStation: vi.fn(),
        setDestinationStation: vi.fn(),
        generateStationsMap: vi.fn(),
        calculateRoute: () =>
          ({ subRoutes: [], totalTime: 0, price: 0 }) as Route,
      });

      const onSearchButtonClickMock = vi
        .fn()
        .mockImplementation((e) => e.preventDefault());

      render(
        <MemoryRouter>
          <TripSelectorContainer
            onMenuButtonClick={() => {}}
            onSearchButtonClick={onSearchButtonClickMock}
          />
        </MemoryRouter>,
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Search',
        }),
      );

      expect(onSearchButtonClickMock).toHaveBeenCalledTimes(1);
    });

    it("shows origin validation error on submission when origin hasn't been selected", async () => {
      useNavigationMock.mockReturnValue({
        origin: undefined,
        destination: availableStations[1],
        departureTime: '10:24',
        departureDate: '2021-12-25',
        setNewDepartureTime: vi.fn(),
        setNewDepartureDate: vi.fn(),
        setOriginStation: vi.fn(),
        setDestinationStation: vi.fn(),
        generateStationsMap: vi.fn(),
        calculateRoute: () =>
          ({ subRoutes: [], totalTime: 0, price: 0 }) as Route,
      });

      const onSearchButtonClickMock = vi.fn();

      render(
        <MemoryRouter>
          <TripSelectorContainer
            onMenuButtonClick={() => {}}
            onSearchButtonClick={onSearchButtonClickMock}
          />
        </MemoryRouter>,
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Search',
        }),
      );

      expect(onSearchButtonClickMock).not.toHaveBeenCalled();
    });

    it("shows destination validation error on submission when destination hasn't been selected", async () => {
      useNavigationMock.mockReturnValue({
        origin: availableStations[0],
        destination: undefined,
        departureTime: '10:24',
        departureDate: '2021-12-25',
        setNewDepartureTime: vi.fn(),
        setNewDepartureDate: vi.fn(),
        setOriginStation: vi.fn(),
        setDestinationStation: vi.fn(),
        generateStationsMap: vi.fn(),
        calculateRoute: () =>
          ({ subRoutes: [], totalTime: 0, price: 0 }) as Route,
      });

      const onSearchButtonClickMock = vi.fn();

      render(
        <MemoryRouter>
          <TripSelectorContainer
            onMenuButtonClick={() => {}}
            onSearchButtonClick={onSearchButtonClickMock}
          />
        </MemoryRouter>,
      );

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Search',
        }),
      );

      expect(onSearchButtonClickMock).not.toHaveBeenCalled();
    });
  });
});
