import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DateAndTimePicker.module.css';
import { ReactComponent as CalendarIcon } from '../../../../static/img/date_picker.svg';
import { ReactComponent as TimeIcon } from '../../../../static/img/time_picker.svg';
import { parseToEnglishDateString } from '../../dateFormatter';

interface DateAndTimePickerProps {
  departureDate: Date;
  departureTime: string;
  currentlySelectedDate: string;
  currentlySelectedTime: string;
  onDateAndTimeButtonClick: () => void;
  onDatePickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTimePickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectButtonClick: () => void;
  onNowButtonClick: () => void;
  onHideSelectionPanel: () => void;
  showSelectionPanel: boolean;
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
    <>
      <div className={styles.dateAndTimePickerContainer}>
        <button
          type="button"
          title={t('Content.DateAndTimePicker.DATE_TIME_PICKER_BUTTON')}
          className={styles.dateAndTimePickerButton}
          onClick={props.onDateAndTimeButtonClick}
        >
          <div className={styles.date}>
            <CalendarIcon />
            <span>{parseToEnglishDateString(props.departureDate, true)}</span>
          </div>
          <div className={styles.time}>
            <TimeIcon />
            <span>{props.departureTime}</span>
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
                  value={props.currentlySelectedDate}
                  onChange={props.onDatePickerChange}
                />
              </div>
              <div>
                <label htmlFor="timeInput">
                  {t('Content.DateAndTimePicker.TIME_LABEL')}
                </label>
                <input
                  type="time"
                  id="timeInput"
                  value={props.currentlySelectedTime}
                  onChange={props.onTimePickerChange}
                />
              </div>
            </div>
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
    </>
  );
};

export default DateAndTimePicker;
