import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { ReactComponent as SearchIcon } from '../../../static/img/chevron_right.svg';
import { ReactComponent as LogoWhite } from '../../../static/img/logo_white.svg';
import { ReactComponent as MenuIcon } from '../../../static/img/menu.svg';
import StationsSelectorContainer from './stationsSelector/StationsSelectorContainer';
import MapImage from '../../../static/img/fake_map.png';
import DateAndTimePickerContainer from './dateAndTimePicker/DateAndTimePickerContainer';

interface TripSelectorProps {
  onMenuButtonClick: () => void;
  onSearchButtonClick: () => void;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

  const dateAndTime = new Date('2021-09-24 17:30');

  return (
    <>
      <div className={styles.tripSelectorContainer}>
        <div className={styles.header}>
          <button
            title={t('GO_BACK_BUTTON')}
            type="button"
            className={styles.menuButton}
            onClick={props.onMenuButtonClick}
          >
            <MenuIcon />
          </button>
          <div className={styles.logo}>
            <LogoWhite />
          </div>
        </div>
        <div className={styles.inputFields}>
          <StationsSelectorContainer />
          <DateAndTimePickerContainer selectedDate={dateAndTime} />
        </div>
        <button
          type="button"
          title={t('Content.TripSelector.SEARCH_BUTTON')}
          className={styles.searchButton}
          onClick={props.onSearchButtonClick}
        >
          <p>{t('Content.TripSelector.SEARCH_BUTTON')}</p>
          <SearchIcon />
        </button>
      </div>{' '}
      <img className={styles.map} alt="Map" src={MapImage} />
    </>
  );
};

export default TripSelector;
