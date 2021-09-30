import React from 'react';
import { ConfigProvider, TimePicker } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import enGB from 'antd/lib/locale/en_GB';
import './antd.css';
import moment from 'moment';
import styles from './DateAndTimePicker.module.css';
import { ReactComponent as CalendarIcon } from '../../../../static/img/date_picker.svg';
import { ReactComponent as TimeIcon } from '../../../../static/img/time_picker.svg';
import { parseToEnglishDateString } from '../../dateFormatter';
import i18n from '../../../../i18n/instance';

interface DateAndTimePickerProps {
  selectedDate: Date;
  selectedTime: string;
  onTimePickerChange: (time: moment.MomentInput, timeString: string) => void;
  showOpenTimePickerPanel?: boolean;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = (props) => {
  if (!props.showOpenTimePickerPanel) {
    // This is necessary to have a visual regression test for the time picker panel (as it will probably break with new versions eventually)
    // @ts-ignore
    import('./antd_animations.css');
  }

  return (
    <div className={styles.dateAndTimePickerContainer}>
      <button type="button" className={styles.datePicker}>
        <div className={styles.datePickerToggleButton}>
          <CalendarIcon />
          <span>{parseToEnglishDateString(props.selectedDate, true)}</span>
        </div>
        <input type="date" className={styles.datePickerInput} />
      </button>
      <button type="button" className={styles.timePicker}>
        <div className={styles.timePickerToggleButton}>
          <TimeIcon />
          <span>{props.selectedTime}</span>
        </div>
        <ConfigProvider locale={i18n.language.match(/en/i) ? enGB : esES}>
          <TimePicker
            className={styles.reactTimePicker}
            popupClassName={styles.reactTimePickerPanel}
            onChange={props.onTimePickerChange}
            format="HH:mm"
            getPopupContainer={() => document.documentElement}
            inputReadOnly
            open={props.showOpenTimePickerPanel}
          />
        </ConfigProvider>
      </button>
    </div>
  );
};

DateAndTimePicker.defaultProps = {
  showOpenTimePickerPanel: undefined,
};

export default DateAndTimePicker;
