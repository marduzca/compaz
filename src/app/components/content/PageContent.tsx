import React from 'react';
import MapImage from '../../static/img/fake_map.png';
import styles from './PageContent.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';
import { NavigationProvider } from '../providers/NavigationProvider';

interface PageContentProps {
  onMenuButtonClick: () => void;
}

const PageContent: React.FC<PageContentProps> = (props) => (
  <div className={styles.content}>
    <NavigationProvider>
      <TripSelectorContainer onMenuButtonClick={props.onMenuButtonClick} />
    </NavigationProvider>
    <img className={styles.map} alt="Map" src={MapImage} />
  </div>
);

export default PageContent;
