import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { ReactComponent as SearchIcon } from '../../../static/img/chevron_right.svg';
import { ReactComponent as LogoWhite } from '../../../static/img/logo_white.svg';
import { ReactComponent as MenuIcon } from '../../../static/img/menu.svg';
import StationsSelectorContainer from './stationsSelector/StationsSelectorContainer';
import DateAndTimePickerContainer from './dateAndTimePicker/DateAndTimePickerContainer';

interface TripSelectorProps {
  showOriginMissingError: boolean;
  showDestinationMissingError: boolean;
  onMenuButtonClick: () => void;
  onSearchButtonClick: () => void;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <section className={styles.tripSelector}>
      <div className={styles.header}>
        <button
          title={t('GO_BACK_BUTTON')}
          type="button"
          className={styles.menuButton}
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            props.onMenuButtonClick();
          }}
          aria-expanded={isMobileMenuOpen}
        >
          <MenuIcon />
        </button>
        <div className={styles.logo}>
          <LogoWhite />
        </div>
      </div>
      <div className={styles.inputFields}>
        <StationsSelectorContainer
          showOriginMissingError={props.showOriginMissingError}
          showDestinationMissingError={props.showDestinationMissingError}
        />
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
    </section>
  );
};

export default TripSelector;
