import React from 'react';
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
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');
  const setNewDepartureDateMock = jest.fn();
  const setNewDepartureTimeMock = jest.fn();

  beforeEach(() => {
    useNavigationMock.mockReturnValue({
      origin: undefined,
      destination: undefined,
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: setNewDepartureTimeMock,
      setNewDepartureDate: setNewDepartureDateMock,
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () =>
        ({ subRoutes: [], totalTime: 0, price: 0 } as Route),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays current date and time coming from provider by default', () => {
    render(<DateAndTimePickerContainer />);

    expect(
      screen.getByRole('button', {
        name: 'Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
      }).textContent
    ).toContain('Sat 25 Dec');
    expect(
      screen.getByRole('button', {
        name: 'Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
      }).textContent
    ).toContain('10:24');
  });

  it('selects and displays selected date and time', async () => {
    render(<DateAndTimePickerContainer />);

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
      })
    );

    await userEvent.clear(
      screen.getByLabelText('Navigation.DateAndTimePicker.DATE_LABEL')
    );
    await userEvent.type(
      screen.getByLabelText('Navigation.DateAndTimePicker.DATE_LABEL'),
      '1993-03-15'
    );

    await userEvent.clear(
      screen.getByLabelText('Navigation.DateAndTimePicker.TIME_LABEL')
    );
    await userEvent.type(
      screen.getByLabelText('Navigation.DateAndTimePicker.TIME_LABEL'),
      '09:30'
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.DateAndTimePicker.SELECT_BUTTON',
      })
    );

    expect(setNewDepartureTimeMock).toHaveBeenLastCalledWith('09:30');
    expect(setNewDepartureDateMock).toHaveBeenLastCalledWith('1993-03-15');
  });

  it('selects current date and time when clicking on Now button', async () => {
    render(<DateAndTimePickerContainer />);

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.DateAndTimePicker.NOW_BUTTON',
      })
    );

    expect(setNewDepartureTimeMock).toHaveBeenCalledWith(
      parseToSimpleTime(new Date())
    );
    expect(setNewDepartureDateMock).toHaveBeenLastCalledWith(
      parseToSimpleDate(new Date())
    );
  });

  it('hides selection panel when clicking outside of it', async () => {
    render(
      <div>
        <DateAndTimePickerContainer />
        <span>This is outside the panel</span>
      </div>
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
      })
    );

    expect(
      screen.getByRole('button', {
        name: 'Navigation.DateAndTimePicker.NOW_BUTTON',
      })
    ).toBeVisible();

    await userEvent.click(screen.getByText('This is outside the panel'));

    expect(
      screen.queryByRole('button', {
        name: 'Navigation.DateAndTimePicker.NOW_BUTTON',
      })
    ).not.toBeInTheDocument();
  });

  describe('error message', () => {
    it('shows error message when time outside of functional hours during the week', async () => {
      render(<DateAndTimePickerContainer />);

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
        })
      );

      await userEvent.clear(
        screen.getByLabelText('Navigation.DateAndTimePicker.DATE_LABEL')
      );
      await userEvent.type(
        screen.getByLabelText('Navigation.DateAndTimePicker.DATE_LABEL'),
        '1993-03-17'
      );

      await userEvent.clear(
        screen.getByLabelText('Navigation.DateAndTimePicker.TIME_LABEL')
      );
      await userEvent.type(
        screen.getByLabelText('Navigation.DateAndTimePicker.TIME_LABEL'),
        '23:00'
      );

      expect(
        screen.getByText('Navigation.DateAndTimePicker.TIME_ERROR')
      ).toBeVisible();
    });

    it('shows error message when time outside of functional hours during the weekend', async () => {
      render(<DateAndTimePickerContainer />);

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
        })
      );

      await userEvent.clear(
        screen.getByLabelText('Navigation.DateAndTimePicker.DATE_LABEL')
      );
      await userEvent.type(
        screen.getByLabelText('Navigation.DateAndTimePicker.DATE_LABEL'),
        '1993-03-13'
      );

      await userEvent.clear(
        screen.getByLabelText('Navigation.DateAndTimePicker.TIME_LABEL')
      );
      await userEvent.type(
        screen.getByLabelText('Navigation.DateAndTimePicker.TIME_LABEL'),
        '20:00'
      );

      expect(
        screen.getByText('Navigation.DateAndTimePicker.TIME_ERROR')
      ).toBeVisible();
    });
  });
});
