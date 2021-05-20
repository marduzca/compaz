import React from 'react';
import styles from './PageContent.module.css';
import TripSelectorContainer from './TripSelectorContainer';
import { Station } from '../../App';

interface PageContentProps {
  stations: Station[] | undefined;
}

const PageContent: React.FC<PageContentProps> = (props) => (
  <div className={styles.content}>
    <TripSelectorContainer stations={props.stations} />
  </div>
);

export default PageContent;
