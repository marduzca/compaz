import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateAndTimePickerContainer from './DateAndTimePickerContainer';

describe('DateAndTimePickerContainer', () => {
  const dateAndTime = new Date('1995-12-17T10:24:00');

  it('selects and displays selected date', () => {
    render(<DateAndTimePickerContainer randomDateAndTime={dateAndTime} />);

    userEvent.type(screen.getByTestId('datePicker'), '1993-03-15');

    expect(
      screen.getByRole('button', { name: 'DateAndTimePicker.DATE_PICKER' })
        .textContent
    ).toContain('Mon 15 Mar');
  });

  it('displays given time correctly', () => {
    render(<DateAndTimePickerContainer randomDateAndTime={dateAndTime} />);

    expect(
      screen.getByRole('button', { name: 'DateAndTimePicker.TIME_PICKER' })
        .textContent
    ).toContain('10:24');
  });
});
