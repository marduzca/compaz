import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BackIcon } from '../../../static/img/arrow_back.svg';
import styles from './RoutesOverview.module.css';

interface RoutesOverviewProps {
  route: string[];
  onBackButtonClick: () => void;
}

const RoutesOverview: React.FC<RoutesOverviewProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.routesContainer}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <button
            type="button"
            title={t('GO_BACK_BUTTON')}
            className={styles.backButton}
            onClick={props.onBackButtonClick}
          >
            <BackIcon />
          </button>
          <h4>{`${props.route[0]} - ${
            props.route[props.route.length - 1]
          }`}</h4>
        </div>
        <span>Lun 15 Mar 2021</span>
      </header>
      <>
        {props.route.map((station, index) => {
          if (index === props.route.length - 1) {
            return (
              <div key={station}>
                <p>{`${station}`}</p>
              </div>
            );
          }

          return (
            <div key={station}>
              <p>{`${station}`}</p>
              <p>V</p>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default RoutesOverview;
