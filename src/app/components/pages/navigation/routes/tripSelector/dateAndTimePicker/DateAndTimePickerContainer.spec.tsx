import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateAndTimePickerContainer from './DateAndTimePickerContainer';
import * as NavigationProvider from '../../../../../providers/navigation/NavigationProvider';
import {
  parseToSimpleDate,
  parseToSimpleTime,
} from '../../../util/dateFormatter';
import { Route } from '../../../../../domain';

describe('DateAndTimePickerContainer', () => {
  const useNavigationMock = vi.spyOn(NavigationProvider, 'useNavigation');
  const setNewDepartureDateMock = vi.fn();
  const setNewDepartureTimeMock = vi.fn();

  beforeEach(() => {
    useNavigationMock.mockReturnValue({
      origin: undefined,
      destination: undefined,
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: setNewDepartureTimeMock,
      setNewDepartureDate: setNewDepartureDateMock,
      setOriginStation: vi.fn(),
      setDestinationStation: vi.fn(),
      generateStationsMap: vi.fn(),
      calculateRoute: () =>
        ({ subRoutes: [], totalTime: 0, price: 0 } as Route),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays current date and time coming from provider by default', () => {
    render(<DateAndTimePickerContainer />);

    expect(
      screen.getByRole('button', {
        name: 'Select departure date and time. Current selected date is 2021-12-25 at 10:24',
      }).textContent
    ).toContain('Sat 25 Dec');
    expect(
      screen.getByRole('button', {
        name: 'Select departure date and time. Current selected date is 2021-12-25 at 10:24',
      }).textContent
    ).toContain('10:24');
  });

  it('selects and displays selected date and time', async () => {
    render(<DateAndTimePickerContainer />);

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Select departure date and time. Current selected date is 2021-12-25 at 10:24',
      })
    );

    await userEvent.clear(screen.getByLabelText('Date'));
    await userEvent.type(screen.getByLabelText('Date'), '1993-03-15');

    await userEvent.clear(screen.getByLabelText('Time'));
    await userEvent.type(screen.getByLabelText('Time'), '09:30');

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Select',
      })
    );

    expect(setNewDepartureTimeMock).toHaveBeenLastCalledWith('09:30');
    expect(setNewDepartureDateMock).toHaveBeenLastCalledWith('1993-03-15');
  });

  it('selects current date and time when clicking on Now button', async () => {
    render(<DateAndTimePickerContainer />);

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Select departure date and time. Current selected date is 2021-12-25 at 10:24',
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Now',
      })
    );

    expect(setNewDepartureTimeMock).toHaveBeenCalledWith(
      parseToSimpleTime(new Date())
    );
    expect(setNewDepartureDateMock).toHaveBeenLastCalledWith(
      parseToSimpleDate(new Date())
    );
  });

  describe('error message', () => {
    it('shows error message when time outside of functional hours during the week', async () => {
      render(<DateAndTimePickerContainer />);

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Select departure date and time. Current selected date is 2021-12-25 at 10:24',
        })
      );

      await userEvent.clear(screen.getByLabelText('Date'));
      await userEvent.type(screen.getByLabelText('Date'), '1993-03-17');

      await userEvent.clear(screen.getByLabelText('Time'));
      await userEvent.type(screen.getByLabelText('Time'), '23:00');

      expect(
        screen.getByText('Time is outside of functional hours')
      ).toBeVisible();
    });

    it('shows error message when time outside of functional hours during the weekend', async () => {
      render(<DateAndTimePickerContainer />);

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Select departure date and time. Current selected date is 2021-12-25 at 10:24',
        })
      );

      await userEvent.clear(screen.getByLabelText('Date'));
      await userEvent.type(screen.getByLabelText('Date'), '1993-03-13');

      await userEvent.clear(screen.getByLabelText('Time'));
      await userEvent.type(screen.getByLabelText('Time'), '22:00');

      expect(
        screen.getByText('Time is outside of functional hours')
      ).toBeVisible();
    });
  });
});
