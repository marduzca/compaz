import React, { useState } from 'react';
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

enum AppViewState {
  TRIP_SELECTOR,
  ROUTES_OVERVIEW,
  ROUTE_DETAILS,
}

interface NavigationProps {
  onMenuButtonClick: () => void;
  isMobileMenuOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = (props) => {
  const { stations, lines } = useFirebase();
  const { calculateRoute } = useNavigation();

  const [currentAppViewState, setCurrentAppViewState] = useState<AppViewState>(
    AppViewState.TRIP_SELECTOR
  );
  const [route, setRoute] = useState<Route>({ subRoutes: [], totalTime: 0 });
  const [selectedRouteDepartureTime, setSelectedRouteDepartureTime] =
    useState<Date>(new Date());

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
        // @ts-ignore
        inert={props.isMobileMenuOpen ? '' : null}
      >
        {stations.length && lines.length ? (
          <>
            <section className={styles.container}>
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
