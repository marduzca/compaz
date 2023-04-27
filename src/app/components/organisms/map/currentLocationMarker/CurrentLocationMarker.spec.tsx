import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import CurrentLocationMarker from './CurrentLocationMarker';

vi.mock('@react-google-maps/api', () => ({
  __esModule: true,
  MarkerF: () => <div>MarkerF</div>,
}));

describe('CurrentLocationMarker', () => {
  it('should call the location API to ask for the current location', () => {
    const getCurrentPositionMock = vi.fn();

    // eslint-disable-next-line
    (global as any).navigator.geolocation = {
      getCurrentPosition: getCurrentPositionMock,
    };

    render(<CurrentLocationMarker />);

    expect(getCurrentPositionMock).toHaveBeenCalled();
  });
});
