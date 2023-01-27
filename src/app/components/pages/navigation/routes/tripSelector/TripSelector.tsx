import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { ReactComponent as SearchIcon } from '../../../../../static/svg/chevron_right.svg';
import StationsSelectorContainer from './stationsSelector/StationsSelectorContainer';
import DateAndTimePickerContainer from './dateAndTimePicker/DateAndTimePickerContainer';
import MobileHeader from '../../../../molecules/mobileHeader/MobileHeader';

interface TripSelectorProps {
  onMenuButtonClick: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
    <form className={styles.tripSelector} onSubmit={props.onSubmit}>
      <MobileHeader onMenuButtonClick={props.onMenuButtonClick} />
      <div className={styles.inputFields}>
        <StationsSelectorContainer />
        <DateAndTimePickerContainer />
      </div>
      <button
        type="submit"
        aria-label={t('Navigation.TripSelector.SEARCH_BUTTON')}
        className={styles.searchButton}
      >
        <p>{t('Navigation.TripSelector.SEARCH_BUTTON')}</p>
        <SearchIcon />
      </button>
    </form>
  );
};

export default TripSelector;
