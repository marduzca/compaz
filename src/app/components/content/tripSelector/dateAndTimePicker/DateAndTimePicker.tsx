import React from 'react';
import TimePicker from 'react-time-picker';
import styles from './DateAndTimePicker.module.css';
import { ReactComponent as CalendarIcon } from '../../../../static/img/date_picker.svg';
import {
  parseToEnglishDateString,
  parseToTimeString,
} from '../../dateFormatter';
import { ReactComponent as TimeIcon } from '../../../../static/img/time_picker.svg';

interface DateAndTimePickerProps {
  selectedDate: Date;
  isTimeEditable: boolean;
  onTimePickerClick: () => void;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = (props) => (
  <div className={styles.dateAndTimePickerContainer}>
    <button type="button" className={styles.datePicker}>
      <div className={styles.datePickerToggleButton}>
        <CalendarIcon />
        <span>{parseToEnglishDateString(props.selectedDate, true)}</span>
      </div>
      <input type="date" className={styles.datePickerInput} />
    </button>
    {!props.isTimeEditable ? (
      <button
        type="button"
        className={`${styles.timePicker} ${styles.timePickerButton}`}
        onClick={props.onTimePickerClick}
      >
        <TimeIcon />
        <span>{parseToTimeString(props.selectedDate)}</span>
      </button>
    ) : (
      <div className={`${styles.timePicker} ${styles.timePickerInput}`}>
        <TimeIcon />
        <TimePicker
          className={styles.reactTimePicker}
          value={props.selectedDate}
          clockIcon={null}
          locale="es"
        />
      </div>
    )}
  </div>
);

export default DateAndTimePicker;
