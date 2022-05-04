import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DateAndTimePicker.module.css';
import { ReactComponent as CalendarIcon } from '../../../../static/img/date_picker.svg';
import { ReactComponent as TimeIcon } from '../../../../static/img/time_picker.svg';
import {
  parseToEnglishDateString,
  parseToSimpleTime,
  parseToSpanishDateString,
} from '../../dateFormatter';
import i18n from '../../../../i18n/instance';

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
  onHideSelectionPanel: () => void;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = (props) => {
  const { t } = useTranslation();

  const dateAndTimeSelectionPanelRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideOfMobileMenu = (e: MouseEvent) => {
    if (
      dateAndTimeSelectionPanelRef.current &&
      dateAndTimeSelectionPanelRef.current.contains(e.target as Node)
    ) {
      return;
    }

    props.onHideSelectionPanel();
  };

  useEffect(() => {
    if (props.showSelectionPanel) {
      document.addEventListener('mousedown', handleClickOutsideOfMobileMenu);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideOfMobileMenu);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOfMobileMenu);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showSelectionPanel]);

  return (
    <div className={styles.dateAndTimePickerContainer}>
      <button
        type="button"
        title={t('Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON')}
        aria-label={t(
          'Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON_DESCRIPTION',
          {
            selectedDate: props.departureDate,
            selectedTime: props.departureTime,
          }
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
                  true
                )
              : parseToSpanishDateString(
                  props.departureDate
                    ? new Date(`${props.departureDate}T12:00:00.000Z`)
                    : new Date(),
                  true
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
      {props.showSelectionPanel && (
        <div className={styles.menu} ref={dateAndTimeSelectionPanelRef}>
          <div className={styles.inputFields}>
            <div>
              <label htmlFor="dateInput">
                {t('Content.DateAndTimePicker.DATE_LABEL')}
              </label>
              <input
                type="date"
                id="dateInput"
                className={styles.dateInput}
                defaultValue={props.departureDate}
                onChange={props.onDatePickerChange}
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="timeInput">
                {t('Content.DateAndTimePicker.TIME_LABEL')}
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
              />
            </div>
          </div>
          {props.isSelectedTimeOutsideOfFunctionalHours && (
            <p className={styles.timeError}>
              {t('Content.DateAndTimePicker.TIME_ERROR')}
            </p>
          )}
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.nowButton}
              onClick={props.onNowButtonClick}
            >
              {t('Content.DateAndTimePicker.NOW_BUTTON')}
            </button>
            <button
              type="button"
              className={styles.selectButton}
              onClick={props.onSelectButtonClick}
            >
              {t('Content.DateAndTimePicker.SELECT_BUTTON')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateAndTimePicker;
