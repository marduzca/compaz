import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowUpIcon } from '../../../static/img/chevron_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../static/img/chevron_down.svg';
import { ReactComponent as BackIcon } from '../../../static/img/arrow_back.svg';
import blueTelefericoIcon from '../../../static/img/blue_teleferico.svg';
import brownTelefericoIcon from '../../../static/img/brown_teleferico.svg';
import greenTelefericoIcon from '../../../static/img/green_teleferico.svg';
import lightBlueTelefericoIcon from '../../../static/img/light_blue_teleferico.svg';
import orangeTelefericoIcon from '../../../static/img/orange_teleferico.svg';
import purpleTelefericoIcon from '../../../static/img/purple_teleferico.svg';
import redTelefericoIcon from '../../../static/img/red_teleferico.svg';
import silverTelefericoIcon from '../../../static/img/silver_teleferico.svg';
import whiteTelefericoIcon from '../../../static/img/white_teleferico.svg';
import yellowTelefericoIcon from '../../../static/img/yellow_teleferico.svg';
import transferIcon from '../../../static/img/double_arrow.svg';
import styles from './RoutesOverview.module.css';
import { Route } from '../../domain';

interface SingleRouteProps {
  route: Route;
}

const SingleRoute: React.FC<SingleRouteProps> = (props) => {
  const getCorrespondingTelefericoIcon = (lineColor: string): string => {
    switch (lineColor) {
      case 'blue':
        return blueTelefericoIcon;
      case 'brown':
        return brownTelefericoIcon;
      case 'green':
        return greenTelefericoIcon;
      case 'light_blue':
        return lightBlueTelefericoIcon;
      case 'orange':
        return orangeTelefericoIcon;
      case 'purple':
        return purpleTelefericoIcon;
      case 'red':
        return redTelefericoIcon;
      case 'silver':
        return silverTelefericoIcon;
      case 'white':
        return whiteTelefericoIcon;
      case 'yellow':
        return yellowTelefericoIcon;
      default:
        // TODO: handle error case
        return '';
    }
  };

  const renderRoute = (): ReactNode[] => {
    const lineIcons = props.route.subRoutes.map((subRoute) => (
      <img
        key={`${subRoute.line}`}
        title={subRoute.line}
        src={getCorrespondingTelefericoIcon(subRoute.line)}
        alt={subRoute.line}
        className={styles.teleferico}
      />
    ));

    for (let index = 0; index < lineIcons.length; index += 1) {
      if (index % 2 === 1) {
        lineIcons.splice(
          index,
          0,
          <img src={transferIcon} alt="Transfer" className={styles.transfer} />
        );
      }
    }

    return lineIcons;
  };

  return (
    <>
      {props.route.subRoutes.length > 0 && (
        <section className={styles.singleRouteOverview}>
          <div className={styles.routeTop}>
            <ul className={styles.route}>
              {renderRoute().map((routeItem, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>{routeItem}</li>
              ))}
            </ul>
            <span>{props.route.totalTime} min</span>
          </div>
          <p className={styles.routeClock}>15:00 - 15:36</p>
        </section>
      )}
    </>
  );
};

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
        <SingleRoute route={props.route} />
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
