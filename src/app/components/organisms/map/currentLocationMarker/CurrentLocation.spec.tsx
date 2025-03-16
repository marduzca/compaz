import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import CurrentLocation from './CurrentLocation';
import useMapFitBounds from '../../../hooks/useMapFitBounds/useMapFitBounds';
import { GeoLocation } from '../../../domain';
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

  describe('WHEN clicking the current location button', () => {
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
  });
});
