import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { ReactComponent as SearchIcon } from '../../../static/img/arrow_right.svg';
import { ReactComponent as LogoWhite } from '../../../static/img/logo_white.svg';
import { ReactComponent as MenuIcon } from '../../../static/img/menu.svg';
import StationsSelectorContainer from '../stationsSelector/StationsSelectorContainer';
import { Station } from '../../domain';

interface TripSelectorProps {
  stations: Station[];
  onMenuButtonClick: () => void;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {props.stations.length ? (
        <>
          <div className={styles.header}>
            <button
              title="menu"
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
            <StationsSelectorContainer stations={props.stations} />
            <div className={styles.dateAndTimePicker}>
              <div>Date and Time picker</div>
            </div>
          </div>
          <button
            type="button"
            aria-label="trigger-search"
            className={styles.searchButton}
          >
            <p>{t('Content.TripSelector.SEARCH_BUTTON')}</p>
            <SearchIcon />
          </button>
        </>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
};

export default TripSelector;
