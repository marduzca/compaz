import React, { useState } from 'react';
import moment from 'moment';
import DateAndTimePicker from './DateAndTimePicker';
import { useNavigation } from '../../../providers/NavigationProvider';

const DateAndTimePickerContainer: React.FC = () => {
  const {
    departureTime,
    departureDate,
    setNewDepartureTime,
    setNewDepartureDate,
  } = useNavigation();

  const [selectedTime, setSelectedTime] = useState<string>(departureTime);
  const [selectedDate, setSelectedDate] = useState<Date>(departureDate);

  const handleTimePickerChange = (
    time: moment.MomentInput,
    timeString: string
  ) => {
    setSelectedTime(timeString);
    setNewDepartureTime(timeString);
  };

  const handleDatePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDate(new Date(event.target.value));
    setNewDepartureDate(new Date(event.target.value));
  };

  return (
    <DateAndTimePicker
      selectedTime={selectedTime}
      selectedDate={selectedDate}
      onTimePickerChange={handleTimePickerChange}
      onDatePickerChange={handleDatePickerChange}
    />
  );
};

export default DateAndTimePickerContainer;
