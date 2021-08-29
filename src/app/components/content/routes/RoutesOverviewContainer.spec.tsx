import React from 'react';
import { render, screen } from '@testing-library/react';
import RoutesOverviewContainer from './RoutesOverviewContainer';

describe('RoutesOverviewContainer', () => {
  it('displays origin and destination in the header', () => {
    render(
      <RoutesOverviewContainer
        route={['station_a', 'station_b', 'station_c', 'station_d']}
      />
    );

    expect(
      screen.getByRole('heading', { name: 'station_a - station_d' })
    ).toBeVisible();
  });
});
