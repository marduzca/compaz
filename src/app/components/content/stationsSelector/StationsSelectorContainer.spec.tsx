import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Station } from '../../providers/FirebaseProvider';
import StationsSelectorContainer from './StationsSelectorContainer';

describe('StationsSelectorContainer', () => {
  const availableStations = [
    {
      id: 'some_station',
      name: 'Some station',
      lines: ['green'],
    },
    {
      id: 'another_station',
      name: 'Another station',
      lines: ['silver'],
    },
  ] as Station[];

  it('allows to select stations from the dropdown', () => {
    render(<StationsSelectorContainer stations={availableStations} />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      }),
      {
        target: { value: availableStations[0].name },
      }
    );
    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      }),
      {
        target: { value: availableStations[1].name },
      }
    );

    expect(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      })
    ).toHaveValue(availableStations[0].name);
    expect(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      })
    ).toHaveValue(availableStations[1].name);
  });

  it("shows an error when the current origin input doesn't correspond to any list item", () => {
    render(<StationsSelectorContainer stations={availableStations} />);

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      }),
      'This is a non-existent station'
    );

    expect(screen.getByText(/Content.TripSelector.ERROR/)).toBeVisible();
  });

  it("shows an error when the current destination input doesn't correspond to any list item", () => {
    render(<StationsSelectorContainer stations={availableStations} />);

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      }),
      'This is a non-existent station'
    );

    expect(screen.getByText(/Content.TripSelector.ERROR/)).toBeVisible();
  });

  it('removes the station from the destination when chosen already as origin', () => {
    render(<StationsSelectorContainer stations={availableStations} />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      }),
      {
        target: { value: availableStations[0].name },
      }
    );
    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      }),
      {
        target: { value: availableStations[0].name },
      }
    );

    expect(
      screen.getByText(
        'Content.TripSelector.DESTINATION_PLACEHOLDER - Content.TripSelector.ERROR'
      )
    ).toBeVisible();
  });

  it('removes the station from the origin when chosen already as destination', () => {
    render(<StationsSelectorContainer stations={availableStations} />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      }),
      {
        target: { value: availableStations[0].name },
      }
    );
    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      }),
      {
        target: { value: availableStations[0].name },
      }
    );

    expect(
      screen.getByText(
        'Content.TripSelector.ORIGIN_PLACEHOLDER - Content.TripSelector.ERROR'
      )
    ).toBeVisible();
  });

  it('switches origin and destination content when clicking on switcher button', () => {
    render(<StationsSelectorContainer stations={availableStations} />);

    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      }),
      {
        target: { value: availableStations[0].name },
      }
    );
    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      }),
      {
        target: { value: availableStations[1].name },
      }
    );

    userEvent.click(screen.getByRole('button', { name: 'stations-switcher' }));

    expect(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      })
    ).toHaveValue(availableStations[1].name);
    expect(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      })
    ).toHaveValue(availableStations[0].name);
  });
});
