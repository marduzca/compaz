import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { Station } from '../providers/FirebaseProvider';
import { ReactComponent as SearchIcon } from '../../static/img/arrow_right.svg';
import { ReactComponent as LogoWhite } from '../../static/img/logo_white.svg';
import { ReactComponent as MenuIcon } from '../../static/img/menu.svg';
import StationsSelectorContainer from './StationsSelectorContainer';

interface TripSelectorProps {
  stations: Station[];
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {props.stations.length ? (
        <>
          <div className={styles.header}>
            <button title="menu" type="button" className={styles.menuButton}>
              <MenuIcon />
            </button>
            <div className={styles.logo}>
              <LogoWhite />
            </div>
          </div>
          <StationsSelectorContainer stations={props.stations} />
          <div className={styles.dateAndTimePicker}>
            <div>Date and Time picker</div>
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
