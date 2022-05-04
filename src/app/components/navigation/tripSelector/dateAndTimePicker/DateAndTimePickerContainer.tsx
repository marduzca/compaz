import React, { useEffect, useState } from 'react';
import DateAndTimePicker from './DateAndTimePicker';
import { useNavigation } from '../../../providers/navigation/NavigationProvider';
import {
  isWeekday,
  parseToSimpleDate,
  parseToSimpleTime,
} from '../../dateFormatter';

const DateAndTimePickerContainer: React.FC = () => {
  const weekdayBeginOfFunctionalHours = 6;
  const weekdayEndOfFunctionalHours = 21;
  const weekendBeginOfFunctionalHours = 7;
  const weekendEndOfFunctionalHours = 19;

  const isTimeOutsideOfFunctionalHours = (hour: number) => {
    if (
      isWeekday(currentlySelectedDate) &&
      (hour < weekdayBeginOfFunctionalHours ||
        hour > weekdayEndOfFunctionalHours)
    ) {
      return true;
    }

    return (
      hour < weekendBeginOfFunctionalHours || hour > weekendEndOfFunctionalHours
    );
  };

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
  const [
    isSelectedTimeOutsideOfFunctionalHours,
    setSelectedTimeOutsideOfFunctionalHours,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (departureTime) {
      setSelectedTimeOutsideOfFunctionalHours(
        isTimeOutsideOfFunctionalHours(
          parseInt(departureTime.substring(0, 2), 10)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureTime]);

  const handleDatePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentlySelectedDate(event.target.value);
  };

  const handleTimePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSelectedTime = event.target.value;

    setCurrentlySelectedTime(newSelectedTime);

    const hour = parseInt(newSelectedTime.substring(0, 2), 10);

    setSelectedTimeOutsideOfFunctionalHours(
      isTimeOutsideOfFunctionalHours(hour)
    );
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
      isSelectedTimeOutsideOfFunctionalHours={
        isSelectedTimeOutsideOfFunctionalHours
      }
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
