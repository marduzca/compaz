import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowUpIcon } from '../../../static/img/arrow_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../static/img/arrow_down.svg';
import { ReactComponent as BackIcon } from '../../../static/img/arrow_back.svg';
import styles from './RoutesOverview.module.css';
import { Route } from '../../domain';

interface RoutesOverviewProps {
  route: Route;
  originName: string;
  destinationName: string;
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
          <h4>{`${props.originName} - ${props.destinationName}`}</h4>
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
          {props.route.subRoutes.map((subRoute, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`subRoute-${index}`}>
              <p>
                Subroute in line {subRoute.stationsPath[0].lines.toString()}
              </p>
              <p>Takes {subRoute.totalTime} mins in total</p>
              <p>V</p>
            </div>
          ))}
          <p>Total time of route is {props.route.totalTime}</p>
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
