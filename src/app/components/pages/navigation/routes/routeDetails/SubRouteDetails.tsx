import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubRoute } from '../../../../domain';
import styles from './SubRouteDetails.module.css';
import getCorrespondingTelefericoIcon from '../utils';
import { addMinutesToDate, parseToSimpleTime } from '../../util/dateFormatter';
import { ReactComponent as ArrowUpIcon } from '../../../../../static/svg/chevron_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../../../static/svg/chevron_down.svg';
import { ReactComponent as CircleIcon } from '../../../../../static/svg/circle.svg';

interface IntermediateStationsProps {
  subRoute: SubRoute;
  showIntermediateStations: boolean;
  onIntermediateStationsButtonClick: (line: string) => void;
}

const IntermediateStations: React.FC<IntermediateStationsProps> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      {props.subRoute.stationsPath.length > 2 ? (
        <button
          type="button"
          title={
            props.showIntermediateStations
              ? t(
                  'Navigation.RouteDetails.INTERMEDIATE_STATIONS_CLOSE_BUTTON_TITLE',
                )
              : t(
                  'Navigation.RouteDetails.INTERMEDIATE_STATIONS_OPEN_BUTTON_TITLE',
                )
          }
          aria-label={
            props.showIntermediateStations
              ? t(
                  'Navigation.RouteDetails.INTERMEDIATE_STATIONS_CLOSE_BUTTON_TITLE',
                )
              : t(
                  'Navigation.RouteDetails.INTERMEDIATE_STATIONS_OPEN_BUTTON_TITLE',
                )
          }
          className={styles.intermediateStationsButton}
          onClick={() => {
            props.onIntermediateStationsButtonClick(props.subRoute.line);
          }}
        >
          {props.showIntermediateStations ? <ArrowUpIcon /> : <ArrowDownIcon />}
          <span>
            {t('Navigation.RouteDetails.INTERMEDIATE_STATIONS_MESSAGE', {
              stopsNumber: props.subRoute.stationsPath.length - 1,
              time: props.subRoute.totalTime,
            })}
          </span>
        </button>
      ) : (
        <span>
          {t('Navigation.RouteDetails.SINGLE_INTERMEDIATE_STATIONS_MESSAGE', {
            time: props.subRoute.totalTime,
          })}
        </span>
      )}
      {props.showIntermediateStations && (
        <ul className={styles.intermediateStationsList}>
          {props.subRoute.stationsPath.map((station, index) => {
            if (
              index !== 0 &&
              index !== props.subRoute.stationsPath.length - 1
            ) {
              return <li key={station.id}>{station.name}</li>;
            }

            return null;
          })}
        </ul>
      )}
    </>
  );
};

interface SubRouteDetailsProps {
  subRoute: SubRoute;
  startTime: Date;
  showIntermediateStations: boolean;
  onIntermediateStationsButtonClick: (line: string) => void;
}

const SubRouteDetails: React.FC<SubRouteDetailsProps> = (props) => {
  const { t } = useTranslation();

  return (
    <li
      title={t(`Navigation.Route.Lines.${props.subRoute.line.toUpperCase()}`)}
      className={styles.subRouteBlock}
    >
      <div
        className={styles.telefericoIcon}
        style={{ color: `var(--teleferico-${props.subRoute.line})` }}
      >
        <img
          key={props.subRoute.line}
          alt={t(`Navigation.Route.Lines.${props.subRoute.line.toUpperCase()}`)}
          src={getCorrespondingTelefericoIcon(props.subRoute.line)}
          loading="lazy"
        />
      </div>
      <div className={styles.originStation}>
        <span className={styles.subRouteInfoStation} tabIndex={0}>
          {props.subRoute.stationsPath[0].name}
        </span>
        <span className={styles.subRouteDirection}>
          {t('Navigation.RouteDetails.DIRECTION', {
            direction: props.subRoute.direction,
          })}
        </span>
      </div>
      <span className={styles.originTime}>
        {parseToSimpleTime(props.startTime)}
      </span>
      <div className={styles.intermediateStations}>
        <IntermediateStations
          subRoute={props.subRoute}
          showIntermediateStations={props.showIntermediateStations}
          onIntermediateStationsButtonClick={
            props.onIntermediateStationsButtonClick
          }
        />
      </div>
      <span className={styles.circleIcon}>
        <CircleIcon />
      </span>
      <span
        className={`${styles.destinationStation} ${styles.subRouteInfoStation}`}
        tabIndex={0}
      >
        {
          props.subRoute.stationsPath[props.subRoute.stationsPath.length - 1]
            .name
        }
      </span>
      <span className={styles.destinationTime}>
        {parseToSimpleTime(
          addMinutesToDate(props.startTime, props.subRoute.totalTime),
        )}
      </span>
    </li>
  );
};

export default SubRouteDetails;
