import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { ReactComponent as SearchIcon } from '../../../static/img/arrow_right.svg';
import { ReactComponent as LogoWhite } from '../../../static/img/logo_white.svg';
import { ReactComponent as MenuIcon } from '../../../static/img/menu.svg';
import StationsSelectorContainer from './stationsSelector/StationsSelectorContainer';

interface TripSelectorProps {
  onMenuButtonClick: () => void;
  onSearchButtonClick: () => void;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
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
        <StationsSelectorContainer />
        <div className={styles.dateAndTimePicker}>
          <div>Date and Time picker</div>
        </div>
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
    </>
  );
};

export default TripSelector;
