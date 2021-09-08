import React, { useState } from 'react';
import styles from './PageContent.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';
import RoutesOverviewContainer from './routes/RoutesOverviewContainer';

interface PageContentProps {
  onMenuButtonClick: () => void;
}

const PageContent: React.FC<PageContentProps> = (props) => {
  const [showRoutesOverview, setShowRoutesOverview] = useState<boolean>(false);

  const handleSearchButtonClick = () => {
    setShowRoutesOverview(true);
  };

  const handleBackButtonClick = () => {
    setShowRoutesOverview(false);
  };

  return (
    <main className={styles.content}>
      <section className={styles.container}>
        {showRoutesOverview ? (
          <RoutesOverviewContainer onBackButtonClick={handleBackButtonClick} />
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
