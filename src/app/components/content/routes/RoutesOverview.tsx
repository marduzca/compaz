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
import {
  addMinutesToDate,
  parseToEnglishDateString,
  parseToSpanishDate,
  parseToSimpleTime,
} from '../dateFormatter';
import i18n from '../../../i18n/instance';

interface SingleRouteProps {
  route: Route;
  time: Date;
}

const SingleRoute: React.FC<SingleRouteProps> = (props) => {
  const { t } = useTranslation();

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
      <li key={subRoute.line} className={styles.teleferico}>
        <img
          key={`${subRoute.line}`}
          title={t(
            `Content.RoutesOverview.Lines.${subRoute.line.toUpperCase()}`
          )}
          alt={t(`Content.RoutesOverview.Lines.${subRoute.line.toUpperCase()}`)}
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

  const routeClockTime = `${parseToSimpleTime(props.time)} - 
          ${parseToSimpleTime(
            addMinutesToDate(props.time, props.route.totalTime)
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
        <section
          title={`Single Route ${routeClockTime}`}
          className={styles.singleRouteOverview}
        >
          <div className={styles.routeTop}>
            <ul className={styles.route}>
              {renderRoute().map((routeItem) => routeItem)}
            </ul>
            {props.route.totalTime < 60 ? (
              <span>{props.route.totalTime} min</span>
            ) : (
              convertMinutesToHoursMinutess(props.route.totalTime)
            )}
          </div>
          <p className={styles.routeClock}>{routeClockTime}</p>
        </section>
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
  onBackButtonClick: () => void;
  onEarlierButtonClick: () => void;
  onLaterButtonClick: () => void;
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
        {props.displayedRouteTimes.map((routeTime) => (
          <SingleRoute
            key={routeTime.getTime()}
            route={props.route}
            time={routeTime}
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
