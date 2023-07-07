import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DateAndTimePicker.module.css';
import { ReactComponent as CalendarIcon } from '../../../../../../static/svg/date_picker.svg';
import { ReactComponent as TimeIcon } from '../../../../../../static/svg/time_picker.svg';
import {
  parseToEnglishDateString,
  parseToSimpleTime,
  parseToSpanishDateString,
} from '../../../util/dateFormatter';
import i18n from '../../../../../../i18n/instance';

interface DateAndTimePickerProps {
  departureDate: string;
  departureTime: string;
  showSelectionPanel: boolean;
  isSelectedTimeOutsideOfFunctionalHours: boolean;
  onDateAndTimeButtonClick: () => void;
  onDatePickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTimePickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectButtonClick: () => void;
  onNowButtonClick: () => void;
  dateAndTimeSelectionWrapperRef: React.RefObject<HTMLDivElement>;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div
      className={styles.dateAndTimePickerContainer}
      ref={props.dateAndTimeSelectionWrapperRef}
    >
      <button
        type="button"
        title={t('Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON')}
        aria-label={t(
          'Navigation.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
          {
            selectedDate: props.departureDate,
            selectedTime: props.departureTime,
          },
        )}
        className={styles.dateAndTimePickerButton}
        onClick={props.onDateAndTimeButtonClick}
        aria-expanded={props.showSelectionPanel}
        aria-haspopup
      >
        <div className={styles.date}>
          <CalendarIcon />
          <span>
            {i18n.language.match(/en/i)
              ? parseToEnglishDateString(
                  props.departureDate
                    ? new Date(`${props.departureDate}T12:00:00.000Z`)
                    : new Date(),
                  true,
                )
              : parseToSpanishDateString(
                  props.departureDate
                    ? new Date(`${props.departureDate}T12:00:00.000Z`)
                    : new Date(),
                  true,
                )}
          </span>
        </div>
        <div className={styles.time}>
          <TimeIcon />
          <span>
            {props.departureTime
              ? props.departureTime
              : parseToSimpleTime(new Date())}
          </span>
        </div>
      </button>
      <div
        className={`${styles.menu} ${
          !props.showSelectionPanel && styles.invisible
        }`}
      >
        <div className={styles.inputFields}>
          <div>
            <label htmlFor="dateInput">
              {t('Navigation.DateAndTimePicker.DATE_LABEL')}
            </label>
            <input
              type="date"
              id="dateInput"
              className={styles.dateInput}
              defaultValue={props.departureDate}
              onChange={props.onDatePickerChange}
              autoFocus
              required
            />
          </div>
          <div>
            <label htmlFor="timeInput">
              {t('Navigation.DateAndTimePicker.TIME_LABEL')}
            </label>
            <input
              type="time"
              id="timeInput"
              defaultValue={props.departureTime}
              onChange={props.onTimePickerChange}
              className={
                props.isSelectedTimeOutsideOfFunctionalHours
                  ? styles.outsideOfFunctionalHours
                  : ''
              }
              required
            />
          </div>
        </div>
        {props.isSelectedTimeOutsideOfFunctionalHours && (
          <p className={styles.timeError}>
            {t('Navigation.DateAndTimePicker.TIME_ERROR')}
          </p>
        )}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.nowButton}
            onClick={props.onNowButtonClick}
          >
            {t('Navigation.DateAndTimePicker.NOW_BUTTON')}
          </button>
          <button
            type="button"
            className={styles.selectButton}
            onClick={props.onSelectButtonClick}
          >
            {t('Navigation.DateAndTimePicker.SELECT_BUTTON')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateAndTimePicker;
