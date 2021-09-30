import React, { useState } from 'react';
import moment from 'moment';
import DateAndTimePicker from './DateAndTimePicker';
import { parseToTimeString } from '../../dateFormatter';

interface DateAndTimePickerContainerProps {
  selectedDate: Date;
}

const DateAndTimePickerContainer: React.FC<DateAndTimePickerContainerProps> = (
  props
) => {
  const [selectedTime, setSelectedTime] = useState<string>(
    parseToTimeString(props.selectedDate)
  );

  const handleTimePickerChange = (
    time: moment.MomentInput,
    timeString: string
  ) => {
    setSelectedTime(timeString);
  };

  return (
    <DateAndTimePicker
      selectedDate={props.selectedDate}
      selectedTime={selectedTime}
      onTimePickerChange={handleTimePickerChange}
    />
  );
};

export default DateAndTimePickerContainer;
