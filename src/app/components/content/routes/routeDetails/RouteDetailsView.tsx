import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Route } from '../../../domain';
import SubRouteDetails from './SubRouteDetails';
import { addMinutesToDate } from '../../dateFormatter';
import styles from './RouteDetailsView.module.css';
import transferIcon from '../../../../static/img/transfer.svg';
import IconsRoute from '../shared/IconsRoute';
import TotalRouteTime from '../shared/TotalRouteTime';
import { ReactComponent as BackIcon } from '../../../../static/img/arrow_back.svg';

interface RouteDetailsViewProps {
  route: Route;
  departureTime: Date;
  linesWithOpenIntermediateStations: string[];
  onIntermediateStationsButtonClick: (line: string) => void;
  onBackButtonClick: () => void;
}

const RouteDetailsView: React.FC<RouteDetailsViewProps> = (props) => {
  const { t } = useTranslation();

  let passedTime = 0;

  const renderRouteDetails = (): ReactNode[] => {
    const routeDetailsBlocks = props.route.subRoutes.map((subRoute) => {
      try {
        return (
          <SubRouteDetails
            key={subRoute.line}
            subRoute={subRoute}
            startTime={addMinutesToDate(props.departureTime, passedTime)}
            showIntermediateStations={props.linesWithOpenIntermediateStations.includes(
              subRoute.line
            )}
            onIntermediateStationsButtonClick={
              props.onIntermediateStationsButtonClick
            }
          />
        );
      } finally {
        passedTime += subRoute.totalTime;

        if (subRoute.transferTimeToNextLine) {
          passedTime += subRoute.transferTimeToNextLine;
        }
      }
    });

    for (
      let index = 0;
      index < props.route.subRoutes.length * 2 - 1;
      index += 1
    ) {
      if (index !== 0 && index % 2 === 1) {
        routeDetailsBlocks.splice(
          index,
          0,
          <li
            key={`transfer-${index}`}
            title={t('Content.RoutesOverview.TRANSFER')}
            className={styles.transfer}
          >
            <div className={styles.transferMessage}>
              <img
                src={transferIcon}
                alt={t('Content.RoutesOverview.TRANSFER')}
              />
              <span>
                {t('Content.RouteDetails.TRANSFER_MESSAGE', {
                  transferTime:
                    props.route.subRoutes[Math.floor(index / 2)]
                      .transferTimeToNextLine,
                })}
              </span>
            </div>
          </li>
        );
      }
    }

    return routeDetailsBlocks;
  };

  return (
    <div className={styles.routeDetailsContainer}>
      <header className={styles.header}>
        <button
          type="button"
          title={t('GO_BACK_BUTTON')}
          className={styles.backButton}
          onClick={props.onBackButtonClick}
        >
          <BackIcon />
        </button>
        <IconsRoute subRoutes={props.route.subRoutes} hideTimes />
        <TotalRouteTime totalTime={props.route.totalTime} />
      </header>
      <div className={styles.contentContainer}>
        <ol className={styles.routeDetails}>{renderRouteDetails()}</ol>
      </div>
    </div>
  );
};

export default RouteDetailsView;
