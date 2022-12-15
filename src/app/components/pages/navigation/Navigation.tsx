import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Route as Path,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import styles from './Navigation.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';
import RoutesOverviewContainer from './routes/routesOverview/RoutesOverviewContainer';
import { useNavigation } from '../../providers/navigation/NavigationProvider';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import { Route } from '../../domain';
import RouteDetailsViewContainer from './routes/routeDetails/RouteDetailsViewContainer';
import LoadingPage from './loadingPage/LoadingPage';
import MapContainer from './map/MapContainer';
import 'wicg-inert';
import Footer from '../../organisms/footer/Footer';
import { PAGE_TITLE_PREFIX } from '../../../App';
import useTimeOfTheDay from '../../hooks/useTimeOfTheDay/useTimeOfTheDay';
import { NavigationLink } from '../../organisms/menu/Menu';

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
  const { isNight } = useTimeOfTheDay();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentAppViewState, setCurrentAppViewState] = useState<AppViewState>(
    AppViewState.TRIP_SELECTOR
  );
  const [route, setRoute] = useState<Route>({ subRoutes: [], totalTime: 0 });
  const [selectedRouteDepartureTime, setSelectedRouteDepartureTime] =
    useState<Date>(new Date());

  useEffect(() => {
    document.title = `${PAGE_TITLE_PREFIX} ${t('Navigation.NAVIGATION_TITLE')}`;

    if (
      (location.pathname.includes(NavigationLink.ROUTES_OVERVIEW) ||
        location.pathname.includes(NavigationLink.ROUTE_DETAILS)) &&
      route.subRoutes.length === 0
    )
      window.location.replace(NavigationLink.BASE);

    // eslint-disable-next-line
  }, []);

  const handleSearchButtonClick = () => {
    setRoute(calculateRoute(stations, lines));
    setCurrentAppViewState(AppViewState.ROUTES_OVERVIEW);

    navigate(`${NavigationLink.NAVIGATION}${NavigationLink.ROUTES_OVERVIEW}`);
  };

  const handleBackButtonClick = (previousPage: AppViewState) => {
    setCurrentAppViewState(previousPage);

    navigate(-1);
  };

  const handleRouteSelection = (departureTime: Date) => {
    setSelectedRouteDepartureTime(departureTime);
    setCurrentAppViewState(AppViewState.ROUTE_DETAILS);

    navigate(`${NavigationLink.NAVIGATION}${NavigationLink.ROUTE_DETAILS}`);
  };

  return (
    <>
      <main
        className={`${styles.content} ${
          isNight ? styles.backgroundNight : styles.backgroundDay
        }`}
        // @ts-ignore : Until inert is added to the React types for HTML
        inert={props.isMobileMenuOpen ? '' : null}
      >
        <h1 id={NAVIGATION_HEADING_ID}>
          {t(`Navigation.Heading.${currentAppViewState}`)}
        </h1>
        {stations.length && lines.length ? (
          <section
            className={styles.container}
            aria-labelledby={NAVIGATION_HEADING_ID}
          >
            <Routes>
              <Path
                index
                element={
                  <div className={styles.tripSelectorContainer}>
                    <TripSelectorContainer
                      onMenuButtonClick={props.onMenuButtonClick}
                      onSearchButtonClick={handleSearchButtonClick}
                    />
                    <div className={styles.tripSelectorMap}>
                      <MapContainer />
                    </div>
                  </div>
                }
              />
              <Path
                path={`${NavigationLink.ROUTES_OVERVIEW}`}
                element={
                  <RoutesOverviewContainer
                    route={route}
                    onRouteSelection={handleRouteSelection}
                    onBackButtonClick={() =>
                      handleBackButtonClick(AppViewState.TRIP_SELECTOR)
                    }
                  />
                }
              />
              <Path
                path={`${NavigationLink.ROUTE_DETAILS}`}
                element={
                  <>
                    <RouteDetailsViewContainer
                      route={route}
                      departureTime={selectedRouteDepartureTime}
                      onBackButtonClick={() =>
                        handleBackButtonClick(AppViewState.ROUTES_OVERVIEW)
                      }
                    />
                    <aside className={styles.detailsMap}>
                      <MapContainer route={route} />
                    </aside>
                  </>
                }
              />
            </Routes>
          </section>
        ) : (
          <LoadingPage />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Navigation;
