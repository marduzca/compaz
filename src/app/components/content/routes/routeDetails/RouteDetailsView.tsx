import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, SubRoute } from '../../../domain';
import { ReactComponent as CircleIcon } from '../../../../static/img/circle.svg';
import styles from './RouteDetailsView.module.css';
import getCorrespondingTelefericoIcon from '../utils';
import { addMinutesToDate, parseToSimpleTime } from '../../dateFormatter';

interface SubRouteDetailsProps {
  subRoute: SubRoute;
  startTime: Date;
}

const SubRouteDetails: React.FC<SubRouteDetailsProps> = (props) => {
  const { t } = useTranslation();

  return (
    <section className={styles.subRouteInfo}>
      <div
        className={styles.telefericoIcon}
        style={{ color: `var(--teleferico-${props.subRoute.line})` }}
      >
        <img
          key={`${props.subRoute.line}`}
          title={t(`Content.Route.Lines.${props.subRoute.line.toUpperCase()}`)}
          alt={t(`Content.Route.Lines.${props.subRoute.line.toUpperCase()}`)}
          src={getCorrespondingTelefericoIcon(props.subRoute.line)}
        />
      </div>
      <div className={styles.originStation}>
        <span className={styles.subRouteInfoStation}>
          {props.subRoute.stationsPath[0].name}
        </span>
        <span>Dirección Libertador</span>
      </div>
      <span className={styles.originTime}>
        {parseToSimpleTime(props.startTime)}
      </span>
      <div className={styles.intermediateStations}>{`Avanza ${
        props.subRoute.stationsPath.length - 1
      } parada 
      (${props.subRoute.totalTime} min)`}</div>

      <span className={styles.circleIcon}>
        <CircleIcon />
      </span>
      <span
        className={`${styles.destinationStation} ${styles.subRouteInfoStation}`}
      >
        {
          props.subRoute.stationsPath[props.subRoute.stationsPath.length - 1]
            .name
        }
      </span>
      <span className={styles.destinationTime}>
        {parseToSimpleTime(
          addMinutesToDate(props.startTime, props.subRoute.totalTime)
        )}
      </span>
    </section>
  );
};

interface RouteDetailsViewProps {
  route: Route;
  departureTime: Date;
}

const RouteDetailsView: React.FC<RouteDetailsViewProps> = (props) => (
  <>
    <p>HEADER</p>
    <br />
    <SubRouteDetails
      subRoute={props.route.subRoutes[0]}
      startTime={props.departureTime}
    />
  </>
);

export default RouteDetailsView;
