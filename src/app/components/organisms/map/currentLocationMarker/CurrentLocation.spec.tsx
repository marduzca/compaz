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

  describe('should call the location API to ask for the current location', () => {
    it('on the first render', () => {
      render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

      expect(getCurrentPositionMock).toHaveBeenCalled();
    });

    it('when clicking the current location button', async () => {
      render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

      const currentLocationButton = screen.getByRole('button', {
        name: 'Show current location',
      });
      await userEvent.click(currentLocationButton);

      expect(getCurrentPositionMock).toHaveBeenCalled();
    });
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
          (successCallback, errorCallback: () => void) => {
            errorCallback();
          }
        );
      // eslint-disable-next-line
      (global as any).navigator.geolocation = {
        getCurrentPosition: getCurrentPositionMock,
      };

      render(
        <>
          <CurrentLocation googleMapReference={new google.maps.Map()} />
          <NotificationContainer />
        </>
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
          'Something went wrong. You probably blocked access to your location, please allow it in your browser settings. Otherwise just refresh the page and try again.'
        )
      ).toBeVisible();
    });

    it('should trigger the function to center the current location when clicking the location button', async () => {
      render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

      const currentLocationButton = screen.getByRole('button', {
        name: 'Show current location',
      });
      await userEvent.click(currentLocationButton);

      const boundsForMockedCurrentLocation: GeoLocation[] = [];
      boundsForMockedCurrentLocation.push(currentLocation);

      expect(fitScreenToBoundsMock).toHaveBeenCalledWith(
        boundsForMockedCurrentLocation,
        MapMode.CURRENT_LOCATION
      );
    });
  });
});
