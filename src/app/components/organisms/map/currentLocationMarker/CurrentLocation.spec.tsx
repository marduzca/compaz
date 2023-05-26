import React from 'react';
import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import CurrentLocation from './CurrentLocation';
import useMapFitBounds from '../../../hooks/useMapFitBounds';
import { GeoLocation } from '../../../domain';
import { MapMode } from '../MapContainer';

vi.mock('../../../hooks/useMapFitBounds');

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

const getCurrentPositionMock = vi.fn().mockImplementation((successCallback) => {
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

const fitScreenToBoundsMock = vi.fn();
(useMapFitBounds as Mock).mockReturnValue({
  fitScreenToBounds: fitScreenToBoundsMock,
});

describe('CurrentLocation', () => {
  it('should call the location API to ask for the current location', () => {
    render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

    expect(getCurrentPositionMock).toHaveBeenCalled();
  });

  it('should trigger the function to center the current location when clicking the location button', async () => {
    render(<CurrentLocation googleMapReference={new google.maps.Map()} />);

    const currentLocationButton = screen.getByRole('button', {
      name: 'Current location',
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
