import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navigation.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';
import RoutesOverviewContainer from './routes/routesOverview/RoutesOverviewContainer';
import { useNavigation } from '../providers/navigation/NavigationProvider';
import { useFirebase } from '../providers/firebase/FirebaseProvider';
import { Route } from '../domain';
import RouteDetailsViewContainer from './routes/routeDetails/RouteDetailsViewContainer';
import LoadingPage from './loadingPage/LoadingPage';
import MapContainer from './map/MapContainer';
import 'wicg-inert';
import Footer from '../footer/Footer';
import { PAGE_TITLE_PREFIX } from '../../App';

enum AppViewState {
  TRIP_SELECTOR = 'TRIP_SELECTOR',
  ROUTES_OVERVIEW = 'ROUTES_OVERVIEW',
  ROUTE_DETAILS = 'ROUTE_DETAILS',
}

interface NavigationProps {
  onMenuButtonClick: () => void;
  isMobileMenuOpen: boolean;
}

const NAVIGATION_HEADING_ID = 'navigationHeadingId';

const Navigation: React.FC<NavigationProps> = (props) => {
  const { t } = useTranslation();
  const { stations, lines } = useFirebase();
  const { calculateRoute } = useNavigation();

  const [currentAppViewState, setCurrentAppViewState] = useState<AppViewState>(
    AppViewState.TRIP_SELECTOR
  );
  const [route, setRoute] = useState<Route>({ subRoutes: [], totalTime: 0 });
  const [selectedRouteDepartureTime, setSelectedRouteDepartureTime] =
    useState<Date>(new Date());

  useEffect(() => {
    document.title = `${PAGE_TITLE_PREFIX} ${t('Navigation.NAVIGATION_TITLE')}`;
    // eslint-disable-next-line
  }, []);

  const handleSearchButtonClick = () => {
    setRoute(calculateRoute(stations, lines));
    setCurrentAppViewState(AppViewState.ROUTES_OVERVIEW);
  };

  const handleRoutesOverviewBackButtonClick = () => {
    setCurrentAppViewState(AppViewState.TRIP_SELECTOR);
  };

  const handleRouteSelection = (departureTime: Date) => {
    setSelectedRouteDepartureTime(departureTime);
    setCurrentAppViewState(AppViewState.ROUTE_DETAILS);
  };

  const handleRouteDetailsBackButtonClick = () => {
    setCurrentAppViewState(AppViewState.ROUTES_OVERVIEW);
  };

  const renderCurrentAppViewState = () => {
    switch (currentAppViewState) {
      case AppViewState.ROUTES_OVERVIEW:
        return (
          <RoutesOverviewContainer
            route={route}
            onRouteSelection={handleRouteSelection}
            onBackButtonClick={handleRoutesOverviewBackButtonClick}
          />
        );
      case AppViewState.ROUTE_DETAILS:
        return (
          <RouteDetailsViewContainer
            route={route}
            departureTime={selectedRouteDepartureTime}
            onBackButtonClick={handleRouteDetailsBackButtonClick}
          />
        );
      default:
        return (
          <div className={styles.tripSelectorContainer}>
            <TripSelectorContainer
              onMenuButtonClick={props.onMenuButtonClick}
              onSearchButtonClick={handleSearchButtonClick}
            />
            <div className={styles.tripSelectorMap}>
              <MapContainer />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <main
        className={styles.content}
        // @ts-ignore : Until inert is added to the React types for HTML
        inert={props.isMobileMenuOpen ? '' : null}
      >
        <h1 id={NAVIGATION_HEADING_ID}>
          {t(`Navigation.Heading.${currentAppViewState}`)}
        </h1>
        {stations.length && lines.length ? (
          <>
            <section
              className={styles.container}
              aria-labelledby={NAVIGATION_HEADING_ID}
            >
              {renderCurrentAppViewState()}
            </section>
            {currentAppViewState === AppViewState.ROUTE_DETAILS && (
              <aside className={styles.detailsMap}>
                <MapContainer route={route} />
              </aside>
            )}
          </>
        ) : (
          <LoadingPage />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Navigation;
