import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowUpIcon } from '../../../../static/img/chevron_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../../static/img/chevron_down.svg';
import { ReactComponent as BackIcon } from '../../../../static/img/arrow_back.svg';
import transferIcon from '../../../../static/img/double_arrow.svg';
import styles from './RoutesOverview.module.css';
import { Route } from '../../../domain';
import {
  addMinutesToDate,
  parseToEnglishDateString,
  parseToSimpleTime,
  parseToSpanishDate,
} from '../../dateFormatter';
import i18n from '../../../../i18n/instance';
import getCorrespondingTelefericoIcon from '../utils';

interface SingleRouteProps {
  route: Route;
  departureTime: Date;
  onRouteSelection: (departureTime: Date) => void;
}

const SingleRoute: React.FC<SingleRouteProps> = (props) => {
  const { t } = useTranslation();

  const renderRoute = (): ReactNode[] => {
    const lineIcons = props.route.subRoutes.map((subRoute) => (
      <li key={subRoute.line} className={styles.teleferico}>
        <img
          key={`${subRoute.line}`}
          title={t(`Content.Route.Lines.${subRoute.line.toUpperCase()}`)}
          alt={t(`Content.Route.Lines.${subRoute.line.toUpperCase()}`)}
          src={getCorrespondingTelefericoIcon(subRoute.line)}
        />
        <span>{subRoute.totalTime}</span>
      </li>
    ));

    for (
      let index = 0;
      index < props.route.subRoutes.length * 2 - 1;
      index += 1
    ) {
      if (index !== 0 && index % 2 === 1) {
        lineIcons.splice(
          index,
          0,
          <li key={`transfer-${index}`} className={styles.transfer}>
            <img
              src={transferIcon}
              title={t('Content.RoutesOverview.TRANSFER')}
              alt={t('Content.RoutesOverview.TRANSFER')}
            />
            <span>
              {
                props.route.subRoutes[Math.floor(index / 2)]
                  .transferTimeToNextLine
              }
            </span>
          </li>
        );
      }
    }

    return lineIcons;
  };

  const routeClockTime = `${parseToSimpleTime(props.departureTime)} - 
          ${parseToSimpleTime(
            addMinutesToDate(props.departureTime, props.route.totalTime)
          )}`;

  const convertMinutesToHoursMinutess = (givenMinutes: number): JSX.Element => {
    const resultHours = Math.floor(givenMinutes / 60);
    const resultMinutes = givenMinutes % 60;

    return (
      <div className={styles.totalTimeInHours}>
        <span>{resultHours} h</span>
        {resultMinutes ? <span>{resultMinutes} min</span> : null}
      </div>
    );
  };

  return (
    <>
      {props.route.subRoutes.length > 0 && (
        <button
          type="button"
          title={`${t(
            'Content.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE'
          )} ${routeClockTime}`}
          className={styles.singleRouteOverview}
          onClick={() => {
            props.onRouteSelection(props.departureTime);
          }}
        >
          <div className={styles.routeTop}>
            <ol className={styles.route}>
              {renderRoute().map((routeItem) => routeItem)}
            </ol>
            {props.route.totalTime < 60 ? (
              <span>{props.route.totalTime} min</span>
            ) : (
              convertMinutesToHoursMinutess(props.route.totalTime)
            )}
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
    <div className={styles.routesOverviewContainer}>
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
        <span>
          {i18n.language.match(/en/i)
            ? parseToEnglishDateString(props.dateAndTime, false)
            : parseToSpanishDate(props.dateAndTime, false)}
        </span>
      </header>
      <div className={styles.routesOverview}>
        <button
          type="button"
          title={t('Content.RoutesOverview.EARLIER_BUTTON')}
          className={`${styles.adjustTimeButton} ${styles.earlierButton}`}
          onClick={props.onEarlierButtonClick}
        >
          <ArrowUpIcon />
          <span>{t('Content.RoutesOverview.EARLIER_BUTTON')}</span>
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
          title={t('Content.RoutesOverview.LATER_BUTTON')}
          className={styles.adjustTimeButton}
          onClick={props.onLaterButtonClick}
        >
          <ArrowDownIcon />
          <span>{t('Content.RoutesOverview.LATER_BUTTON')}</span>
        </button>
      </div>
    </div>
  );
};

export default RoutesOverview;
