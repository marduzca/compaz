import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
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

  it('SHOULD call the location API to ask for the current location WHEN it renders and every 10 seconds', () => {
    vi.useFakeTimers();

    render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

    expect(getCurrentPositionMock).toHaveBeenCalled();

    const TOTAL_TIME_IN_SECONDS = 50;

    act(() => {
      vi.advanceTimersByTime(TOTAL_TIME_IN_SECONDS * 1000);
    });

    // Call is made every 10 seconds. So here we expect the time seconds divided by 10, but we need to add one for the initial call that was done
    expect(getCurrentPositionMock).toHaveBeenCalledTimes(
      TOTAL_TIME_IN_SECONDS / 10 + 1,
    );

    vi.useRealTimers();
  });

  it('SHOULD not keep refreshing current location WHEN location permission was denied', () => {
    vi.useFakeTimers();

    getCurrentPositionMock = vi
      .fn()
      .mockImplementation(
        (
          successCallback,
          errorCallback: (error: Partial<GeolocationPositionError>) => void,
        ) => {
          const PERMISSION_DENIED_ERROR_CODE = 1;
          const geolocationPositionError: Partial<GeolocationPositionError> = {
            code: PERMISSION_DENIED_ERROR_CODE,
            PERMISSION_DENIED: PERMISSION_DENIED_ERROR_CODE,
            message: 'Permission denied',
          };

          errorCallback(geolocationPositionError);
        },
      );

    // eslint-disable-next-line
    (global as any).navigator.geolocation = {
      getCurrentPosition: getCurrentPositionMock,
    };

    render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

    expect(getCurrentPositionMock).toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(50000);
    });

    // The expected number is 2, because of the initial call to get the location and the very first time the interval is triggered. Afterwards it is stopped
    expect(getCurrentPositionMock).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
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
          (
            successCallback,
            errorCallback: (error: Partial<GeolocationPositionError>) => void,
          ) => {
            const POSITION_UNAVAILABLE_ERROR_CODE = 2;
            const geolocationPositionError: Partial<GeolocationPositionError> =
              {
                code: POSITION_UNAVAILABLE_ERROR_CODE,
                message: 'Position unavailable',
              };

            errorCallback(geolocationPositionError);
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
