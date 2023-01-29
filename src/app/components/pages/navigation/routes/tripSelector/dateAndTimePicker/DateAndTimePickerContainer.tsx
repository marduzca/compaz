import React, { useEffect, useRef, useState } from 'react';
import DateAndTimePicker from './DateAndTimePicker';
import { useNavigation } from '../../../../../providers/navigation/NavigationProvider';
import {
  isWeekday,
  parseToSimpleDate,
  parseToSimpleTime,
} from '../../../util/dateFormatter';

const WEEKDAY_BEGIN_OF_FUNCTIONAL_HOURS = 6;
const WEEKDAY_END_OF_FUNCTIONAL_HOURS = 22;
const WEEKEND_BEGIN_OF_FUNCTIONAL_HOURS = 7;
const WEEKEND_END_OF_FUNCTIONAL_HOURS = 21;

const DateAndTimePickerContainer: React.FC = () => {
  const dateAndTimeSelectionPanelRef = useRef<HTMLDivElement>(null);

  const isTimeOutsideOfFunctionalHours = (hour: number) => {
    if (
      isWeekday(currentlySelectedDate) &&
      (hour < WEEKDAY_BEGIN_OF_FUNCTIONAL_HOURS ||
        hour > WEEKDAY_END_OF_FUNCTIONAL_HOURS)
    ) {
      return true;
    }

    return (
      hour < WEEKEND_BEGIN_OF_FUNCTIONAL_HOURS ||
      hour > WEEKEND_END_OF_FUNCTIONAL_HOURS
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

  const handleClickOutsideOfMobileMenu = (e: MouseEvent) => {
    if (
      dateAndTimeSelectionPanelRef.current &&
      dateAndTimeSelectionPanelRef.current.contains(e.target as Node)
    ) {
      return;
    }

    setShowSelectionPanel(false);
  };

  useEffect(() => {
    if (showSelectionPanel) {
      document.addEventListener('mousedown', handleClickOutsideOfMobileMenu);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideOfMobileMenu);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOfMobileMenu);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSelectionPanel]);

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
      dateAndTimeSelectionWrapperRef={dateAndTimeSelectionPanelRef}
    />
  );
};

export default DateAndTimePickerContainer;
