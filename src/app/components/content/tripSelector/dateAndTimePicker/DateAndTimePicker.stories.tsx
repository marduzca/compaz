import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import DateAndTimePicker from './DateAndTimePicker';

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div
    style={{
      width: '400px',
      height: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#1976d2',
      padding: '0 1.25rem',
    }}
  >
    {child}
  </div>
);

export default {
  title: 'DateAndTimePicker',
  component: DateAndTimePicker,
} as Meta;

export const basic = () =>
  guaranteedSize(
    <DateAndTimePicker
      selectedDate={new Date('2021-09-24 17:30')}
      isTimeEditable={false}
      onTimePickerClick={actions('onTimePickerClick').onTimePickerClick}
    />
  );
