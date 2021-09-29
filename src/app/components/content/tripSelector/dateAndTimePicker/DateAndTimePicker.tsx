import React from 'react';
import styles from './DateAndTimePicker.module.css';
import { ReactComponent as CalendarIcon } from '../../../../static/img/date_picker.svg';
import {
  parseToEnglishDateString,
  parseToTimeString,
} from '../../dateFormatter';
import { ReactComponent as TimeIcon } from '../../../../static/img/time_picker.svg';

interface DateAndTimePickerProps {
  selectedDate: Date;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = (props) => (
  <div className={styles.dateAndTimePickerContainer}>
    <span className={styles.datePicker}>
      <button type="button" className={styles.datePickerToggleButton}>
        <CalendarIcon />
        <span>{parseToEnglishDateString(props.selectedDate, true)}</span>
      </button>
      <input type="date" className={styles.datePickerInput} />
    </span>
    <div className={styles.timePicker}>
      <TimeIcon />
      <span>{parseToTimeString(props.selectedDate)}</span>
    </div>
  </div>
);

export default DateAndTimePicker;
