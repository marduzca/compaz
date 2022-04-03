import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import DateAndTimePicker from './DateAndTimePicker';

export default {
  title: 'DateAndTimePicker',
  component: DateAndTimePicker,
} as Meta;

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
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

export const basicInNormalState = () =>
  guaranteedSize(
    <DateAndTimePicker
      departureDate="2021-09-24"
      departureTime="17:30"
      showSelectionPanel={false}
      isSelectedTimeOutsideOfFunctionalHours={false}
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
      departureDate="2021-09-24"
      departureTime="17:30"
      isSelectedTimeOutsideOfFunctionalHours={false}
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

export const withTimeError = () =>
  guaranteedSize(
    <DateAndTimePicker
      departureDate="2021-09-24"
      departureTime="17:30"
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
      isSelectedTimeOutsideOfFunctionalHours
    />
  );
