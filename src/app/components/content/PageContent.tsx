import React, { useState } from 'react';
import MapImage from '../../static/img/fake_map.png';
import styles from './PageContent.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';
import { useNavigation } from '../providers/NavigationProvider';

interface PageContentProps {
  onMenuButtonClick: () => void;
}

const PageContent: React.FC<PageContentProps> = (props) => {
  const { findShortestPathFromOriginToDestination } = useNavigation();
  const [showRoute, setShowRoute] = useState<boolean>(false);
  const [route, setRoute] = useState<string[]>([]);

  const handleSearchButtonClick = () => {
    setRoute(findShortestPathFromOriginToDestination());
    setShowRoute(true);
  };

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        {!showRoute ? (
          <TripSelectorContainer
            onMenuButtonClick={props.onMenuButtonClick}
            onSearchButtonClick={handleSearchButtonClick}
          />
        ) : (
          <div>
            {route.map((station, index) => {
              if (index === route.length - 1) {
                return <p>{`${station}`}</p>;
              }

              return (
                <>
                  <p>{`${station}`}</p>
                  <p>V</p>
                </>
              );
            })}
          </div>
        )}
      </div>
      <img className={styles.map} alt="Map" src={MapImage} />
    </div>
  );
};

export default PageContent;
