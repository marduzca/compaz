import React, { useState } from 'react';
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
          <RoutesOverviewContainer route={route} />
        ) : (
          <TripSelectorContainer
            onMenuButtonClick={props.onMenuButtonClick}
            onSearchButtonClick={handleSearchButtonClick}
          />
        )}
      </section>
    </div>
  );
};

export default PageContent;
