import React, { useState } from 'react';
import MapImage from '../../static/img/fake_map.png';
import styles from './PageContent.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';
import { useNavigation } from '../providers/NavigationProvider';
import RoutesOverviewContainer from './routes/RoutesOverviewContainer';

interface PageContentProps {
  onMenuButtonClick: () => void;
}

const PageContent: React.FC<PageContentProps> = (props) => {
  const { findShortestPathFromOriginToDestination } = useNavigation();
  const [showRoutesOverview, setShowRoutesOverview] = useState<boolean>(false);
  const [route, setRoute] = useState<string[]>([]);

  const handleSearchButtonClick = () => {
    setRoute(findShortestPathFromOriginToDestination());
    setShowRoutesOverview(true);
  };

  return (
    <div className={styles.content}>
      <section className={styles.container}>
        {showRoutesOverview ? (
          <div className={styles.routesContainer}>
            <RoutesOverviewContainer route={route} />
          </div>
        ) : (
          <>
            <div className={styles.tripSelectorContainer}>
              <TripSelectorContainer
                onMenuButtonClick={props.onMenuButtonClick}
                onSearchButtonClick={handleSearchButtonClick}
              />
            </div>
            <img className={styles.map} alt="Map" src={MapImage} />
          </>
        )}
      </section>
    </div>
  );
};

export default PageContent;
