import React from 'react';
import styles from './PageContent.module.css';
import TripSelectorContainer from './TripSelectorContainer';

interface PageContentProps {
  onMenuButtonClick: () => void;
}

const PageContent: React.FC<PageContentProps> = (props) => (
  <div className={styles.content}>
    <TripSelectorContainer onMenuButtonClick={props.onMenuButtonClick} />
  </div>
);

export default PageContent;
