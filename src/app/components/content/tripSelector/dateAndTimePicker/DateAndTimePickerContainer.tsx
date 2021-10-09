import React, { useState } from 'react';
import DateAndTimePicker from './DateAndTimePicker';
import { useNavigation } from '../../../providers/NavigationProvider';
import { parseToSimpleDate, parseToSimpleTime } from '../../dateFormatter';

const DateAndTimePickerContainer: React.FC = () => {
  const {
    departureDate,
    departureTime,
    setNewDepartureTime,
    setNewDepartureDate,
  } = useNavigation();

  const [currentlySelectedDate, setCurrentlySelectedDate] =
    useState<string>(departureDate);
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
      setNewDepartureDate(currentlySelectedDate);
      setNewDepartureTime(currentlySelectedTime);
    }

    setShowSelectionPanel(false);
  };

  const handleNowButtonClick = () => {
    const dateNow = new Date(Date.now());
    const simpleDateNow = parseToSimpleDate(dateNow);
    const simpleTimeNow = parseToSimpleTime(dateNow);

    setCurrentlySelectedDate(simpleDateNow);
    setCurrentlySelectedTime(simpleTimeNow);
    setNewDepartureDate(simpleDateNow);
    setNewDepartureTime(simpleTimeNow);
    setShowSelectionPanel(false);
  };

  return (
    <DateAndTimePicker
      departureDate={departureDate}
      departureTime={departureTime}
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
