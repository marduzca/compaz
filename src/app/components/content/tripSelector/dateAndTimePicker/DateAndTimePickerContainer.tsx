import React, { useState } from 'react';
import moment from 'moment';
import DateAndTimePicker from './DateAndTimePicker';
import { parseToTimeString } from '../../dateFormatter';

interface DateAndTimePickerContainerProps {
  randomDateAndTime: Date;
}

const DateAndTimePickerContainer: React.FC<DateAndTimePickerContainerProps> = (
  props
) => {
  const [selectedTime, setSelectedTime] = useState<string>(
    parseToTimeString(props.randomDateAndTime)
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    props.randomDateAndTime
  );

  const handleTimePickerChange = (
    time: moment.MomentInput,
    timeString: string
  ) => {
    setSelectedTime(timeString);
  };

  const handleDatePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <DateAndTimePicker
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      onDatePickerChange={handleDatePickerChange}
      onTimePickerChange={handleTimePickerChange}
    />
  );
};

export default DateAndTimePickerContainer;
