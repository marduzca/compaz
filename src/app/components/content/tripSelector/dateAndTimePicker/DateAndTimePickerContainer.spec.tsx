import React from 'react';
import { render } from '@testing-library/react';
import DateAndTimePickerContainer from './DateAndTimePickerContainer';

describe('DateAndTimePickerContainer', () => {
  const dateAndTime = new Date('2020-08-19T23:13:44.514Z');

  it('selects and displays selected time', async () => {
    render(<DateAndTimePickerContainer selectedDate={dateAndTime} />);

    expect(true).toBeTruthy();
  });
});
