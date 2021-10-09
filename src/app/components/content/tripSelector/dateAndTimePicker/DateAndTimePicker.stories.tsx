import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import DateAndTimePicker from './DateAndTimePicker';

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div
    style={{
      width: '400px',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: '#1976d2',
      padding: '1.25rem',
    }}
  >
    {child}
  </div>
);

export default {
  title: 'DateAndTimePicker',
  component: DateAndTimePicker,
} as Meta;

export const basicInNormalState = () =>
  guaranteedSize(
    <DateAndTimePicker
      departureDate={new Date('2021-09-24 17:30')}
      departureTime="17:30"
      currentlySelectedDate="2021-09-24 17:30"
      currentlySelectedTime="17:30"
      showSelectionPanel={false}
      onDateAndTimeButtonClick={
        actions('onDateAndTimeButtonClick').onDateAndTimeButtonClick
      }
      onDatePickerChange={actions('onDatePickerChange').onDatePickerChange}
      onTimePickerChange={actions('onTimePickerChange').onTimePickerChange}
      onSelectButtonClick={actions('onSelectButtonClick').onSelectButtonClick}
      onNowButtonClick={actions('onNowButtonClick').onNowButtonClick}
      onHideSelectionPanel={
        actions('onHideSelectionPanel').onHideSelectionPanel
      }
    />
  );

export const withOpenSelectionPanelInNormalState = () =>
  guaranteedSize(
    <DateAndTimePicker
      departureDate={new Date('2021-09-24 17:30')}
      departureTime="17:30"
      currentlySelectedDate="2021-09-24 17:30"
      currentlySelectedTime="17:30"
      onDateAndTimeButtonClick={
        actions('onDateAndTimeButtonClick').onDateAndTimeButtonClick
      }
      onDatePickerChange={actions('onDatePickerChange').onDatePickerChange}
      onTimePickerChange={actions('onTimePickerChange').onTimePickerChange}
      onSelectButtonClick={actions('onSelectButtonClick').onSelectButtonClick}
      onNowButtonClick={actions('onNowButtonClick').onNowButtonClick}
      onHideSelectionPanel={
        actions('onHideSelectionPanel').onHideSelectionPanel
      }
      showSelectionPanel
    />
  );
