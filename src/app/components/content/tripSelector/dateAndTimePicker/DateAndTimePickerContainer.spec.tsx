import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateAndTimePickerContainer from './DateAndTimePickerContainer';
import * as NavigationProvider from '../../../providers/NavigationProvider';
import { parseToSimpleDate, parseToSimpleTime } from '../../dateFormatter';

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
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays current date and time coming from provider by default', () => {
    render(<DateAndTimePickerContainer />);

    expect(
      screen.getByRole('button', {
        name: 'Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON',
      }).textContent
    ).toContain('Sat 25 Dec');
    expect(
      screen.getByRole('button', {
        name: 'Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON',
      }).textContent
    ).toContain('10:24');
  });

  it('selects and displays selected date and time', () => {
    render(<DateAndTimePickerContainer />);

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON',
      })
    );

    userEvent.type(
      screen.getByLabelText('Content.DateAndTimePicker.DATE_LABEL'),
      '1993-03-15'
    );
    userEvent.type(
      screen.getByLabelText('Content.DateAndTimePicker.TIME_LABEL'),
      '09:30'
    );

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.DateAndTimePicker.SELECT_BUTTON',
      })
    );

    expect(setNewDepartureTimeMock).toHaveBeenLastCalledWith('09:30');
    expect(setNewDepartureDateMock).toHaveBeenLastCalledWith('1993-03-15');
  });

  it('selects current date and time when clicking on Now button', () => {
    render(<DateAndTimePickerContainer />);

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON',
      })
    );

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.DateAndTimePicker.NOW_BUTTON',
      })
    );

    expect(setNewDepartureTimeMock).toHaveBeenCalledWith(
      parseToSimpleTime(new Date())
    );
    expect(setNewDepartureDateMock).toHaveBeenLastCalledWith(
      parseToSimpleDate(new Date())
    );
  });

  it('hides selection panel when clicking outside of it', () => {
    render(
      <div>
        <DateAndTimePickerContainer />
        <span>This is outside the panel</span>
      </div>
    );

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON',
      })
    );

    expect(
      screen.getByRole('button', {
        name: 'Content.DateAndTimePicker.NOW_BUTTON',
      })
    ).toBeVisible();

    userEvent.click(screen.getByText('This is outside the panel'));

    expect(
      screen.queryByRole('button', {
        name: 'Content.DateAndTimePicker.NOW_BUTTON',
      })
    ).toBeNull();
  });

  describe('error message', () => {
    it('shows error message when time outside of functional hours during the week', () => {
      render(<DateAndTimePickerContainer />);

      userEvent.click(
        screen.getByRole('button', {
          name: 'Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON',
        })
      );

      userEvent.type(
        screen.getByLabelText('Content.DateAndTimePicker.DATE_LABEL'),
        '1993-03-17'
      );
      userEvent.type(
        screen.getByLabelText('Content.DateAndTimePicker.TIME_LABEL'),
        '23:00'
      );

      expect(
        screen.getByText('Content.DateAndTimePicker.TIME_ERROR')
      ).toBeVisible();
    });

    it('shows error message when time outside of functional hours during the weekend', () => {
      render(<DateAndTimePickerContainer />);

      userEvent.click(
        screen.getByRole('button', {
          name: 'Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON',
        })
      );

      userEvent.type(
        screen.getByLabelText('Content.DateAndTimePicker.DATE_LABEL'),
        '1993-03-13'
      );
      userEvent.type(
        screen.getByLabelText('Content.DateAndTimePicker.TIME_LABEL'),
        '20:00'
      );

      expect(
        screen.getByText('Content.DateAndTimePicker.TIME_ERROR')
      ).toBeVisible();
    });
  });
});
