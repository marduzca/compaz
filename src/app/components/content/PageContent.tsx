import React, { useState } from 'react';
import styles from './PageContent.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';
import RoutesOverviewContainer from './routes/routesOverview/RoutesOverviewContainer';
import { useNavigation } from '../providers/NavigationProvider';
import { useFirebase } from '../providers/FirebaseProvider';
import { Route } from '../domain';
import RouteDetailsViewContainer from './routes/routeDetails/RouteDetailsViewContainer';

enum AppViewState {
  TRIP_SELECTOR,
  ROUTES_OVERVIEW,
  ROUTE_DETAILS,
}

interface PageContentProps {
  onMenuButtonClick: () => void;
}

const PageContent: React.FC<PageContentProps> = (props) => {
  const { calculateRoute } = useNavigation();
  const { stations, lines } = useFirebase();

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

  const handleBackButtonClick = () => {
    setCurrentAppViewState(AppViewState.TRIP_SELECTOR);
  };

  const handleRouteSelection = (departureTime: Date) => {
    setSelectedRouteDepartureTime(departureTime);
    setCurrentAppViewState(AppViewState.ROUTE_DETAILS);
  };

  const renderCurrentAppViewState = () => {
    switch (currentAppViewState) {
      case AppViewState.ROUTES_OVERVIEW:
        return (
          <RoutesOverviewContainer
            route={route}
            onRouteSelection={handleRouteSelection}
            onBackButtonClick={handleBackButtonClick}
          />
        );
      case AppViewState.ROUTE_DETAILS:
        return (
          <RouteDetailsViewContainer
            route={route}
            departureTime={selectedRouteDepartureTime}
          />
        );
      default:
        return (
          <TripSelectorContainer
            onMenuButtonClick={props.onMenuButtonClick}
            onSearchButtonClick={handleSearchButtonClick}
          />
        );
    }
  };

  return (
    <main className={styles.content}>
      <section className={styles.container}>
        {renderCurrentAppViewState()}
      </section>
    </main>
  );
};

export default PageContent;
