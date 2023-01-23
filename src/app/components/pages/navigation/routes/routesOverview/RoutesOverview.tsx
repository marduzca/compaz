import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowUpIcon } from '../../../../../static/svg/chevron_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../../../static/svg/chevron_down.svg';
import { ReactComponent as BackIcon } from '../../../../../static/svg/arrow_back.svg';
import { ReactComponent as CoinIcon } from '../../../../../static/svg/boliviano.svg';
import styles from './RoutesOverview.module.css';
import { Route } from '../../../../domain';
import {
  addMinutesToDate,
  parseToEnglishDateString,
  parseToSimpleTime,
  parseToSpanishDateString,
} from '../../util/dateFormatter';
import i18n from '../../../../../i18n/instance';
import IconsRoute from '../shared/IconsRoute';
import TotalRouteTime from '../shared/TotalRouteTime';

interface SingleRouteProps {
  route: Route;
  departureTime: Date;
  onRouteSelection: (departureTime: Date) => void;
}

const SingleRoute: React.FC<SingleRouteProps> = (props) => {
  const { t } = useTranslation();

  const routeClockTime = `${parseToSimpleTime(
    props.departureTime
  )} - ${parseToSimpleTime(
    addMinutesToDate(props.departureTime, props.route.totalTime)
  )}`;

  return (
    <>
      {props.route.subRoutes.length > 0 && (
        <button
          type="button"
          aria-label={`${t(
            'Navigation.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE'
          )} ${routeClockTime}`}
          className={styles.singleRouteOverview}
          onClick={() => {
            props.onRouteSelection(props.departureTime);
          }}
        >
          <div className={styles.routeTop}>
            <IconsRoute subRoutes={props.route.subRoutes} />
            <TotalRouteTime totalTime={props.route.totalTime} />
          </div>
          <p className={styles.routeClock}>{routeClockTime}</p>
        </button>
      )}
    </>
  );
};

interface RoutesOverviewProps {
  route: Route;
  originName: string;
  destinationName: string;
  dateAndTime: Date;
  displayedRouteTimes: Date[];
  onRouteSelection: (departureTime: Date) => void;
  onBackButtonClick: () => void;
  onEarlierButtonClick: () => void;
  onLaterButtonClick: () => void;
}

const RoutesOverview: React.FC<RoutesOverviewProps> = (props) => {
  const { t } = useTranslation();

  return (
    <section className={styles.routesOverviewContainer}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <button
            type="button"
            title={t('GO_BACK_BUTTON')}
            className={styles.backButton}
            onClick={props.onBackButtonClick}
            aria-label={t('GO_BACK_BUTTON_DESCRIPTIVE', {
              previousPage: t('TRIP_SELECTOR'),
              currentPage: t('ROUTES_OVERVIEW'),
            })}
            autoFocus
          >
            <BackIcon />
          </button>
          <h1
            className={styles.title}
          >{`${props.originName} - ${props.destinationName}`}</h1>
        </div>
        <span>
          {i18n.language.match(/en/i)
            ? parseToEnglishDateString(props.dateAndTime, false)
            : parseToSpanishDateString(props.dateAndTime, false)}
        </span>
        <div className={styles.price}>
          <CoinIcon aria-label={t('Navigation.RoutesOverview.PRICE')} />
          <div>
            <p>
              {t('Navigation.RoutesOverview.NORMAL_RATE')}:
              <span>{` ${props.route.price}  Bs.`}</span>
            </p>
            <p>
              {t('Navigation.RoutesOverview.PREFERENTIAL_RATE')}:
              <span> {`${props.route.price / 2}  Bs.`}</span>
            </p>
          </div>
        </div>
      </header>
      <div className={styles.routesOverview}>
        <button
          type="button"
          aria-label={t('Navigation.RoutesOverview.EARLIER_BUTTON')}
          className={`${styles.adjustTimeButton} ${styles.earlierButton}`}
          onClick={props.onEarlierButtonClick}
        >
          <ArrowUpIcon />
          <span>{t('Navigation.RoutesOverview.EARLIER_BUTTON')}</span>
        </button>
        {props.displayedRouteTimes.map((routeDepartureTime) => (
          <SingleRoute
            key={routeDepartureTime.getTime()}
            route={props.route}
            departureTime={routeDepartureTime}
            onRouteSelection={props.onRouteSelection}
          />
        ))}
        <button
          type="button"
          aria-label={t('Navigation.RoutesOverview.LATER_BUTTON')}
          className={styles.adjustTimeButton}
          onClick={props.onLaterButtonClick}
        >
          <ArrowDownIcon />
          <span>{t('Navigation.RoutesOverview.LATER_BUTTON')}</span>
        </button>
      </div>
    </section>
  );
};

export default RoutesOverview;
