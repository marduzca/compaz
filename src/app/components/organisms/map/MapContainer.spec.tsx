import React from 'react';
import { render, screen } from '@testing-library/react';
import MapContainer from './MapContainer';

describe('MapContainer', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('renders the loader when map is not yet loaded', () => {
    render(<MapContainer />);

    expect(screen.getByRole('alert', { name: 'Loading map' })).toBeVisible();
  });

  it('renders the offline map message when offline', () => {
    const navigatorOnlineSpy = vi.spyOn(window.navigator, 'onLine', 'get');
    navigatorOnlineSpy.mockReturnValue(false);

    render(<MapContainer />);

    expect(
      screen.getByText('Sorry, the map is not available offline.')
    ).toBeVisible();
  });
});
