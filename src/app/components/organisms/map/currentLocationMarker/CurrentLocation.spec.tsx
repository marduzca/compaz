import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import CurrentLocation from './CurrentLocation';
import useMapFitBounds from '../../../hooks/useMapFitBounds/useMapFitBounds';
import { GeoLocation } from '../../../domain';
import { MapMode } from '../MapContainer';
import NotificationContainer from '../../notification/NotificationContainer';

vi.mock('../../../hooks/useMapFitBounds/useMapFitBounds');

vi.mock('@react-google-maps/api', () => ({
  __esModule: true,
  MarkerF: () => <div>MarkerF</div>,
}));

const google = {
  maps: {
    Map: vi.fn(),
  },
};

// @ts-ignore
global.window.google = google;

const currentLocation: GeoLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const fitScreenToBoundsMock = vi.fn();
(useMapFitBounds as Mock).mockReturnValue({
  fitScreenToBounds: fitScreenToBoundsMock,
});

describe('CurrentLocation', () => {
  let getCurrentPositionMock = vi.fn();

  beforeEach(() => {
    getCurrentPositionMock = vi.fn().mockImplementation((successCallback) => {
      const mockPosition = {
        coords: currentLocation,
        timestamp: Date.now(),
      };

      successCallback(mockPosition);
    });

    // eslint-disable-next-line
    (global as any).navigator.geolocation = {
      getCurrentPosition: getCurrentPositionMock,
    };
  });

  it('SHOULD call the location API to ask for the current location WHEN it renders', () => {
    render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

    expect(getCurrentPositionMock).toHaveBeenCalled();
  });

  it('SHOULD show an error WHEN the browser doesnt support the geolocation API', () => {
    // eslint-disable-next-line
    (global as any).navigator.geolocation = undefined;

    render(
      <>
        <NotificationContainer />
        <CurrentLocation googleMapReference={new google.maps.Map()} />
      </>,
    );

    const errorAlert = screen.getByRole('alert', {
      name: 'Error notification',
    });

    expect(errorAlert).toBeVisible();
    expect(
      within(errorAlert).getByText(
        'We are sorry. Your browser does not support Geolocation, so we cannot retrieve your current location.',
      ),
    ).toBeVisible();
  });

  describe('WHEN clicking the current location button', () => {
    it('SHOULD call the location API to ask for the current location', async () => {
      render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

      const currentLocationButton = screen.getByRole('button', {
        name: 'Show current location',
      });
      await userEvent.click(currentLocationButton);

      expect(getCurrentPositionMock).toHaveBeenCalled();
    });

    it('SHOULD show access denied error WHEN user denied access to their location', async () => {
      getCurrentPositionMock = vi
        .fn()
        .mockImplementationOnce((successCallback) => {
          const mockPosition = {
            coords: currentLocation,
            timestamp: Date.now(),
          };

          successCallback(mockPosition);
        })
        .mockImplementationOnce(
          (successCallback, errorCallback: () => void) => {
            errorCallback();
          },
        );
      // eslint-disable-next-line
      (global as any).navigator.geolocation = {
        getCurrentPosition: getCurrentPositionMock,
      };

      render(
        <>
          <CurrentLocation googleMapReference={new google.maps.Map()} />
          <NotificationContainer />
        </>,
      );

      const currentLocationButton = screen.getByRole('button', {
        name: 'Show current location',
      });
      await userEvent.click(currentLocationButton);

      const errorAlert = screen.getByRole('alert', {
        name: 'Error notification',
      });

      expect(errorAlert).toBeVisible();
      expect(
        within(errorAlert).getByText(
          'Something went wrong. You probably blocked access to your location, please allow it in your browser settings. Otherwise just refresh the page and try again.',
        ),
      ).toBeVisible();
    });

    it('SHOULD trigger the function to center the current location WHEN clicking the location button', async () => {
      render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

      const currentLocationButton = screen.getByRole('button', {
        name: 'Show current location',
      });
      await userEvent.click(currentLocationButton);

      const boundsForMockedCurrentLocation: GeoLocation[] = [];
      boundsForMockedCurrentLocation.push(currentLocation);

      expect(fitScreenToBoundsMock).toHaveBeenCalledWith(
        boundsForMockedCurrentLocation,
        MapMode.CURRENT_LOCATION,
      );
    });

    it('SHOULD not trigger the function to center the current location WHEN the currentLocation is not set for whatever reason', async () => {
      fitScreenToBoundsMock.mockClear();

      // eslint-disable-next-line
      (global as any).navigator.geolocation = undefined;

      render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

      const currentLocationButton = screen.getByRole('button', {
        name: 'Show current location',
      });
      await userEvent.click(currentLocationButton);

      expect(fitScreenToBoundsMock).not.toHaveBeenCalled();
    });
  });
});
