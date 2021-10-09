import React, { useState } from 'react';
import DateAndTimePicker from './DateAndTimePicker';
import { useNavigation } from '../../../providers/NavigationProvider';
import { parseToSimpleDate, parseToSimpleTime } from '../../dateFormatter';

const DateAndTimePickerContainer: React.FC = () => {
  const {
    departureTime,
    departureDate,
    setNewDepartureTime,
    setNewDepartureDate,
  } = useNavigation();

  const [currentlySelectedDate, setCurrentlySelectedDate] = useState<string>(
    parseToSimpleDate(departureDate)
  );
  const [currentlySelectedTime, setCurrentlySelectedTime] =
    useState<string>(departureTime);
  const [showSelectionPanel, setShowSelectionPanel] = useState<boolean>(false);

  const handleDatePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentlySelectedDate(event.target.value);
  };

  const handleTimePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentlySelectedTime(event.target.value);
  };

  const handleSelectButtonClick = () => {
    if (currentlySelectedDate && currentlySelectedTime) {
      setNewDepartureDate(new Date(currentlySelectedDate));
      setNewDepartureTime(currentlySelectedTime);
    }

    setShowSelectionPanel(false);
  };

  const handleNowButtonClick = () => {
    const timeNow = parseToSimpleTime(new Date());
    const dateNow = new Date();

    setCurrentlySelectedDate(parseToSimpleDate(dateNow));
    setCurrentlySelectedTime(timeNow);
    setNewDepartureDate(dateNow);
    setNewDepartureTime(timeNow);
    setShowSelectionPanel(false);
  };

  return (
    <DateAndTimePicker
      departureDate={departureDate}
      departureTime={departureTime}
      currentlySelectedTime={currentlySelectedTime}
      currentlySelectedDate={currentlySelectedDate}
      showSelectionPanel={showSelectionPanel}
      onDateAndTimeButtonClick={() => {
        setShowSelectionPanel(!showSelectionPanel);
      }}
      onDatePickerChange={handleDatePickerChange}
      onTimePickerChange={handleTimePickerChange}
      onSelectButtonClick={handleSelectButtonClick}
      onNowButtonClick={handleNowButtonClick}
      onHideSelectionPanel={() => {
        setShowSelectionPanel(false);
      }}
    />
  );
};

export default DateAndTimePickerContainer;
