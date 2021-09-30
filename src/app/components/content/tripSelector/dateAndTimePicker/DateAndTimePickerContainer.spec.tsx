import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateAndTimePickerContainer from './DateAndTimePickerContainer';
import * as NavigationProvider from '../../../providers/NavigationProvider';

describe('DateAndTimePickerContainer', () => {
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

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
      departureDate: new Date('1995-12-17T10:24:00'),
      setNewDepartureTime: jest.fn(),
      setNewDepartureDate: jest.fn(),
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('selects and displays selected date', () => {
    render(<DateAndTimePickerContainer />);

    userEvent.type(screen.getByTestId('datePicker'), '1993-03-15');

    expect(
      screen.getByRole('button', { name: 'DateAndTimePicker.DATE_PICKER' })
        .textContent
    ).toContain('Mon 15 Mar');
  });

  it('displays given time correctly', () => {
    render(<DateAndTimePickerContainer />);

    expect(
      screen.getByRole('button', { name: 'DateAndTimePicker.TIME_PICKER' })
        .textContent
    ).toContain('10:24');
  });
});
