import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { Station } from '../providers/FirebaseProvider';
import { ReactComponent as SearchIcon } from '../../static/img/arrow_right.svg';
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
          <StationsSelectorContainer stations={props.stations} />
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
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TripSelector;
