import React, { useState } from 'react';
import styles from './PageContent.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';
import RoutesOverviewContainer from './routes/routesOverview/RoutesOverviewContainer';
import { useNavigation } from '../providers/NavigationProvider';
import { useFirebase } from '../providers/FirebaseProvider';
import { Route } from '../domain';

interface PageContentProps {
  onMenuButtonClick: () => void;
}

const PageContent: React.FC<PageContentProps> = (props) => {
  const { calculateRoute } = useNavigation();
  const { stations, lines } = useFirebase();

  const [route, setRoute] = useState<Route>({ subRoutes: [], totalTime: 0 });

  const [showRoutesOverview, setShowRoutesOverview] = useState<boolean>(false);

  const handleSearchButtonClick = () => {
    setRoute(calculateRoute(stations, lines));
    setShowRoutesOverview(true);
  };

  const handleBackButtonClick = () => {
    setShowRoutesOverview(false);
  };

  return (
    <main className={styles.content}>
      <section className={styles.container}>
        {showRoutesOverview ? (
          <RoutesOverviewContainer
            onBackButtonClick={handleBackButtonClick}
            route={route}
          />
        ) : (
          <TripSelectorContainer
            onMenuButtonClick={props.onMenuButtonClick}
            onSearchButtonClick={handleSearchButtonClick}
          />
        )}
      </section>
    </main>
  );
};

export default PageContent;
