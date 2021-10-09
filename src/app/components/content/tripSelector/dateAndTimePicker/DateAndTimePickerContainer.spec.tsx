import React from 'react';
import MockDate from 'mockdate';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateAndTimePickerContainer from './DateAndTimePickerContainer';
import * as NavigationProvider from '../../../providers/NavigationProvider';

describe('DateAndTimePickerContainer', () => {
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');
  const setNewDepartureDateMock = jest.fn();
  const setNewDepartureTimeMock = jest.fn();

  beforeEach(() => {
    useNavigationMock.mockReturnValue({
      origin: {
        connectedStations: [],
        id: '',
        lines: [],
        name: '',
      },
      destination: {
        connectedStations: [],
        id: '',
        lines: [],
        name: '',
      },
      departureTime: '10:24',
      departureDate: new Date('2021-12-25T10:24:00'),
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
    expect(setNewDepartureDateMock).toHaveBeenLastCalledWith(
      new Date('1993-03-15')
    );
  });

  it('selects current date and time when clicking on Now button', () => {
    MockDate.set(new Date('2021-10-31T00:00:00.000Z'));

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

    expect(setNewDepartureDateMock).toHaveBeenLastCalledWith(
      new Date('2021-10-31T00:00:00.000Z')
    );
    expect(setNewDepartureTimeMock).toHaveBeenLastCalledWith('02:00');

    MockDate.reset();
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
});
