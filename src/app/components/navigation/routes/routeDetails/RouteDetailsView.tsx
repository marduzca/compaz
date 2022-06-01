import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Resizable } from 're-resizable';
import { ReactComponent as ResizeIcon } from '../../../../static/svg/resize.svg';
import { Route } from '../../../domain';
import SubRouteDetails from './SubRouteDetails';
import { addMinutesToDate } from '../../dateFormatter';
import styles from './RouteDetailsView.module.css';
import transferIcon from '../../../../static/svg/transfer.svg';
import IconsRoute from '../shared/IconsRoute';
import TotalRouteTime from '../shared/TotalRouteTime';
import { ReactComponent as BackIcon } from '../../../../static/svg/arrow_back.svg';

interface DetailsContentBoxProps {
  route: Route;
  departureTime: Date;
  linesWithOpenIntermediateStations: string[];
  onIntermediateStationsButtonClick: (line: string) => void;
  onBackButtonClick: () => void;
}

const DetailsContentBox: React.FC<DetailsContentBoxProps> = (props) => {
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
                loading="lazy"
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
    <>
      <header className={styles.header}>
        <button
          type="button"
          title={t('GO_BACK_BUTTON')}
          className={styles.backButton}
          onClick={props.onBackButtonClick}
          aria-label={t('GO_BACK_BUTTON_DESCRIPTIVE', {
            previousPage: t('ROUTES_OVERVIEW'),
            currentPage: t('ROUTE_DETAILS'),
          })}
          autoFocus
        >
          <BackIcon />
        </button>
        <IconsRoute subRoutes={props.route.subRoutes} hideTimes />
        <TotalRouteTime totalTime={props.route.totalTime} />
      </header>
      <main className={styles.contentContainer}>
        <ol className={styles.routeDetails}>{renderRouteDetails()}</ol>
      </main>
    </>
  );
};

interface RouteDetailsViewProps {
  route: Route;
  departureTime: Date;
  linesWithOpenIntermediateStations: string[];
  isMobile: boolean;
  onIntermediateStationsButtonClick: (line: string) => void;
  onBackButtonClick: () => void;
}

const RouteDetailsView: React.FC<RouteDetailsViewProps> = (props) => (
  <section className={styles.routeDetailsContainer}>
    {props.isMobile ? (
      <Resizable
        className={styles.resizableBox}
        defaultSize={{
          width: '100%',
          height: `${window.innerHeight * 0.8}px`,
        }}
        enable={{
          top: true,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        handleComponent={{
          top: <ResizeIcon />,
        }}
        handleClasses={{ top: styles.resizeArea }}
        bounds="window"
        boundsByDirection
      >
        <div style={{ height: '100%' }}>
          <DetailsContentBox
            route={props.route}
            departureTime={props.departureTime}
            linesWithOpenIntermediateStations={
              props.linesWithOpenIntermediateStations
            }
            onIntermediateStationsButtonClick={
              props.onIntermediateStationsButtonClick
            }
            onBackButtonClick={props.onBackButtonClick}
          />
        </div>
      </Resizable>
    ) : (
      <DetailsContentBox
        route={props.route}
        departureTime={props.departureTime}
        linesWithOpenIntermediateStations={
          props.linesWithOpenIntermediateStations
        }
        onIntermediateStationsButtonClick={
          props.onIntermediateStationsButtonClick
        }
        onBackButtonClick={props.onBackButtonClick}
      />
    )}
  </section>
);

export default RouteDetailsView;
