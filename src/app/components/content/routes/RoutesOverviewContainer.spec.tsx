import React from 'react';
import { render, screen } from '@testing-library/react';
import RoutesOverviewContainer from './RoutesOverviewContainer';

describe('RoutesOverviewContainer', () => {
  it('displays origin and destination in the header', () => {
    render(
      <RoutesOverviewContainer
        route={[
          {
            id: 'station_a',
            name: 'Station a',
            lines: ['green'],
            connectedStations: [],
          },
          {
            id: 'station_b',
            name: 'Station b',
            lines: ['green'],
            connectedStations: [],
          },
          {
            id: 'station_c',
            name: 'Station c',
            lines: ['green'],
            connectedStations: [],
          },
          {
            id: 'station_d',
            name: 'Station d',
            lines: ['green'],
            connectedStations: [],
          },
        ]}
        onBackButtonClick={() => {}}
      />
    );

    expect(
      screen.getByRole('heading', { name: 'Station a - Station d' })
    ).toBeVisible();
  });
});
