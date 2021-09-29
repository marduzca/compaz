import React from 'react';
import DateAndTimePicker from './DateAndTimePicker';

interface DateAndTimePickerContainerProps {
  selectedDate: Date;
}

const DateAndTimePickerContainer: React.FC<DateAndTimePickerContainerProps> = (
  props
) => <DateAndTimePicker selectedDate={props.selectedDate} />;

export default DateAndTimePickerContainer;
