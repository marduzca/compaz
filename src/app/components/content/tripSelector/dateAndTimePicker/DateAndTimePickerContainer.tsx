import React, { useState } from 'react';
import DateAndTimePicker from './DateAndTimePicker';

interface DateAndTimePickerContainerProps {
  selectedDate: Date;
}

const DateAndTimePickerContainer: React.FC<DateAndTimePickerContainerProps> = (
  props
) => {
  const [isTimeEditable, setTimeEditable] = useState<boolean>(false);

  const handleTimePickerClick = () => {
    setTimeEditable(!isTimeEditable);
  };

  return (
    <DateAndTimePicker
      selectedDate={props.selectedDate}
      isTimeEditable={isTimeEditable}
      onTimePickerClick={handleTimePickerClick}
    />
  );
};

export default DateAndTimePickerContainer;
