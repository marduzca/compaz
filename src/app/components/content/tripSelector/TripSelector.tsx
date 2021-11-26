import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { ReactComponent as SearchIcon } from '../../../static/img/chevron_right.svg';
import { ReactComponent as LogoWhite } from '../../../static/img/logo_white.svg';
import { ReactComponent as MenuIcon } from '../../../static/img/menu.svg';
import StationsSelectorContainer from './stationsSelector/StationsSelectorContainer';
import DateAndTimePickerContainer from './dateAndTimePicker/DateAndTimePickerContainer';
import MapContainer from '../map/MapContainer';

interface TripSelectorProps {
  onMenuButtonClick: () => void;
  onSearchButtonClick: () => void;
  // eslint-disable-next-line react/require-default-props
  mapsApiKey?: string;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

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
          <DateAndTimePickerContainer />
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
      </div>
      {props.mapsApiKey && <MapContainer mapsApiKey={props.mapsApiKey} />}
    </>
  );
};

export default TripSelector;
