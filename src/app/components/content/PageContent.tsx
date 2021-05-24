import React from 'react';
import styles from './PageContent.module.css';
import TripSelectorContainer from './TripSelectorContainer';

const PageContent: React.FC = () => (
  <div className={styles.content}>
    <TripSelectorContainer />
  </div>
);

export default PageContent;
