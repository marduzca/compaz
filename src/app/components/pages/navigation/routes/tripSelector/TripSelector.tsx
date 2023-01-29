import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { ReactComponent as SearchIcon } from '../../../../../static/svg/chevron_right.svg';
import StationsSelectorContainer from './stationsSelector/StationsSelectorContainer';
import DateAndTimePickerContainer from './dateAndTimePicker/DateAndTimePickerContainer';
import MobileHeader from '../../../../molecules/mobileHeader/MobileHeader';
import { useNavigation } from '../../../../providers/navigation/NavigationProvider';

interface TripSelectorProps {
  onMenuButtonClick: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();
  const { origin, destination } = useNavigation();

  const [showOriginSubmissionError, setShowOriginSubmissionError] =
    useState<boolean>(false);
  const [showDestinationSubmissionError, setShowDestinationSubmissionError] =
    useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    if (!origin || !destination) {
      setShowOriginSubmissionError(!origin);
      setShowDestinationSubmissionError(!destination);

      event.preventDefault();
      return false;
    }

    props.onSubmit(event);
    return true;
  };

  return (
    <form className={styles.tripSelector} onSubmit={handleSubmit}>
      <MobileHeader onMenuButtonClick={props.onMenuButtonClick} />
      <div className={styles.inputFields}>
        <StationsSelectorContainer
          showOriginSubmissionError={showOriginSubmissionError}
          setShowOriginSubmissionError={setShowOriginSubmissionError}
          showDestinationSubmissionError={showDestinationSubmissionError}
          setShowDestinationSubmissionError={setShowDestinationSubmissionError}
        />
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
