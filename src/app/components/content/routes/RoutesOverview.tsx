import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowUpIcon } from '../../../static/img/arrow_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../static/img/arrow_down.svg';
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
      <div className={styles.routesOverview}>
        <button
          type="button"
          title={t('Content.RoutesOverview.EARLIER_BUTTON')}
          className={styles.adjustTimeButton}
        >
          <ArrowUpIcon />
          <span>{t('Content.RoutesOverview.EARLIER_BUTTON')}</span>
        </button>
        <section>
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
        </section>
        <button
          type="button"
          title={t('Content.RoutesOverview.LATER_BUTTON')}
          className={`${styles.adjustTimeButton} ${styles.laterButton}`}
        >
          <ArrowDownIcon />
          <span>{t('Content.RoutesOverview.LATER_BUTTON')}</span>
        </button>
      </div>
    </div>
  );
};

export default RoutesOverview;
